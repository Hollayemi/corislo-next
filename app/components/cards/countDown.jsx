import React, { useState, useEffect } from "react";

function CountdownTimer({
  initialDate,
  daysToCount,
  className = "!text-4xl !text-black",
  styleCaption = "!text-sm !text-black",
}) {
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

  const Counter = ({ type, value, hideSeperator }) => {
    return (
      <div className="flex items-center mx-0.5 md:mx-2">
        <div className="flex flex-col items-center justify-center mr-1 md:mr-4">
          <h5 className={`font-bold ${className}`}>{value}</h5>
          <p className={styleCaption}>{type}</p>
        </div>
        {! hideSeperator && <div className={`"font-black ${className} -mt-6 !ml-1 md:!ml-4"`}>:</div>}
      </div>
    );
  };

  return (
    <div className="flex justify-center !text-black">
      <Counter type="Days" value={days} />
      <Counter type="Hours" value={hours} />
      <Counter type="Minutes" value={minutes} />
      <Counter type="Seconds" value={seconds} hideSeperator />
      {/* <div className="flex items-center">
        <div className="flex flex-col items-center justify-center">
          <h5 className={`font-bold ${className}`}>{days}</h5>
          <p className={styleCaption}>Days</p>
        </div>
        <div className="font-black text-4xl -mt-6 mx-4">:</div>
        <div className="flex flex-col items-center justify-center">
          <h5 className={`font-bold ${className}`}>{hours}</h5>
          <p className={styleCaption}>Hours</p>
        </div>
        <div className="font-black text-4xl -mt-6 mx-4">:</div>
        <div className="flex flex-col items-center justify-center">
          <h5 className={`font-bold ${className}`}>{minutes}</h5>
          <p className={styleCaption}>Minutes</p>
        </div>
        <div className="font-black text-4xl -mt-6 mx-4">:</div>
        <div className="flex flex-col items-center justify-center">
          <h5 className="font-bold text-4xl !text-yellow-500">{seconds}</h5>
          <p className="text-xs !text-yellow-500">Seconds</p>
        </div>
      </div> */}
    </div>
  );
}

export default CountdownTimer;
