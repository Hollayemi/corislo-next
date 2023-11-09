"use client";
import { LineWave } from "react-loader-spinner";

const LineLoading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <LineWave
        height="100"
        width="100"
        color="secondary"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </div>
  );
};

export default LineLoading