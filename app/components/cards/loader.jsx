

export const CircleLoader = ({ width = 20, color = "gray" }) => {
  return (
    <div className={`flex justify-center items-center`}>
      <svg
        className={`animate-spin h-${width} w-${width} text-${color}-600`} 
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      ></svg> 
      </div>
  );
};

export const PingLoader = ({ size = 8 }) => (
  <span className={`relative flex h-${size} w-${size}`}>
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
    <span
      className={`relative inline-flex rounded-full h-${size} w-${size} bg-sky-600`}
    ></span>
  </span>
)

export const SpinLoader = ({ size = 7 }) => (
  <div className="">
    <div
      className={`w-${size} h-${size} border-2 border-blue-500 mx-auto border-t-transparent rounded-full animate-spin`}
    ></div>
  </div>
)