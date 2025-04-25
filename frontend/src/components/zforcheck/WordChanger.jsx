import './WordChanger.css'; // For CSS styles

import React, { useState, useEffect } from 'react';
const WordChanger = () => {
  const [currentWord, setCurrentWord] = useState("UI/UX");
  const [isChanging, setIsChanging] = useState(false);
  const words = ["UI/UX", "Logo Designer", "Cyber Experts"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentWord(prevWord => {
          const currentIndex = words.indexOf(prevWord);
          const nextIndex = (currentIndex + 1) % words.length;
          return words[nextIndex];
        });
        setIsChanging(false);
      }, 500); // Duration for word change
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [words]);

  return (
    <div className="word-changer-container">
      <h2>
      Empowering Innovation through<br/><span className={`animated-word ${isChanging ? 'is-changing' : ''}`}>{currentWord}</span>!
      </h2>
    </div>
  );
}

export default WordChanger;
