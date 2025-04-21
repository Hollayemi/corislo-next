import { Circles } from "react-loader-spinner";

export const CircleLoader = ({ width = 20, color = "gray" }) => {
  return (
    <Circles
      height="30"
      width={width}
      color={color}
      ariaLabel="circle-wave"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      firstLineColor=""
      middleLineColor=""
      lastLineColor=""
    />
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

export const SpinLoader = ({ size = 5 }) => (
  <div className="">
    <div
      className={`w-${size} h-${size} border-2 border-blue-500 border-t-transparent rounded-full animate-spin`}
    ></div>
  </div>
)