import Image from "next/image";
import { Box, Button, Grid, Typography } from "@mui/material";
import themeConfig from "@/app/configs/themeConfig";
import IconifyIcon from "../icon";
import Link from "next/link";

export const metadata = {
  title: "auth-corislo",
  description: "Showcase your store now",
};

export default function StoreAuthLayout({
  children,
  stage,
  setStage,
  image,
  ...others
}) {
  const getStatus = (level) => {
    if (stage === level) return "active";
    if (stage > level) return "done";
    if (stage < level) return "waiting";
    return "sdf";
  };

  const StageBox = ({ text, level }) => {
    return (
      <Box
        className="w-1/2 md:w-1/4"
        onClick={getStatus(level) === "done" ? () => setStage(level) : () => {}}
      >
        <CheckList2 text={text} active={getStatus(level)} />
      </Box>
    );
  };

  return (
    <Box className="flex h-screen">
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
              title="Secure Access to Your Corisio Account"
              text="Sign in to your Corisio account with confidence. Your journey continues seamlessly from where you left off."
            />
            <CheckList
              title="Explore and Shop"
              text="Whether you're a shopper or a store owner, Corisio offers a wealth of features and tools to enhance your experience. Dive back into the world of shopping and store management."
            />

            <CheckList
              title="Join Our Thriving Community"
              text="Over 100+ satisfied users are already benefiting from Corisio's cutting-edge solutions. Trusted by individuals, brands, and businesses like yours."
            />
          </Box>
        </Box>
      </Box>

      <Box
        className="w-full h-full px-2 overflow-y-scroll flex justify-center"
        bgcolor="custom.bodyGray"
      >
        <Box
          className={`flex flex-col md:ustify-center my-16 items-center w-full ${
            stage !== 3 && "md:w-4/5 md:px-4"
          } h-full`}
        >
          <Box className="flex flex-col items-center mt-14 md:mt-0 ">
            <Image
              src={themeConfig.vertical1}
              alt="logo"
              width={500}
              height={500}
              className="w-40 md:first-letter:!mt-8"
            />
            <Typography
              variant="body2"
              className="!text-xl !font-bold !mt-3"
              color="custom.pri"
            >
              {others.title || "{ Page Title }"}
            </Typography>
          </Box>
          <Box className="w-full flex items-center flex-wrap md:flex-nowrap mb-7 mt-4 md:mt-0 md:mb-0 md:px-6">
            <StageBox text="Personal Info" level={0} />
            <StageBox text="Business Profile" level={1} />
            <StageBox text="Verification" level={2} />
            <StageBox text="Pricing" level={3} />
          </Box>
          {/* This for the app */}
          {children}
          {/* This for the app */}
          <Box className="w-full">
            <Button
              variant="contained"
              className="w-full !h-10 !rounded-full !text-gray-100 !text-[17px] !mt-3"
              onClick={() => setStage(stage < 4 && stage + 1)}
            >
              {stage < 3 ? "Next" : "Retry Verification"}
            </Button>
            <Box className="flex justify-center">
              <Typography className="!text-[13px] !mt-2">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  color="custom.pri"
                  className="!font-semibold"
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const color = {
  done: "custom.pri",
  active: "custom.sec",
};

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

const CheckList2 = ({ active, text }) => (
  <Box className="flex items-center mt-1 md:!mt-6 md:!mb-5 border h-10 bg-white px-4 mx-1 cursor-pointer">
    <Box
      className="w-4 h-4 rounded-full flex flex-shrink-0 items-center justify-center !mt-1"
      bgcolor={color[active] || "gray"}
    >
      <IconifyIcon icon="tabler:check" className="!text-[12px] !text-white" />
    </Box>
    <Box className="ml-2">
      <Typography
        variant="caption"
        className="!text-[11px]"
        color={color[active] || "gray"}
      >
        {text}
      </Typography>
    </Box>
  </Box>
);
