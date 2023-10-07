import { Box, Typography } from "@mui/material"
import Image from "next/image";

export const SectionTitle = ({ black,  blue }) => {
    return (
      <Box className="w-fit mb-10">
        <Box className="flex items-center">
          <Typography
            variant="body2"
            className="!font-bold !text-[17px] !text-black"
          >
            {black}
          </Typography>
          <Typography
            variant="body2"
            className="!font-bold !text-[17px] !ml-1.5"
            color="primary"
          >
            {blue}
          </Typography>
        </Box>
        <Box className="!w-inherit">
          <Box className="w-4/5 h-1" bgcolor="custom.sec"></Box>
        </Box>
      </Box>
    );
}

export const SectionMiddleTitle = ({ black,  blue }) => {
    return (
      <Box className="flex justify-center items-center">
        <Box className="w-fit  my-10 relative">
          <Box className="flex items-center">
            <Typography
              variant="body2"
              className="!font-bold !text-[20px] !text-black"
            >
              {black}
            </Typography>
            <Typography
              variant="body2"
              className="!font-bold !text-[20px] !ml-1.5"
              color="primary"
            >
              {blue}
            </Typography>
          </Box>
          <Box className="absolute top-0 left-0 h-full w-full">
            <Image
              src="/images/misc/up-semi-circle.png"
              alt="circle"
              width={200}
              height={200}
              className="absolute -top-4 right-2 w-32"
            />
            <Image
              src="/images/misc/down-semi-circle.png"
              alt="circle"
              width={200}
              height={200}
              className="absolute -bottom-4 left-2 w-32"
            />
          </Box>
        </Box>
      </Box>
    );
}