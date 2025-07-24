"use client";
import { LineWave } from "react-loader-spinner";
import { useUserData } from "../hooks/useData";

const LineLoading = () => {
  const { loading } = useUserData();
  return (
    <div className={`bg-transparent ${!loading && "hidden"} overflow-hidden`}>
      <div className="h-screen w-full opacity-75 z-50 bg-black fixed top-0 left-0 overflow-hidden"></div>
      <div className="h-screen w-full flex items-center absolute ml-4 top-0 left-0 loading-zindex bg-transparent justify-center overflow-hidden">
        <LineWave
          height="100"
          width="100"
          color="orange"
          ariaLabel="line-wave"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      </div>
    </div>
  );
};

export default LineLoading;
