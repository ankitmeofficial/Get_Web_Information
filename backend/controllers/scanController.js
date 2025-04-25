const axios = require('axios');
const cheerio = require('cheerio');
const dns = require('dns').promises;
const { promisify } = require('util');
const { exec } = require('child_process');
const execAsync = promisify(exec);
const PDFDocument = require('pdfkit');

const scanWebsite = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    const results = {
      basicInfo: {},
      security: {},
      performance: {},
      seo: {},
      technologies: {},
      socialMedia: {},
      content: {}
    };

    // Fetch website content
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);

    // Basic Information
    results.basicInfo = {
      title: $('title').text(),
      description: $('meta[name="description"]').attr('content'),
      favicon: $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href'),
      language: $('html').attr('lang'),
      lastModified: response.headers['last-modified'],
      server: response.headers['server'],
      contentType: response.headers['content-type']
    };

    // Security Information
    results.security = {
      hasHttps: url.startsWith('https'),
      securityHeaders: {
        xFrameOptions: response.headers['x-frame-options'],
        xContentTypeOptions: response.headers['x-content-type-options'],
        xXSSProtection: response.headers['x-xss-protection'],
        strictTransportSecurity: response.headers['strict-transport-security']
      }
    };

    // SEO Information
    results.seo = {
      metaTags: {
        keywords: $('meta[name="keywords"]').attr('content'),
        robots: $('meta[name="robots"]').attr('content'),
        viewport: $('meta[name="viewport"]').attr('content')
      },
      headings: {
        h1: $('h1').length,
        h2: $('h2').length,
        h3: $('h3').length
      },
      images: {
        total: $('img').length,
        withAlt: $('img[alt]').length
      }
    };

    // Technologies
    results.technologies = {
      frameworks: detectFrameworks($),
      cms: detectCMS($),
      analytics: detectAnalytics($),
      advertising: detectAdvertising($)
    };

    // Social Media
    results.socialMedia = {
      facebook: $('meta[property="og:title"]').length > 0,
      twitter: $('meta[name="twitter:card"]').length > 0,
      linkedin: $('meta[property="og:type"]').length > 0
    };

    // Content Analysis
    results.content = {
      wordCount: $('body').text().split(/\s+/).length,
      links: {
        internal: $('a[href^="/"]').length,
        external: $('a[href^="http"]').length
      },
      forms: $('form').length
    };

    // DNS Information
    try {
      const hostname = new URL(url).hostname;
      const dnsRecords = await dns.resolve(hostname);
      results.basicInfo.ipAddress = dnsRecords[0];
    } catch (error) {
      results.basicInfo.ipAddress = 'Could not resolve IP';
    }

    res.json(results);
  } catch (error) {
    console.error('Scan error:', error);
    res.status(500).json({ error: 'Error scanning website' });
  }
};

// Helper functions for technology detection
function detectFrameworks($) {
  const frameworks = [];
  if ($('script[src*="react"]').length) frameworks.push('React');
  if ($('script[src*="angular"]').length) frameworks.push('Angular');
  if ($('script[src*="vue"]').length) frameworks.push('Vue.js');
  if ($('script[src*="jquery"]').length) frameworks.push('jQuery');
  return frameworks;
}

function detectCMS($) {
  if ($('meta[name="generator"][content*="WordPress"]').length) return 'WordPress';
  if ($('meta[name="generator"][content*="Drupal"]').length) return 'Drupal';
  if ($('meta[name="generator"][content*="Joomla"]').length) return 'Joomla';
  return 'Unknown';
}

function detectAnalytics($) {
  const analytics = [];
  if ($('script[src*="google-analytics"]').length) analytics.push('Google Analytics');
  if ($('script[src*="gtag"]').length) analytics.push('Google Tag Manager');
  if ($('script[src*="facebook"]').length) analytics.push('Facebook Pixel');
  return analytics;
}

function detectAdvertising($) {
  const advertising = [];
  if ($('script[src*="adsense"]').length) advertising.push('Google AdSense');
  if ($('script[src*="doubleclick"]').length) advertising.push('Google DoubleClick');
  return advertising;
}

const generateReport = async (req, res) => {
  try {
    const { url, scanResults } = req.body;
    if (!url || !scanResults) {
      return res.status(400).json({ error: 'Missing required data' });
    }

    // Create a new PDF document
    const doc = new PDFDocument();
    
    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=website-scan-report-${new Date().toISOString().split('T')[0]}.pdf`);

    // Pipe the PDF to the response
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(25).text('Website Scan Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`URL: ${url}`);
    doc.moveDown();

    // Add scan date
    doc.fontSize(12).text(`Scan Date: ${new Date().toLocaleString()}`);
    doc.moveDown();

    // Add sections
    const sections = [
      { title: 'Basic Information', data: scanResults.basicInfo },
      { title: 'Security', data: scanResults.security },
      { title: 'SEO', data: scanResults.seo },
      { title: 'Technologies', data: scanResults.technologies },
      { title: 'Social Media', data: scanResults.socialMedia },
      { title: 'Content Analysis', data: scanResults.content }
    ];

    sections.forEach(section => {
      if (section.data) {
        doc.fontSize(14).text(section.title, { underline: true });
        doc.moveDown();

        Object.entries(section.data).forEach(([key, value]) => {
          const content = typeof value === 'object' 
            ? JSON.stringify(value, null, 2)
            : value?.toString() || 'N/A';
          
          doc.fontSize(12).text(`${key}: ${content}`);
          doc.moveDown(0.5);
        });

        doc.moveDown();
      }
    });

    // Add footer
    doc.fontSize(10).text(
      'Generated by Website Scanner',
      { align: 'center' }
    );

    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};

module.exports = {
  scanWebsite,
  generateReport
};
