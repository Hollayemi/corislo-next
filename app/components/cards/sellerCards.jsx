import { Box, Typography } from "@mui/material";
import Image from "next/image";

export const NumberExplained = ({ parent, info, small }) => {
  return (
    <Box className={`flex ${small && "flex-col"} items-center w-32`}>
      <Typography variant="body2" className={`${small ? "!text-2xl" : "!text-4xl"} !font-black !mr-1"`}>
        {parent}
      </Typography>
      <Box className="">
        <Typography variant="body2" className="!w-fit !text-[12px] ">
          {info}
        </Typography>
      </Box>
    </Box>
  );
};
export const SellerDashboardImage = () => {
  return (
    <Box className="relative w-full md:!w-4/5 flex justify-center">
      <Image
        src="/images/misc/shadow1.png"
        alt="image"
        width={500}
        height={500}
        className="absolute -top-20 w-3/5"
      />
      <Image
        src="/images/misc/shadow2.png"
        alt="image"
        width={800}
        height={800}
        className="absolute -top-14 w-4/5 z-30"
      />
      <Image
        src="/images/misc/dash-image.png"
        alt="image"
        width={1000}
        height={1000}
        className="-top-10 w-full relative z-40"
      />
    </Box>
  );
};

export const WhySell = ({ image, title, info }) => {
  return (
    <Box className="!rounded-xl w-full md:w-80 h-44 flex-shrink-0 bg-white  drop-shadow-md p-4 md:m-2">
      <Image
        src={`/images/misc/${image}.png`}
        alt="image"
        width={400}
        height={400}
        className="w-8 h-8"
      />

      <Typography
        variant="body2"
        className="!text-[13px] !mt-2 !mb-1  !font-bold "
      >
        {title}
      </Typography>
      <Typography variant="caption" className="!text-[11px]">
        {info}
      </Typography>
    </Box>
  );
};

export const HowItWorksCard = ({ step, title, text, className }) => {
  return (
    <Box
      className={`!w-11/12 md:w-72 md:h-28 p-3 md:p-4 !rounded-xl shadow m-2 md:m-3 !bg-white relative z-30 ${className}`}
    >
      <Box className="flex items-center">
        <Typography
          variant="body2"
          noWrap
          className="!font-bold !text-[13px] w-14"
          color="secondary"
        >
          Step {step}:
        </Typography>
        <Typography
          variant="body2"
          className="!font-bold !text-[13px] !ml-1.5"
          color="primary"
        >
          {title}
        </Typography>
      </Box>
      <Typography
        variant="caption"
        className="!text-[11px] !mt-1.5"
        color="primary"
      >
        {text}
      </Typography>
    </Box>
  );
};

export const CoreValues = ({ top, bottom, text, className }) => {
  return (
    <Box
      className={`w-72 h-68 p-4 !rounded-xl shadow m-3 !bg-white relative z-30 ${className}`}
    >
      <Typography
        variant="body2"
        className="!font-bold !text-[13px]"
        color="primary"
      >
        {top} -
      </Typography>
      <Typography
        variant="body2"
        className="!font-bold !text-[13px]"
        color="primary"
      >
        {bottom}
      </Typography>

      <Typography variant="caption" className="!text-[10px] !mt-3">
        {text}
      </Typography>
    </Box>
  );
};

export const CheckPoint = ({ title, info }) => {
  return (
    <Box>
      <Box className="flex items-start mb-2">
        <Image
          src="/images/misc/check.png"
          alt="check"
          width={100}
          height={100}
          className="w-3 h-3 mt-2 mr-1"
        />
        <Box>
          <Typography variant="caption">
            <b>{title}</b>{" "}{info}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
