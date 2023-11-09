import React from 'react';

const OtpInput = () => {
  const inputRefs = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ];

  const handleInput = (e, index) => {
    if (e.target.value.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
    } else if (e.target.value.length === 0 && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="flex justify-center items-center">
      {Array.from({ length: 6 }).map((_, index) => (
        <>
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            className="w-10 h-10 text-center border rounded-md m-1.5"
            maxLength={1}
            onChange={(e) => handleInput(e, index)}
          />
          {index === 2 && <h6 className="w-6"></h6>}
        </>
      ))}
    </div>
  );
};

export default OtpInput;
