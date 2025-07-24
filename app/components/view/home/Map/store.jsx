import { Box, Typography } from "@mui/material";
import ReactSlickSlider from "@/app/components/wrapper/react-slick";
import Image from "next/image";
import IconifyIcon from "@/app/components/icon";
import useSWR from "swr";
import { BriefStoreWithFuntions } from "./components";
import { CircleLoader } from "@/app/components/cards/loader";

const AboutStore = ({ setStage }) => {
  const { data, isLoading } = useSWR(
    "/branch/info?branchId=655f40b1ada0620d29ca6260"
  );
  const info = data?.data || {};
  console.log(info);

  const Comp = ({ name, icon }) => (
    <Box className="flex items-center mb-3">
      <IconifyIcon icon={icon} className="!text-[16px] mr-2.5 !text-blue-900" />
      <Typography
        variant="body2"
        className="!text-[12px] !text-gray-400 parent-hover:!text-black !flex-shrink-0"
      >
        {name}
      </Typography>
    </Box>
  );

  if (isLoading)
    return (
      <Box className="flex justify-center w-full py-8">
        <CircleLoader />
      </Box>
    );

  return (
    <Box className="pt-4 w-full">
      <ReactSlickSlider noArrowStyle hideArrow>
        <Image
          src="/images/more/store-gallery1.png"
          alt="gallery"
          width={800}
          height={800}
          className="!w-64 mx-2 !min-w-64 md:!w-80 md:!min-w-80 h-40 md:h-44 rounded-md"
        />
        <Image
          src="/images/more/store-gallery2.png"
          alt="gallery"
          width={800}
          height={800}
          className="!w-64 mx-2 !min-w-64 md:!w-80 md:!min-w-80 h-40 md:h-44 rounded-md"
        />
        <Image
          src="/images/more/store-gallery3.png"
          alt="gallery"
          width={800}
          height={800}
          className="!w-64 mx-2 !min-w-64 md:!w-80 md:!min-w-80 h-40 md:h-44 rounded-md"
        />
      </ReactSlickSlider>
      <Box
        className="flex items-center justify-center bg-gray-100 rounded-full w-6 h-6 p-px cursor-pointer absolute m-1 mr-4 top-4 right-6"
        onClick={() => setStage("")}
      >
        <IconifyIcon icon="tabler:x" className="!text-gray-600 !text-[15px]" />
      </Box>
      <Box className="px-1 py-2 border-b">
        <BriefStoreWithFuntions
          setStage={setStage}
          image="/images/misc/shop/1.png"
          info={info}
        />
      </Box>
      <Box className="py-2 border-b px-2">
        <Typography
          variant="body1"
          className="!text-[14px] !font-bold !text-black !mb-2"
        >
          About Store
        </Typography>
        <Typography
          variant="body2"
          className="!text-[12px] !font-normal !text-gray-400"
        >
          {info.about_store}
        </Typography>
      </Box>

      <Box className="py-3 ">
        <Comp icon="tabler:map-pin" name={info.address} />
        <Comp icon="tabler:clock-pin" name={"Mon - Sat, 09:00 - 18:00"} />
        <Comp icon="tabler:phone-call" name={info.phone} />
        <Comp icon="tabler:mail" name={info.email} />
      </Box>
    </Box>
  );
};

export default AboutStore;
