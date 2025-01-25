import React, { useState, useEffect } from 'react';

const BirthdayCountdown = ({ targetDate }) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        setCountdown("It's your birthday today!");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [targetDate]);

  return (
    <div className="countdown">
      <h3>Time until your birthday:</h3>
      <p>{countdown}</p>
    </div>
  );
};

export default BirthdayCountdown;
