'use client'
import React, { useState, useEffect } from 'react'

function CountdownTimer({
  endDate,
  className = '!text-4xl !text-black',
  styleCaption = '!text-sm !text-black',
}) {
  const calculateCountdown = () => {
    const targetDate = new Date(endDate)
    const now = new Date()
    const timeDifference = targetDate - now

    if (timeDifference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    const secondsRemaining = Math.floor(timeDifference / 1000)
    const days = Math.floor(secondsRemaining / (24 * 60 * 60))
    const hours = Math.floor((secondsRemaining % (24 * 60 * 60)) / 3600)
    const minutes = Math.floor((secondsRemaining % 3600) / 60)
    const seconds = secondsRemaining % 60

    return {
      days,
      hours,
      minutes,
      seconds,
    }
  }

  const [countdown, setCountdown] = useState(calculateCountdown())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(calculateCountdown())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [endDate])

  const Counter = ({ type, value, hideSeperator }) => {
    return (
      <div className="flex items-center mx-0.5 md:mx-2">
        <div className="flex flex-col items-center justify-center mr-1 md:mr-4">
          <h5 className={`font-bold ${className}`}>{value}</h5>
          <p className={styleCaption}>{type}</p>
        </div>
        {!hideSeperator && (
          <div className={`"font-black ${className} -mt-6 !ml-1 md:!ml-4"`}>
            :
          </div>
        )}
      </div>
    )
  }
  return (
    <div className="flex justify-center">
      <div className="flex items-center">
        <Counter type="Days" value={countdown.days} />
        <Counter type="Hours" value={countdown.hours} />
        <Counter type="Minutes" value={countdown.minutes} />
        <Counter type="Seconds" value={countdown.seconds} hideSeperator />
      </div>
    </div>
  )
}

export default CountdownTimer
