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

