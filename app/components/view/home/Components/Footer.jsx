import { formatDate, formatDateToMonthShort } from "@/app/utils/format";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import ReactSlickSlider from "../../../wrapper/react-slick";

export const WhoIsWaiting = () => {
  return (
    <Box className="w-full md:w-4/6 h-[200px] md:h-[300px] relative !rounded-xl overflow-hidden shadow">
      <Image
        src="/images/misc/who-is-waiting.png"
        alt="image-here"
        width={700}
        height={700}
        className="!w-full h-full absolute top-0 left-0"
      />
      <Box
        className="absolute top-0 left-0 w-full h-full opacity-90"
        bgcolor="custom.bodyLight"
      ></Box>
      <Box className="relative h-full z-30 mt-2">
        <Box className="!font-bold flex flex-col items-center justify-center h-full ">
          <Typography variant="body2" className="!text-2xl !text-black">
            Millions of stores are waiting to
          </Typography>
          <Typography
            variant="body2"
            className="!text-2xl !mt-1"
            color="secondary"
          >
            serve you.
          </Typography>
          <Button
            variant="contained"
            className="!mt-7 !text-xs !rounded-full h-10 w-32"
          >
            Shop Now
          </Button>
        </Box>
      </Box>
      <Image
        src="/images/avatar/1.png"
        alt="image-here"
        width={100}
        height={200}
        className="!w-8 h-8 md:!w-12 md:h-12 absolute !rounded-full top-2 md:top-2 left-1/2 md:left-1/2"
      />
      <Image
        src="/images/avatar/2.png"
        alt="image-here"
        width={100}
        height={200}
        className="!w-8 h-8 md:!w-12 md:h-12 absolute !rounded-full top-16 md:top-10 right-10 md:right-10"
      />
      <Image
        src="/images/avatar/3.png"
        alt="image-here"
        width={100}
        height={200}
        className="!w-8 h-8 md:!w-12 md:h-12 absolute !rounded-full bottom-10 md:bottom-10 left-10 md:left-10"
      />
      <Image
        src="/images/avatar/4.png"
        alt="image-here"
        width={100}
        height={200}
        className="!w-8 h-8 md:!w-12 md:h-12 absolute !rounded-full bottom-4 md:bottom-4 right-16 md:right-16"
      />
    </Box>
  );
};

//
//
//
//
//

export const Testimonials = ({ text, pic, name, nameCap, date }) => {
  return (
    <Box
      className="px-5 py-7 w-80 min-w-72 flex-shrink-0 !h-60 !rounded-xl m-2"
      bgcolor="custom.bodyLight"
    >
      <RoundedPicWithName
        pic={pic}
        name={name}
        caption={nameCap}
        className="mb-5"
      />
      <Typography variant="caption" className="!text-10">
        {text}
      </Typography>
      <Box className="!mt-2">
        <Typography variant="caption" className="!text-gray-400">
          {formatDate(date)}
        </Typography>
      </Box>
    </Box>
  );
};
//
//
//
//
//

export const RoundedPicWithName = ({
  pic,
  name,
  caption,
  className,
  imageStyle,
}) => {
  return (
    <Box className={`flex items-center ${className}`}>
      <img
        src={pic}
        alt={name}
        className={`w-10 h-10 rounded-full ${imageStyle}`}
      />
      <Box className="!ml-3 w-40">
        <Typography
          noWrap
          variant="body1"
          className="!font-bold whitespace-nowrap !leading-0 text-ellipsis"
        >
          {name}
        </Typography>
        <Typography variant="caption" className="!leading-0">
          {caption}
        </Typography>
      </Box>
    </Box>
  );
};

export const TestimonialsComponent = () => {
  const tesArray = [
    {
      name: "Oluwasusi Stephen Olayemi",
      nameCap: "Ondo State",
      date: new Date(),
      pic: "/images/avatar/1.png",
      text: "I stumbled upon this platform and it's been a game-changer. Not only do they connect you with amazing local stores, but their customer service is top-notch.",
    },
    {
      name: "Amuroko Joy",
      nameCap: "Ondo State",
      date: new Date(),
      pic: "/images/avatar/1.png",
      text: "I stumbled upon this platform and it's been a game-changer. Not only do they connect you with amazing local stores, but their customer service is top-notch.",
    },
    {
      name: "Oluwasusi Stephen Olayemi",
      nameCap: "Ondo State",
      date: new Date(),
      pic: "/images/avatar/1.png",
      text: "I stumbled upon this platform and it's been a game-changer. Not only do they connect you with amazing local stores, but their customer service is top-notch.",
    },
  ];
  return (
    <Box className="relative mb-16">
      <Box className="relative z-30">
        <ReactSlickSlider>
          {tesArray.map((tes, i) => (
            <Testimonials
              key={i}
              pic={tes.pic}
              text={tes.text}
              date={tes.date}
              name={tes.name}
              nameCap={tes.nameCap}
            />
          ))}
        </ReactSlickSlider>
      </Box>
      <Box className="absolute w-full h-full top-0 left-0 z-10">
        <Image
          src="/images/star/3.png"
          alt="logo"
          width={100}
          height={100}
          className="!w-24 absolute -top-6 -left-6"
        />
        <Image
          src="/images/star/4.png"
          alt="logo"
          width={100}
          height={100}
          className="!w-20 absolute top-10 right-0"
        />
        <Image
          src="/images/star/5.png"
          alt="logo"
          width={100}
          height={100}
          className="!w-20 absolute -top-8 left-1/2"
        />
        <Image
          src="/images/star/6.png"
          alt="logo"
          width={100}
          height={100}
          className="!w-20 absolute -bottom-8 left-20"
        />
      </Box>
    </Box>
  );
};
