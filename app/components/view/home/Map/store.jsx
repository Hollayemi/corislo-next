import { Box, Typography } from "@mui/material";
import ReactSlickSlider from "@/app/components/wrapper/react-slick";
import Image from "next/image";
import IconifyIcon from "@/app/components/icon";
import useSWR from "swr";
import { BriefStoreWithFuntions } from "./components";

const AboutStore = ({ setStage }) => {
  const { data } = useSWR("/branch/info?branchId=65e29c4266575a7988cc52b9");
  const info = data?.data || {};

  const Comp = ({ name, icon }) => (
    <Box className="flex items-center mb-2">
      <IconifyIcon icon={icon} className="!text-[16px] mr-2.5 !text-blue-700" />
      <Typography
        variant="body2"
        className="!text-[12px] !text-gray-400 parent-hover:!text-black !flex-shrink-0"
      >
        {name}
      </Typography>
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
          className="!w-80 !min-w-80 h-44 rounded-md"
        />
        <Image
          src="/images/more/store-gallery2.png"
          alt="gallery"
          width={800}
          height={800}
          className="!w-80 !min-w-80 h-44 rounded-md"
        />
        <Image
          src="/images/more/store-gallery3.png"
          alt="gallery"
          width={800}
          height={800}
          className="!w-80 !min-w-80 h-44 rounded-md"
        />
      </ReactSlickSlider>
      <Box
        className="flex items-center justify-center bg-gray-100 rounded-full w-6 h-6 p-px cursor-pointer absolute m-1 mr-3 top-4 right-6"
        onClick={() => setStage("")}
      >
        <IconifyIcon icon="tabler:x" className="!text-gray-600 !text-[15px]" />
      </Box>
      <Box className="px-1 py-2 border-b">
        <BriefStoreWithFuntions
          setStage={setStage}
          image="/images/misc/shop/1.png"
          shopName={info.businessName}
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
          Curated collections for the modern woman on the go. We offer
          effortless everyday pieces and statement styles for all occasions.
          Shop our latest arrivals and discover your new wardrobe essentials. ️
        </Typography>
      </Box>

      <Box className="py-3 ">
        <Comp icon="tabler:map-pin" name={info.address} />
        <Comp icon="tabler:x" name={"Mon - Sat, 09:00 - 18:00"} />
        <Comp icon="tabler:x" name={info.phone} />
        <Comp icon="tabler:x" name={info.email} />
      </Box>
    </Box>
  );
};

export default AboutStore;
