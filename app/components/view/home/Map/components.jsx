import { Box, Typography, Rating } from "@mui/material";
import Image from "next/image";
import IconifyIcon from "@/app/components/icon";
import useSWR from "swr";
import { CircleLoader } from "@/app/components/cards/loader";

export const BriefStoreOnMap = ({ image, open, branchId, storeView }) => {
  const { data, isLoading } = useSWR(`/branch/info?branchId=${branchId}`);
  console.log(branchId);
  const info = data?.data || {};
  if (isLoading)
    return (
      <Box className="p-3">
        <CircleLoader />
      </Box>
    );
  return (
    <Box>
      {storeView && (
        <Image
          src={storeView}
          alt="store"
          width={900}
          height={900}
          className="w-full h-28 rounded-xl mb-2"
        />
      )}
      <Box className="flex items-center">
        <Image
          src={image || "/images/misc/shop/1.png"}
          alt="store"
          width={200}
          height={200}
          className="w-14 h-14 rounded-full border"
        />
        <Box>
          <Typography
            variant="body2"
            noWrap
            className="!text-[14px] !font-bold !px-2 !text-black !w-40"
          >
            {info.businessName}
          </Typography>
          <Box
            className={`flex items-start mt-0.5 ml-1.5 ${
              open ? "!text-green-500" : "!text-red-500"
            }`}
          >
            <IconifyIcon
              icon={!open ? "tabler:clock-stop" : "tabler:clock-pin"}
              className="!text-[15px]"
            />
            <Box className="flex items-center">
              <span className="!text-[12px] ml-1.5">
                {open ? "Open now" : "Closed"}
              </span>
            </Box>
            <Typography
              variant="body2"
              className="!text-[11px] !px-2 !text-black"
            >
              Mon - Sat, 09:00 - 18:00
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const BriefStoreWithFuntions = ({
  image,
  shopName,
  rating,
  setStage,
}) => {
  return (
    <Box className="flex items-center justify-between">
      <Box className="flex items-center">
        <Image
          src={image}
          alt="store"
          width={200}
          height={200}
          className="w-14 h-14 rounded-full border"
        />
        <Box>
          <Typography
            variant="body2"
            noWrap
            className="!text-[14px] !font-bold !px-2 !text-black md:w-32"
          >
            {shopName}
          </Typography>
          <Box className="flex items-center ml-1.5">
            <Rating
              size="small"
              value={3 / 5}
              readOnly
              max={1}
              precision={0.1}
            />
            <Typography
              variant="body2"
              className="!text-[13px] !font-bold !px-2 pt-0.5 !text-black"
            >
              4/5
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="flex items-center mt-5">
        <Box
          className="!w-6 !h-6 md:!w-10 md:!h-10 rounded-full md:mt-0 flex items-center justify-center cursor-pointer md:mr-1 md:border-2 border-blue-900"
          onClick={() => setStage("direction")}
        >
          <IconifyIcon
            icon="tabler:corner-up-left"
            className="!text-blue-900"
          />
        </Box>
        <Box
          className="!w-6 !h-6 md:!w-10 md:!h-10 rounded-full md:mt-0 flex items-center justify-center cursor-pointer mx-1 md:border-2 border-blue-900"
          onClick={() => setStage("store")}
        >
          <IconifyIcon
            icon="tabler:link"
            className="!text-blue-900"
          />
        </Box>
        <Box className="!w-6 !h-6 md:!w-10 md:!h-10 rounded-full md:mt-0 flex items-center justify-center cursor-pointer md:ml-1 md:border-2 border-blue-900">
          <IconifyIcon icon="tabler:share" className="!text-blue-900" />
        </Box>
      </Box>
    </Box>
  );
};

export const StoreDetails1 = () => {
  const { data, isLoading } = useSWR(
    "/branch/info?branchId=65ac80101cc3db0407fa00c9"
  );
  const info = data?.data || {};

  if (isLoading)
    return (
      <Box className="p-3">
        <CircleLoader />
      </Box>
    );

  const SpaceBetween = ({ title, info }) => (
    <Box className="flex justify-between mb-2.5">
      <Typography
        variant="body2"
        className="!text-[12px] !text-gray-400 !w-18 !flex-shrink-0"
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        className="!text-[12px] !text-gray-600 !text-right !w-3/5 !max-w-3/5"
      >
        {info}
      </Typography>
    </Box>
  );
  return (
    <Box className="border rounded-md">
      <Box className="border-b p-2">
        <BriefStoreOnMap
          image="/images/misc/shop/1.png"
          branchId="65ac80101cc3db0407fa00c9"
        />
      </Box>
      <Box className="p-2">
        <SpaceBetween title="Phone Number:" info="+234 (801) 234 5678" />
        <SpaceBetween
          title="Address:"
          info="2 Nike Art Gallery Rd, Lekki Phase I, 
Lekki 106104, Lagos"
        />
        <SpaceBetween title="Email Address:" info="shoplocal@sample.xyz" />
      </Box>
    </Box>
  );
};
