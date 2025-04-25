import React, { useState, useEffect } from "react";
import "./URLInfoExtractor.css";
import videobg from "./videobg.mp4";

const WordChanger = () => {
  const [currentWord, setCurrentWord] = useState("Website Scanner");
  const [isChanging, setIsChanging] = useState(false);
  const words = ["Website Scanner", "Security Analyzer", "SEO Inspector", "Technology Detector"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentWord((prevWord) => {
          const currentIndex = words.indexOf(prevWord);
          const nextIndex = (currentIndex + 1) % words.length;
          return words[nextIndex];
        });
        setIsChanging(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className="word-changer-container">
      <h2>
        Comprehensive
        <br />
        <span className={`animated-word ${isChanging ? "is-changing" : ""}`}>
          {currentWord}
        </span>
      </h2>
    </div>
  );
};

const URLInfoExtractor = () => {
  const [url, setUrl] = useState("");
  const [scanResults, setScanResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [serverStatus, setServerStatus] = useState(null);

  useEffect(() => {
    // Check server status on component mount
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/test');
      if (response.ok) {
        setServerStatus('connected');
      } else {
        setServerStatus('error');
      }
    } catch (err) {
      setServerStatus('error');
      console.error('Server connection error:', err);
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setIsValidUrl(newUrl === "" || validateUrl(newUrl));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError("Please enter a URL");
      return;
    }
    if (!isValidUrl) {
      setError("Please enter a valid URL");
      return;
    }
    if (serverStatus !== 'connected') {
      setError("Cannot connect to the server. Please try again later.");
      return;
    }
    await scanWebsite();
  };

  const scanWebsite = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to scan website');
      }

      const data = await response.json();
      setScanResults(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to the server. Please make sure the backend server is running.');
      console.error('Scan error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderSection = (title, data) => {
    if (!data) return null;
    return (
      <div className="info-section">
        <h3>{title}</h3>
        <div className="info-content">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="info-item">
              <strong>{key}:</strong>{" "}
              {typeof value === "object" ? (
                <pre>{JSON.stringify(value, null, 2)}</pre>
              ) : (
                value?.toString() || "N/A"
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="main">
      <video className="background-video" src={videobg} autoPlay loop muted />
      <div className="url-extractor-container">
        <WordChanger />
        {serverStatus === 'error' && (
          <div className="server-error">
            Cannot connect to the server. Please make sure the backend server is running.
          </div>
        )}
        <form onSubmit={handleSubmit} className="input-section">
          <div className="url-input-wrapper">
            <input
              type="text"
              placeholder="Enter website URL (e.g., https://example.com)"
              value={url}
              onChange={handleUrlChange}
              className={`url-input ${!isValidUrl ? 'invalid' : ''}`}
            />
            {!isValidUrl && url && (
              <span className="error-hint">Please enter a valid URL</span>
            )}
          </div>
          <button 
            type="submit"
            className="extract-button"
            disabled={loading || !isValidUrl || serverStatus !== 'connected'}
          >
            {loading ? (
              <span className="loading-spinner">
                <span className="spinner"></span>
                Scanning...
              </span>
            ) : (
              "Scan Website"
            )}
          </button>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {scanResults && (
          <div className="scan-results">
            {renderSection("Basic Information", scanResults.basicInfo)}
            {renderSection("Security", scanResults.security)}
            {renderSection("SEO", scanResults.seo)}
            {renderSection("Technologies", scanResults.technologies)}
            {renderSection("Social Media", scanResults.socialMedia)}
            {renderSection("Content Analysis", scanResults.content)}
          </div>
        )}
      </div>
    </div>
  );
};

export default URLInfoExtractor;
