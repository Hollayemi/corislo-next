"use client";
import {
  SellerDashboardImage,
  HowItWorksCard,
  NumberExplained,
  WhySell,
  CheckPoint,
} from "@/app/components/cards/sellerCards";
import {
  SectionMiddleTitle,
  SectionTitle,
} from "@/app/components/cards/homeCards";
import HomeWrapper from "@/app/components/view/home";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import IconifyIcon from "@/app/components/icon";
import {
  TestimonialsComponent,
  WhoIsWaiting,
} from "@/app/components/view/home/Components/Footer";
import AllPlans from "@/app/components/cards/plans";
import { useRouter } from "next/navigation";

const SellerPage = () => {
  const router = useRouter()
  return (
    <HomeWrapper bg="custom.bodyGray">
      <Box>
        <Box className="flex justify-center">
          <Box className="flex flex-col px-3 md:flex-row justify-between w-full md:w-4/5 !mb-5 !my-10">
            <Box>
              <Typography
                variant="body2"
                className="!text-4xl !font-black"
                color="primary"
              >
                Power Up <br className="hidden md:block" /> your Brand with
              </Typography>
              <Typography
                variant="body2"
                className="!text-4xl !font-black !mb-3"
                color="secondary"
              >
                Corisio
              </Typography>
              <Box className="flex items-center !mt-6">
                <Button
                  variant="contained"
                  className="!text-[9px] md:!text-[10px] !bg-orange-400 h-10  w-40 md:w-44 !shadow-none !rounded-full"
                  onClick={() => router.push("/store/register")}
                >
                  Register your Store
                </Button>
                <Button
                  variant="outlined"
                  className="!rounded-full p-2 h-10 w-40 !z-30 !ml-5"
                  bgcolor="custom.bodyGray"
                  startIcon={<IconifyIcon icon="tabler:player-play-filled" />}
                >
                  Watch Video
                </Button>
              </Box>
            </Box>

            <Box className="w-full md:w-[400px] !mt-6 md:!mt-0">
              <Typography variant="caption" className="!text-sm !mb-3">
                Are you a local business owner with a burning ambition to take
                your business to the next level? Do you dream of reaching a
                broader audience and sharing your unique products with the
                world?
              </Typography>

              <Box className="flex items-center !mt-6">
                <NumberExplained parent={124} info="Stores Registered" />
                <Box className="!ml-3"></Box>
                <NumberExplained parent="127+" info="Active Stores" />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Dashboard picture */}

        <Box className="flex justify-center !mt-32">
          <SellerDashboardImage />
        </Box>

        <Box className="flex justify-center w-full relative px-2 md:px-14">
          <Image
            src="/images/misc/req-right-rounded.png"
            alt="req-right-rounded"
            width={500}
            height={500}
            className="w-3/5 h-[300px] absolute left-0 top-16 z-0"
          />
          <Box className="flex flex-col-reverse lg:flex-row items-left  md:px-0 lg:px-10 z-50">
            <Box className="flex flex-wrap w-full lg:w-8/12">
              <Box className="p-2 sm:w-1/2 lg:w-80">
                <WhySell
                  title="Wider Audience"
                  image="icon-audience"
                  info="Join our platform to connect with a diverse and extensive customer base. Your products will reach customers across regions and demographics"
                />
              </Box>
              <Box className="p-2 sm:w-1/2 lg:w-80">
                <WhySell
                  title="Secure Transactions"
                  image="icon-payment"
                  info="Rest assured that your transactions are secure. We prioritize the safety of both buyers and sellers, employing robust security measures"
                />
              </Box>
              <Box className="p-2 sm:w-1/2 lg:w-80">
                <WhySell
                  title="Marketing Support"
                  image="icon-marketing"
                  info="We're invested in your success. Benefit from our platform-wide marketing efforts, including targeted advertising and promotional campaigns."
                />
              </Box>
              <Box className="p-2 sm:w-1/2 lg:w-80">
                <WhySell
                  title="User-Friendly Seller Dashboard"
                  image="icon-dashboard"
                  info="Our intuitive dashboard simplifies the process of managing your store and product listings. You can easily monitor orders, track inventory, and interact with customers."
                />
              </Box>
            </Box>

            <Box className="sm:w-10/12  md:w-80 px-5 mb-5 lg:mb-0">
              <SectionTitle black="Why" blue="sell with us?" />
              <Typography
                variant="body2"
                className="!text-2xl !font-[500] !mt-4 mb-6"
                color="primary"
              >
                Why should you trust and sell with us.
              </Typography>
              <Typography variant="caption" className="!mb-3" color="primary">
                At Corisio, we believe in empowering businesses and
                entrepreneurs like you. Selling with us offers a multitude of
                advantages that can help you succeed in today's competitive
                market
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* How it works */}

        <Box>
          <Box className="flex justify-center mt-20">
            <SectionTitle black="How" blue="It Works" />
          </Box>
          <Box className="md:hidden">
            <Image
              src="/images/misc/about-human.png"
              alt="circle"
              width={1200}
              height={1200}
              className="w-[380px] relative z-30 h-[500px]"
            />
          </Box>
          <Box className="relative flex justify-center mt-12 overflow-hidden">
            <Image
              src="/images/misc/gradient.png"
              alt="circle"
              width={1200}
              height={1200}
              className="absolute top-0 left-0 w-fit"
            />
            <Box>
              <HowItWorksCard
                step={1}
                title="Registration"
                text="Begin by signing up as a seller on our platform. Provide necessary information about your business and verify your identity"
              />
              <HowItWorksCard
                step={2}
                title="Product Listings"
                text="Create compelling product listings. Include high-quality images, detailed descriptions, and competitive prices."
              />
              <HowItWorksCard
                step={3}
                title="Order Management"
                text=" Monitor incoming orders through your seller dashboard. Process orders promptly and keep customers informed about shipping and delivery."
              />
            </Box>
            <Box className="hidden md:block">
              <Image
                src="/images/misc/about-human.png"
                alt="circle"
                width={1200}
                height={1200}
                className="w-[380px] relative z-30 h-[500px]"
              />
            </Box>
            <Box>
              <HowItWorksCard
                step={4}
                title="Registration"
                className="!mt-4"
                text="Begin by signing up as a seller on our platform. Provide necessary information about your business and verify your identity"
              />
              <HowItWorksCard
                step={5}
                title="Product Listings"
                text="Create compelling product listings. Include high-quality images, detailed descriptions, and competitive prices."
              />
              <HowItWorksCard
                step={6}
                title="Order Management"
                text=" Monitor incoming orders through your seller dashboard. Process orders promptly and keep customers informed about shipping and delivery."
              />
            </Box>
          </Box>
        </Box>

        {/* Seller's requirements */}
        <Box className="flex flex-col items-center">
          <Box className="w-full lg:w-4/5 px-4 ">
            <Box className="md:w-72 !mt-16">
              <Typography
                variant="body2"
                className="!font-bold !text-[13px] !mb-2"
                color="secondary"
              >
                Seller’s Requirements
              </Typography>
              <SectionTitle blue="Discover the Requirements for a Successful Partnership" />
            </Box>
            <Box className="mt-3 flex flex-col-reverse md:flex-row  justify-center items-center">
              <Box className="mt-3 md:w-1/2">
                <Typography variant="caption" className="!text-[13px] !mb-5">
                  At Corisio, we maintain high standards to ensure a safe and
                  positive shopping experience for our customers. To become a
                  seller on our platform, please review and meet the following
                  requirements:
                </Typography>
                <Box className="mt-5">
                  <CheckPoint
                    title="Business Registration:"
                    info="Make available your business registration number if your business is registered and if it is not registered yet, you can sign up for the default account."
                  />
                  <CheckPoint
                    title="Identity Verification:"
                    info="As part of the seller registration process, one of your authorized representatives must undergo identity verification. This verification helps ensure the security and trustworthiness of our platform (Can be Driver’s License, NIN or more)."
                  />
                  <CheckPoint
                    title="Product Quality: "
                    info="Provide high-quality products that meet industry standards and adhere to safety and quality guidelines. Your products should be free from defects and safe for consumers."
                  />
                </Box>
              </Box>
              <Box className="md:w-1/2 md:ml-10">
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
        </Box>
        <br />
        <br />
        {/* Princing */}
        <Box className="md:px-16 flex flex-col justify-center items-center w-full mt-20 mb-6 bg-white ">
          <br />
          <br />
          <Typography
            variant="body2"
            color="secondary"
            className="!font-bold !text-[13px] -mr-1.5 list"
          >
            Pricing
          </Typography>
          <Typography
            variant="body2"
            className="!font-bold !text-[17px] !ml-1.5 !text-center"
            color="primary"
          >
            Choose the plan that suits your business best. <br /> Upgrade or
            downgrade at any time.
          </Typography>
          <Box className="!w-inherit">
            <Box className="w-28 h-1 mt-2" bgcolor="custom.sec"></Box>
          </Box>
          <AllPlans hideChoosePlan />
          <br />
          <br />
        </Box>
        <br />
        <br />
        <Box className="px-2 md:px-16 mt-4">
          <SectionTitle black="What our" blue="Customers has to say" />
          <br />
          <br />
          <TestimonialsComponent />
          <Box className="flex justify-center">
            <WhoIsWaiting />
          </Box>
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default SellerPage;
