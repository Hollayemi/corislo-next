const { Box, Typography, Rating, Button } = require("@mui/material");
import IconifyIcon from "@/app/components/icon";
import ReactSlickSlider from "@/app/components/wrapper/react-slick";
import { mySubstring } from "@/app/utils/format";
import Image from "next/image";

export const ShopImage = ({ image, name, brief, icon, onClick }) => {
  return (
    <Box
      onClick={onClick}
      className="w-40 md:w-52 h-48 md:h-64 relative overflow-hidden rounded-xl m-1 md:m-3 overflowStyle shrink-0"
    >
      <Image
        src={image}
        className="w-full h-full "
        width={600}
        height={600}
        alt={name}
      />
      <Box className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full flex flex-col justify-between h-full top-0 left-0">
        <Box className="flex items-center p-2">
          <Image
            src={icon}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full"
            width={300}
            height={300}
            alt="name"
          />
          <Box className="!ml-2 w-fit min-w-24 md:min-w-32">
            <Typography
              variant="body2"
              noWrap
              className="!text-gray-200 !font-bold !text-[12px] md:!text-[15px]"
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              noWrap
              className="!text-gray-300 !text-[11px]"
            >
              Benin city
            </Typography>
          </Box>
        </Box>
        <Box className="bg-gradient-to-t from-transparent via-black to-transparent p-2">
          <Typography variant="body2" className="!text-white !text-[12px]">
            {mySubstring(brief, 90)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const ServiceListing = ({ image, name, brief, icon }) => {
  return (
    <Box className="w-1/2 md:w-64 p-1 mb-2">
      <Box className="w-full md:h-40 relative border rounded-md overflowStyle shrink-0">
        <Box className="w-full flex flex-col top-0 left-0 p-2">
          <Box className="flex items-center">
            <Image
              src={icon}
              className="w-10 h-10 rounded-full"
              width={300}
              height={300}
              alt="name"
            />
            <Box className="!ml-1 md:!ml-2 w-fit min-w-24 md:min-w-44">
              <Typography
                variant="body2"
                noWrap
                className="!text-gray-700 !font-bold !text-[15px]"
              >
                {name}
              </Typography>
              <Typography
                variant="body2"
                noWrap
                className="!text-gray-500 !text-[10px]"
              >
                Benin city
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="body2"
            className="!text-gray-600 !text-[11px] md:!text-[12px] !mt-3 !mb-1"
          >
            {mySubstring(brief, 70)}
          </Typography>
          <Rating
            defaultValue={3.5 || 0}
            className="!text-[18px]"
            readOnly
            name="size-small"
            size="medium"
          />
        </Box>
        <Box className="border-t w-full h-8 min-h-8 flex justify-between items-center px-1 md:px-3">
          <Box className="flex items-center">
            <IconifyIcon
              icon="tabler:map-pin"
              className="!text-[16px] mr-1 -mt-1"
            />
            <Typography
              variant="body2"
              noWrap
              className="!text-gray-700 !text-[11px]"
            >
              Benin City
            </Typography>
          </Box>
          <Button
            className="!text-[11px] !text-blue-900 h-6 !font-bold"
            disableRipple
          >
            <span className="hidden sm:block mr-1 mb-0.5">See</span> Details
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export const StatusView = ({ close }) => {
  const info = {
    icon: "/images/misc/shop/6.png",
    name: "Mamafeeds International",
    city: "Benin City",
  };

  const images = [1, 2, 3, 4, 5];

  const StatusMedia = ({ image }) => (
    <Box className="w-full h-auto px-2 mt-4 flex items-center justify-center">
      <Image
        src={image}
        alt="ser"
        className="w-full h-full rounded-xl"
        width={1000}
        height={1000}
      />
    </Box>
  );
  return (
    <Box className="flex items-center justify-center w-full h-full px-4">
      <Box className="w-full max-w-[400px] h-[560px] mt-10 rounded-xl overflow-hidden shadow-xl relative">
        <Box className="bg-slate-900 h-full w-full opacity-90"></Box>
        <Box className="absolute left-0 top-0 w-full h-[100%] px-3 pt-2">
          <Box className="flex items-center justify-between">
            <Box className="flex items-center p-2">
              <Image
                src={info.icon}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                width={300}
                height={300}
                alt="name"
              />
              <Box className="!ml-2 w-fit min-w-24 md:min-w-32">
                <Typography
                  variant="body2"
                  noWrap
                  className="!text-gray-200 !font-bold !text-[12px] md:!text-[15px]"
                >
                  {info.name}
                </Typography>
                <Typography
                  variant="body2"
                  noWrap
                  className="!text-gray-300 !text-[11px]"
                >
                  {info.city}
                </Typography>
              </Box>
            </Box>

            <Box
              className="w-6 h-6 cursor-pointer hover:bg-slate-700 flex items-center justify-center !rounded-full mr-3"
              onClick={close}
            >
              <IconifyIcon
                icon="tabler:x"
                className="!text-[19px] text-white"
              />
            </Box>
          </Box>
          <Box className="h-auto max-h-[350px]">
            <ReactSlickSlider config={2} noArrowStyle>
              {images.map((_, i) => (
                <StatusMedia key={i} image={`/images/more/${i + 1}.png`} />
              ))}
            </ReactSlickSlider>
          </Box>
          <Typography
            variant="body2"
            className="!text-white !text-[11px] absolute bottom-6 z-50 h-12 !mt-6 px-6"
          >
            Mamafeeds International is a premier destination that combines
            luxury spa services with high-end fashion. Catering to clients who
            seek relaxa.....
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
