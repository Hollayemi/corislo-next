import React, { useState, useEffect } from "react";

function CountdownTimer({ initialDate, daysToCount }) {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const targetDate = new Date(initialDate);
    targetDate.setDate(targetDate.getDate() + daysToCount);
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeDifference = targetDate - now;
      if (timeDifference <= 0) {
        clearInterval(intervalId);
        setCountdown(0);
      } else {
        const secondsRemaining = Math.floor(timeDifference / 1000);
        setCountdown(secondsRemaining);
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [initialDate, daysToCount]);

  const days = Math.floor(countdown / (24 * 60 * 60));
  const hours = Math.floor((countdown % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;

  return (
    <div className="flex justify-center !text-black">
      <div className="flex items-center">
        <div className="flex flex-col items-center justify-center">
          <h5 className="font-bold text-4xl">{days}</h5>
          <p className="text-xs">Days</p>
        </div>
        <div className="font-black text-4xl -mt-6 mx-4">:</div>
        <div className="flex flex-col items-center justify-center">
          <h5 className="font-bold text-4xl">{hours}</h5>
          <p className="text-xs">Hours</p>
        </div>
        <div className="font-black text-4xl -mt-6 mx-4">:</div>
        <div className="flex flex-col items-center justify-center">
          <h5 className="font-bold text-4xl">{minutes}</h5>
          <p className="text-xs">Minutes</p>
        </div>
        <div className="font-black text-4xl -mt-6 mx-4">:</div>
        <div className="flex flex-col items-center justify-center">
          <h5 className="font-bold text-4xl !text-yellow-500">
            {seconds}
          </h5>
          <p className="text-xs !text-yellow-500">
            Seconds
          </p>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
