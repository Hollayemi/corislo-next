import { Box, Button, Grid, Rating, Typography } from "@mui/material";
import Image from "next/image";
import IconifyIcon from "../icon";
import { useRouter } from "next/navigation"
import { mySubstring } from "@/app/utils/format";
import { hexToRGBA } from "@/app/utils/hex-to-rgba";
import { rgbaToHex } from "@/app/utils/rgba-to-hex";

export const SectionTitle = ({ black, blue }) => {
  return (
    <Box className="w-fit mb-2 relative z-30 ">
      <Box className="flex items-center">
        <Typography
          variant="body2"
          className="!font-bold !text-[17px] !text-black -mr-1.5"
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
};

export const SectionMiddleTitle = ({ black, blue }) => {
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
};

export const FlashSale = () => {
  return (
    <Box className="flex justify-center w-full">
      <Box className="w-[340px] md:w-4/6 overflow-hidden">
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Image
              src="/images/misc/flash-sale.png"
              alt="flyer"
              width={500}
              height={500}
              className="w-full h-[180px] md:w-[500px] md:h-[370px]"
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Box className="py-5">
              <Typography
                variant="body2"
                className="!text-black !text-[12px] !mb-4 !font-bold"
              >
                Latest Discounts
              </Typography>
              <Typography
                variant="body2"
                className="!text-black !text-[19px] !font-black"
              >
                Tianxhu Store
              </Typography>
              <Typography variant="caption" className="!w-60">
                Get ready to snag the best deals at Tianxhu's exclusive Flash
                Sales event!
              </Typography>

              <Box className="mt-8 flex items-center ">
                <Image
                  src="/images/more/4.png"
                  alt="flyer"
                  width={300}
                  height={300}
                  className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0 mr-6"
                />

                <Image
                  src="/images/more/5.png"
                  alt="flyer"
                  width={300}
                  height={300}
                  className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0 mr-6"
                />

                <Image
                  src="/images/more/6.png"
                  alt="flyer"
                  width={300}
                  height={300}
                  className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0 mr-6"
                />
              </Box>
              <Button
                variant="contained"
                className="!text-[11px] !rounded-full shadow-none !mt-5"
              >
                Shop Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export const PopularAds = ({ store, title, brief, image, url }) => {
  const router = useRouter()
  return (
    <Box className="!w-[350px] !h-48 flex !bg-yellow-50 !rounded-xl p-5">
      <Box className="w-1/2 pr-6 relative">
        <Typography variant="body2" className="!text-[10px] !font-bold">
          {store}
        </Typography>
        <Typography variant="body2" className="!text-md !mt-3 !font-extrabold">
          {title}
        </Typography>
        <Typography
          variant="body2"
          className="!text-red-500 !mt-2 !text-[10px]"
        >
          {mySubstring(brief, 50)}
        </Typography>

        <Button
          variant="outlined"
          endIcon={<IconifyIcon icon="tabler:chevron-right" />}
          className="!border-none !text-[10px] !absolute bottom-0 left-0"
          onClick={() => router.push(url)}
        >
          Discover Now
        </Button>
      </Box>
      <Box className="w-1/2 h-full">
        <Image
          src={image}
          alt="flyer"
          width={400}
          height={400}
          className="!w-full h-full flex-shrink-0 mr-6"
        />
      </Box>
    </Box>
  );
};

export const TopStores = ({ image, name, rating, followers = 0 }) => {
  return (
    <Box className="flex flex-col items-center justify-center px-2">
      <Image
        src={image}
        alt="flyer"
        width={400}
        height={400}
        className="!w-36 h-36 !rounded-full flex-shrink-0 !mb-3"
      />

      <Typography variant="body2" className="!text-[13px] !font-bold">
        {name}
      </Typography>
      <Typography variant="caption" className="!text-[10px]">
        {followers.toLocaleString()} Followers
      </Typography>
      <Rating
        value={rating}
        className="!text-[15px]"
        readOnly
        name="size-smalll"
        defaultValue={rating || 4}
      />
    </Box>
  );
};

export const SecurityTypeCard = ({ image, title, caption }) => {
  return (
    <Box className="flex flex-col justify-center items-center w-60 !mt-16 !mx-6">
      <Image
        src={`/images/misc/${image}.png`}
        width={150}
        height={150}
        className="w-12 h-12 !mb-6"
      />
      <Typography variant="body2" className="!font-bold">
        {title}
      </Typography>
      <Typography variant="caption" className="text-center !mt-2">
        {caption}
      </Typography>
    </Box>
  );
};

export const OrderBoxes = ({ image, title, value, color }) => {
  let bgColor = rgbaToHex(hexToRGBA(color, 0.1));
  let IconBgColor = rgbaToHex(hexToRGBA(color, 0.4));
  return (
    <Box className="w-1/2 md:w-1/4 p-0.5 md:p-2">
      <Box
        className="flex items-center p-2 md:p-4 w-full rounded-md"
        bgcolor={bgColor}
      >
        <Box
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
          bgcolor={IconBgColor}
        >
          <Image
            src={image}
            alt="image"
            width={150}
            height={150}
            className="w-7 h-7 md:w-9 md:h-9"
          />
        </Box>
        <Box className="ml-3">
          <Typography
            variant="caption"
            className="!text-[10px] md:!text-[12px]"
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color={color}
            className="!font-black !text-[20px]"
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};