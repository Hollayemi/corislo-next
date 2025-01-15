'use client'
import React, { useState, useRef } from 'react'

const OtpInput = ({ inputValues, setInputValues }) => {
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]

  const handleInput = (e, index) => {
    const newValue = e.target.value

    // Update the corresponding input value in the state
    setInputValues((prevValues) => {
      const newValues = [...prevValues]
      newValues[index] = newValue
      return newValues
    })

    if (newValue.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus()
    } else if (newValue.length === 0 && index < 0) {
      inputRefs[index - 1].current.focus()
    }
  }

  return (
    <div className="flex justify-center items-center">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index}>
          <input
            ref={inputRefs[index]}
            type="number"
            className="w-10 h-10 text-center border rounded-md m-1.5"
            maxLength={1}
            value={inputValues[index]}
            onChange={(e) => handleInput(e, index)}
            // onKeyUp={() => {}}
          />
          {index === 2 && <h6 className="w-6"></h6>}
        </div>
      ))}
    </div>
  )
}

export default OtpInput
