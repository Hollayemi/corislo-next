"use client";
import {
  SellerDashboardImage,
  HowItWorksCard,
  NumberExplained,
  WhySell,
} from "@/app/components/cards/sellerCards";
import { SectionTitle } from "@/app/components/cards/homeCards";
import HomeWrapper from "@/app/components/view/home";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import IconifyIcon from "@/app/components/icon";

const SellerPage = () => {
  return (
    <HomeWrapper bg="custom.bodyLight">
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

        <Box className="flex justify-center w-full relative md:px-14">
          <Image
            src="/images/misc/req-right-rounded.png"
            alt="req-right-rounded"
            width={500}
            height={500}
            className="w-3/5 h-[300px] absolute left-0 top-16 z-0"
          />
          <Grid container spacing={0}>
            <Grid item sm={12} lg={8.5}>
              <Box className="px-3">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <WhySell
                      title="Wider Audience"
                      image="icon-audience"
                      info="Join our platform to connect with a diverse and extensive customer base. Your products will reach customers across regions and demographics"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <WhySell
                      title="Secure Transactions"
                      image="icon-payment"
                      info="Rest assured that your transactions are secure. We prioritize the safety of both buyers and sellers, employing robust security measures"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <WhySell
                      title="Marketing Support"
                      image="icon-marketing"
                      info="We're invested in your success. Benefit from our platform-wide marketing efforts, including targeted advertising and promotional campaigns."
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <WhySell
                      title="User-Friendly Seller Dashboard"
                      image="icon-dashboard"
                      info="Our intuitive dashboard simplifies the process of managing your store and product listings. You can easily monitor orders, track inventory, and interact with customers."
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Box className="px-3">
              <Grid item sm={12} lg={3.5} className="relative z-10">
                <br />
                <br />
                <br />
                <SectionTitle black="Why" blue="sell with us?" />
                <Typography
                  variant="body2"
                  className="!text-3xl !font-[500] !mt-4 mb-6"
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
              </Grid>
            </Box>
          </Grid>
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
          <Box className="relative flex justify-center mt-12">
            <Image
              src="/images/misc/gradient.png"
              alt="circle"
              width={1200}
              height={1200}
              className="absolute top-0 left-0 w-full"
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
      </Box>
    </HomeWrapper>
  );
};

export default SellerPage;
