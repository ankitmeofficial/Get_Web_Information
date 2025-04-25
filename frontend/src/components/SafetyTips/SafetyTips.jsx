import React, { useState } from 'react';
import './SafetyTips.css'; // Import the CSS file for styling

const tips = [
  {
    title: "Use Strong Passwords",
    description: "Create passwords that are hard to guess. Use a mix of letters, numbers, and symbols. Avoid using easy things like your name or '123456'.",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID1" // Replace with actual video link
  },
  {
    title: "Turn on 2-Step Verification",
    description: "Set up two-step verification (2FA) for important accounts like your email or Instagram. It asks for a code from your phone in addition to your password.",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID2"
  },
  {
    title: "Think Before You Click",
    description: "Don’t click on links or download files from unknown sources. Check email addresses carefully. Fake messages might have spelling mistakes or weird URLs.",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID3"
  },
  {
    title: "Keep Your Device Updated",
    description: "Update your phone, computer, and apps regularly. Updates fix security holes that hackers might use to break in.",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID4"
  },
  {
    title: "Be Safe on Wi-Fi",
    description: "Avoid using public Wi-Fi for sensitive activities. If you must, use a VPN app to keep your connection private.",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID5"
  },
  {
    title: "Be Careful on Social Media",
    description: "Don’t share personal info like your full address or phone number. Set your account privacy settings to 'Private'.",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID6"
  },
  {
    title: "Use Antivirus Software",
    description: "Install an antivirus app on your computer or phone. It helps protect you from viruses and malware.",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID7"
  },
  {
    title: "Backup Your Data",
    description: "Save important files on an external drive or in the cloud. This helps you recover data if lost due to hacking or a virus.",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID8"
  },
  {
    title: "Check Your Bank Accounts",
    description: "Check your bank account regularly for strange activity. Use banking apps with alerts for added safety.",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID9"
  },
  {
    title: "Stay Informed",
    description: "Learn about common online scams and hacking tricks. Knowing about threats helps you spot them early.",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID10"
  }
];

const SafetyTips = () => {
  const [showMore, setShowMore] = useState(false);

  const displayedTips = showMore ? tips : tips.slice(0, 3);

  const handleSeeMore = () => {
    setShowMore(true);
  };

  return (
    <>
    <div className="saftytipsmain">
        <div className="topmain">
            <h1>Protect Yourself from Hackers<br/>
            Stay Secure Online with Simple Steps</h1>
            <p>
            Using strong, unique passwords and enabling two-factor authentication are key steps to keeping your accounts safe. Always be cautious with emails, links, and downloads from unknown sources to avoid falling victim to cyberattacks.
            </p>
        </div>

    <div className="tips-container">
      {displayedTips.map((tip, index) => (
          <div className="card" key={index}>
          <h2>{tip.title}</h2>
          <p>{tip.description}</p>
          <div className="video-container">
            <iframe
              width="100%"
              height="250"
              src={tip.videoUrl}
              title={tip.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              ></iframe>
          </div>
        </div>
      ))}
      {!showMore && (
          <button className="see-more-btn" onClick={handleSeeMore}>See More</button>
        )}
    </div>
        </div>
        </>
  );
};

export default SafetyTips;
