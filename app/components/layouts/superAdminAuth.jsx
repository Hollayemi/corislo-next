import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import themeConfig from "@/app/configs/themeConfig";
import IconifyIcon from "../icon";

export const metadata = {
  title: "auth-corislo",
  description: "Showcase your store now",
};

export default function SuperAdminAuth({ children, reverse, image, ...others }) {
  return (
    <Box className="flex justify-center bg-black overflow-hidden">
      <Box className="flex w-full max-w-[1500px] h-auto min-h-screen">
        <Box
          className="w-full h-full !px-3 overflow-hidden"
          bgcolor="custom.pri"
        >
          <Box
            className={`flex flex-col ${others.center ? "justify-center" : "!pt-1 md:!pt-10"
              } overflow-auto  my-4 md:my-0 !px-2 items-center h-full`}
          >
            <Box className="flex flex-col items-center mt-8 md:mt-0 ">
              {!others.noLogo && (
                <Image
                  src={themeConfig.logo_hor_bw}
                  alt="logo"
                  width={500}
                  height={500}
                  className="w-40 md:first-letter:!mt-8"
                />
              )}
              <Typography
                variant="body2"
                className="!text-xl !font-bold !mt-3 !text-center"
                color="custom.pri"
              >
                {others.title || "{ Page Title }"}
              </Typography>
            </Box>

            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const CheckList = ({ title, text }) => (
  <Box className="flex items-start !mt-6 !mb-5">
    <Box
      className="w-4 h-4 rounded-full flex flex-shrink-0 items-center justify-center !mt-1"
      bgcolor="custom.sec"
    >
      <IconifyIcon icon="tabler:check" className="!text-[12px] !text-black" />
    </Box>
    <Box className="ml-2">
      <Typography
        variant="body2"
        className="!font-bold !mb-0 !text-[16px] !text-gray-100"
      >
        {title}
      </Typography>
      <Typography variant="caption" className="!text-[11px] !text-gray-300">
        {text}
      </Typography>
    </Box>
  </Box>
);
