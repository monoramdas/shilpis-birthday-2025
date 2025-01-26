import React, { useState, useEffect, useRef } from "react";
import musicfile from "../assets/happy-birthday.mp3";
import img from "../assets/shilpis-img.jpg";
import "./BirthdayCountdown.scss";

const BirthdayCountdown = ({ targetDate }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        setCountdown("");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 8000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [targetDate]);

  const [buttonClick, setButtonClick] = useState(false);
  const handleButtonClick = () => {
    setButtonClick((prev) => !prev);
    toggleMusic();
  };
  console.log("buttonClick", buttonClick);

  const [isMusicOn, setIsMusicOn] = useState(false);
  const audioRef = useRef(null);
console.log('audio',audioRef);
  const toggleMusic = () => {
    if (isMusicOn) {
      audioRef?.current?.pause();
    } else {
      audioRef?.current?.play();
    }
    setIsMusicOn(!isMusicOn);
  };

  const [currentSection, setCurrentSection] = useState(1); // Default section to show
  const [isPlaying, setIsPlaying] = useState(true); // To manage whether the cycle is active
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      // Start the interval when play is active
      interval = setInterval(() => {
        setCurrentSection((prevSection) => {
          const nextSection = prevSection === 4 ? 0 : prevSection + 1;
          if (nextSection === 0) {
            setCycleCount((prevCount) => prevCount + 1); // Increment cycle count
            setIsPlaying(false);
          }
          return nextSection;
        });
      }, 8000);
    } else {
      // Stop the interval when cycle is paused or completed
      clearInterval(interval);
    }

    // Cleanup the interval on unmount or when play is toggled off
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayAgain = () => {
    setCycleCount(0); // Reset the cycle count
    setCurrentSection(1); // Reset the section to the first one
    setIsPlaying(true); // Restart the cycle
  };

  return (
    <div className="birthday-countdown">
      {countdown !== "" ? (
        <div className="birthday-countdown__count">
          <h3>Time until your birthday:</h3>
          <p>{countdown}</p>
        </div>
      ) : (
        <div className="birthday-countdown__play">
          <button onClick={handleButtonClick} className="birthday-countdown__play-startbtn">Click to start the party</button>
           {/* <button onClick={toggleMusic} className="music-btn">
                  {isMusicOn ? "Pause Music" : "Play Music 🎵"}
                </button>
                <audio ref={audioRef} src={musicfile} loop /> */}
          <audio ref={audioRef} src={musicfile} loop />
          {buttonClick && (
            <div className="birthday-countdown__play-main">
              <div
                className={`birthday-countdown__play-main-section ${
                  currentSection === 1
                    ? "birthday-countdown__play-main-section--active"
                    : ""
                }`}
              >
                Wishing you a day filled with love and joy!
              </div>
              <div
                className={`birthday-countdown__play-main-section ${
                  currentSection === 2
                    ? "birthday-countdown__play-main-section--active"
                    : ""
                }`}
              >
                Let's celebrate your special day!
              </div>
              <div
                className={`birthday-countdown__play-main-section ${
                  currentSection === 3
                    ? "birthday-countdown__play-main-balloons-container"
                    : ""
                }`}
              >
                  <div className="balloon"></div>
                  <div className="balloon"></div>
                  <div className="balloon"></div>
                  <div className="balloon"></div>
                  <div className="balloon"></div>
              </div>
              <div
                className={`birthday-countdown__play-main-section ${
                  currentSection === 4
                    ? "birthday-countdown__play-main--image"
                    : ""
                }`}
              >
                <img src={img} />
                <div className="birthday-countdown__play-main--image-text">Happy BirthDay</div>
              </div>
              {cycleCount > 0 && !isPlaying && (
                <button className="birthday-countdown__play-play-again-btn" onClick={handlePlayAgain}>
                  click to watch again
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BirthdayCountdown;
