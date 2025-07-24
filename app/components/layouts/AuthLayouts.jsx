import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import themeConfig from "@/app/configs/themeConfig";
import IconifyIcon from "../icon";

export const metadata = {
  title: 'auth-corislo',
  description: 'Showcase your store now',
}

export default function AuthLayout({ children, reverse, image, ...others }) {
  return (
    <Box className="flex justify-center bg-black overflow-hidden">
      <Box className="flex w-full max-w-[1500px] h-auto min-h-screen">
        <Box className="w-[560px] min-w-[260px] h-full relative bg-slate-500 !overflow-hidden hidden sm:block">
          <Image
            src={image || "/images/misc/auth-bgd.png"}
            alt="auth-mage"
            width={1500}
            height={1500}
            className="!w-full !h-full absolute top-0 left-0"
          />
          <Box className="w-full h-full absolute top-0 left-0 bg-black opacity-50"></Box>
          <Box className="w-full h-full relative z-40 text-white p-4 flex items-center">
            <Box className="px-5">
              <Image
                src={themeConfig.logo_hor_bw}
                alt="auth-mage"
                width={800}
                height={800}
                className="!w-28 !mb-6"
              />
              <Typography variant="body" className="!font-bold !text-gray-100">
                Ready to Get Started?
              </Typography>
              <br />
              <Typography
                variant="caption"
                className="!text-[11px] !text-gray-300"
              >
                Pay Only for What You Need
              </Typography>

              <CheckList
                title="Start Seamlessly with Corisio"
                text="Begin your journey with Corisio without any upfront costs or commitments. Just sign up and start exploring all that our platform has to offer."
              />
              <CheckList
                title="Unlock the Power of Corisio"
                text="Access a wide array of features, tools, and services. Whether you're a shopper or a seller, Corisio's got you covered."
              />
              <CheckList
                title="Join a Network of Successful Users"
                text="Over 100+  satisfied users are already benefiting from Corisio's cutting-edge solutions. Trusted by individuals, brands, and businesses like yours."
              />
            </Box>
          </Box>
        </Box>

        <Box
          className="w-full h-screen  overflow-hidden"
          bgcolor="custom.bodyGray"
        >
          <Box
            className={`flex flex-col ${others.center ? "justify-center" : "!pt-1 md:!pt-10"} overflow-auto  my-4 md:my-0 px-2 items-center h-full`}
          >
            <Box className="flex flex-col items-center mt-8 md:mt-0 ">
              {!others.noLogo && <Image
                src={themeConfig.vertical1}
                alt="logo"
                width={500}
                height={500}
                className="w-40 md:first-letter:!mt-8"
              />}
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
)
