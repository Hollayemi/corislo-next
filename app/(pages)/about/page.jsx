"use client";

import { SectionTitle } from "@/app/components/cards/homeCards";
import { CheckPoint, CoreValues } from "@/app/components/cards/sellerCards";
import HomeWrapper from "@/app/components/view/home";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";

const About = () => {
  return (
    <HomeWrapper>
      <Box className="flex flex-col md:flex-row  md:h-[400px]">
        <Box className="w-full md:w-1/2 px-3 flex flex-col items-center justify-center">
          <Box className="w-full mt-7 md:mt-0 md:w-[450px]">
            <Box className="flex items-center">
              <Typography
                variant="body2"
                className="!text-4xl !font-black"
                color="black"
              >
                We are
              </Typography>
              <Typography
                variant="body2"
                className="!text-4xl !font-black !ml-2"
                color="secondary"
              >
                shaping
              </Typography>
            </Box>
            <Typography
              variant="body2"
              className="!text-4xl !font-black !mb-3"
              color="black"
            >
              B2B E-commerce.
            </Typography>
            <Typography variant="caption" className="!text-sm leading-6 !mt-10">
              Are you a local business owner with a burning ambition to take
              your business to the next level? Do you dream of reaching a
              broader audience and sharing your unique products with the world?
            </Typography>
          </Box>
        </Box>
        <Box className="flex items-center justify-center relative md:w-1/2 py-6 mt-14 overflow-hidden">
          <Image
            src="/images/misc/about-image.png"
            alt="req-right-rounded"
            width={500}
            height={500}
            className="w-[330px] h-[380px] left-0 relative z-10"
          />
          <Box className="w-[400px] h-[400px] !absolute rounded-full bg-[#DEE2FF] -right-16 -top-24 z-0"></Box>
        </Box>
      </Box>

      <Box className="flex justify-center">
        <Box className=" w-full px-3 md:w-4/5">
          <Box className="flex items-center">
            <Box className="w-10 md:w-36 h-0.5 bg-black"></Box>
            <Typography
              variant="body2"
              className="!text-2xl !font-black"
              color="black"
            >
              Our Story
            </Typography>
          </Box>
          <Box className="ml-10 md:ml-36 mt-3">
            <Typography variant="caption" className="!font-bold" color="black">
              Founded in 2023, Corisio has quickly evolved from a visionary
              concept into a leading force in the B2B e-commerce sphere. Our
              founders, Founder Names, envisioned a world where businesses of
              all sizes could effortlessly connect, trade, and grow.{" "}
              <br className="" />
              From humble beginnings, Corisio has steadily grown into a vibrant
              marketplace where thousands of businesses across various
              industries find opportunities, expand their reach, and realize
              their full potential.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box className="flex justify-center !mt-16 w-full">
          <Box className="flex flex-col md:flex-row items-center w-full px-3 md:w-4/5">
            <Image
              src="/images/misc/vision.png"
              alt="req-right-rounded"
              width={500}
              height={500}
              className="w-full md:w-80 h-56 mr-2 left-0 relative z-10"
            />
            <Box className="!mx-2 !mt-6 md:!ml-6">
              <SectionTitle black="Our" blue="Vision" />
              <Typography
                variant="caption"
                className="!text-sm leading-6 !mt-4"
              >
                At Corisio, we aspire to be more than just an online
                marketplace. Our vision is to empower businesses, from local
                startups to established enterprises, to thrive in the digital
                age. We're committed to driving innovation, fostering trust, and
                delivering unmatched value to our users.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="flex justify-center !mt-16">
        <Box className="px-5 w-full md:w-4/5">
          <SectionTitle black="Core" blue="Value" />
          <Box className="!mt-6 flex flex-col md:flex-row items-center">
            <CoreValues
              top="Connectivity"
              bottom="Expand Your Horizons"
              text="At Corisio, we understand that in today's interconnected world, your network is your net worth. By choosing Corisio, you're not just joining an e-commerce platform; you're entering a dynamic community of businesses."
            />
            <CoreValues
              top="Efficiency"
              bottom="Streamlined Success"
              text="In the fast-paced world of business, every moment counts. Corisio is designed to be your trusted ally in optimizing efficiency. Whether you're a buyer looking to streamline your procurement processes or a seller seeking a more efficient sales."
            />
            <CoreValues
              top="Trust"
              bottom="Your Security, Our Priority"
              text="In an era where trust is paramount, Corisio places it at the forefront. We take your security seriously. Our platform is built on a foundation of transparency, and we go the extra mile to ensure your data and transactions are safeguarded."
            />
          </Box>
        </Box>
      </Box>

      <Box className="flex justify-center !mt-16">
        <Box className="w-full md:w-4/5 px-4 mt-3 flex flex-col-reverse justify-center items-center">
          <Box className="mt-3 md:w-1/2">
            <Typography variant="caption" className="!text-[12px] !mb-5">
              Are you ready to take your business to the next level? At Corisio,
              we're not just an e-commerce platform; we're your gateway to
              success. Here's why choosing Corisio is the right move for your
              business:
            </Typography>
            <Box className="mt-5">
              <CheckPoint
                title="Limitless Opportunities:"
                info="Corisio opens the doors to a world of opportunities. Join our thriving community of businesses to expand your network, collaborate with like-minded entrepreneurs, and discover new markets."
              />
              <CheckPoint
                title="Efficiency Redefined:"
                info="Say goodbye to time-consuming processes. Corisio offers streamlined solutions for both buyers and sellers, making every transaction efficient and hassle-free."
              />
              <CheckPoint
                title="Trust and Security:"
                info="Your business's security is our top priority. Corisio prioritizes transparency and security, providing a trustworthy platform for all your business needs."
              />
              <CheckPoint
                title="Innovation at Your Fingertips:"
                info="Benefit from cutting-edge e-commerce technologies that keep you ahead of the competition. Corisio is committed to innovation and staying at the forefront of industry trends."
              />
              <CheckPoint
                title="Dedicated Support:"
                info="With Corisio, you're never alone on your business journey. Gain access to dedicated customer support and a wealth of resources to help you thrive."
              />
            </Box>
          </Box>
          <Box className="md:w-1/2 md:!ml-28">
            <Box className="md:w-72">
              <Typography
                variant="body2"
                className="!font-bold !text-[13px] !mb-2"
                color="secondary"
              >
                Why choose Corisio
              </Typography>
              <SectionTitle blue="Unlock Your Business Potential with Corisio" />
            </Box>
            <Image
              src="/images/misc/storeImage2.png"
              alt="check"
              width={1000}
              height={1000}
              className="w-84 h-[500px] mt-2 mr-1"
            />
          </Box>
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default About;
