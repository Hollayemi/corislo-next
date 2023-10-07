import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { styled, alpha } from "@mui/material/styles";
import { Testimonials, TestimonialsComponent, WhoIsWaiting } from "./Components/Footer";
import { SectionTitle } from "../../cards/homeCards";

const HomeFooter = () => {

  const pages = {
    company: ["About Us", "Careers", "Blog"],
    helpfulLinks: [
      "How it Works",
      "Terms of Service",
      "Privacy Policy",
      "Seller Requirements",
    ],
    contact: ["Customer Support", "Seller Support", "Report an Issue"],
  };

  const SetLinks = ({ pages }) => {
    const LinkStyled = styled(Link)(({ theme }) => ({
      fontSize: "0.875rem",
      textDecoration: "none",
      color: theme.palette.primary.main,
    }));
    return pages.map((page) => (
      <LinkStyled
        key={page}
        href={`/${page.toLocaleLowerCase()}`}
        sx={{ display: "block" }}
        color="white"
        className="px-0 my-4 w-fit !text-xs border-b-2 border-black hover:border-blue-600 !text-gray-200"
      >
        {page.replace("-", " ")}
      </LinkStyled>
    ));
  };



  return (
    <Box>
      <Box className="px-2 md:px-16">
        <SectionTitle black="What our" blue="Customers has to say" />
        <TestimonialsComponent />

        <WhoIsWaiting />
        <Box className="flex items-center justify-between !my-16">
          <Typography variant="body2" className="!font-bold w-40 md:w-auto">
            Download our Mobile app
          </Typography>
          <Box className="flex items-center">
            <Image
              src="/images/misc/app-store.png"
              alt="logo"
              width={200}
              height={200}
              className="!w-24 md:!w-32 !mr-2"
            />
            <Image
              src="/images/misc/play-store.png"
              alt="logo"
              width={200}
              height={200}
              className="!w-24 md:!w-32"
            />
          </Box>
        </Box>
      </Box>
      <Box className="bg-black">
        <Box className="px-8 sm:px-20 md:px-32 lg:px-36 py-10">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box className="!mb-5">
                <Image
                  src="/images/logo/horizontal/hor-logo-4.png"
                  alt="logo"
                  width={300}
                  height={300}
                  className="!w-32"
                />
                <Typography
                  variant="body2"
                  className="!text-white text-12 !font-bold !mt-5"
                >
                  Shop easy with <br className="hidden sm:block" /> our powered
                  solution.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={4} md={4}>
                  <Typography
                    variant="body1"
                    className="!mb-3 !font-bold !text-white"
                  >
                    Contact Us
                  </Typography>
                  <SetLinks pages={pages.contact} />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                  <Typography
                    variant="body1"
                    className="!mb-3 !font-bold !text-white"
                  >
                    Company
                  </Typography>
                  <SetLinks pages={pages.company} />
                </Grid>
                <Grid item xs={6} sm={4} md={4}>
                  <Typography
                    variant="body1"
                    className="!mb-3 !font-bold !text-white"
                  >
                    Helpful Links
                  </Typography>
                  <SetLinks pages={pages.helpfulLinks} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box className="bg-white h-10 mt-4 w-full bg-white flex items-center px-10 !rounded-xl">
            <Typography className="!text-xs !font-bold">
              {new Date().getFullYear()} Corisio. All rights reserved
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeFooter;
