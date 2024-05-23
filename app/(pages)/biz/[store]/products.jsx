import React, { Fragment } from "react";
import ReactSlickSlider from "@/app/components/wrapper/react-slick";
import { hotDealData, moreProducts } from "@/app/data/home/homepage";
import CountdownTimer from "@/app/components/cards/countDown";
import { SectionTitle } from "@/app/components/cards/homeCards";
import IconifyIcon from "@/app/components/icon";
import { Box, Button, Typography } from "@mui/material";
import {
  HotDeal,
  ProductOnShowcase,
} from "@/app/components/templates/productTemplates";

const StoreProducts = () => {
  return (
    <Fragment>
      {/* 
            f
            f
            */}
      {/* FLash Sale */}
      <Box
        className="w-full flex items-center justify-between h-12 rounded-md px-3 md:px-6 mt-14"
        bgcolor="custom.sec"
      >
        <Typography
          variant="body2"
          className="!text-s !font-bold"
          color="white"
        >
          Flash Sales Items
        </Typography>

        <CountdownTimer
          initialDate={new Date()}
          daysToCount={5}
          className="!text-md !text-white"
          styleCaption="!text-[11px] !text-white"
        />
      </Box>

      <Box className="!mt-6 flex flex-wrap justify-center">
        {moreProducts.map((prod, i) => (
          <ProductOnShowcase
            key={i}
            prodName={prod.prodName}
            prodPrice={prod.prodPrice}
            image={`/images/more/${i + 1}.png`}
            star={prod.star}
            store={prod.store}
          />
        ))}
      </Box>
      <Box className="px-2 md:px-10 my-4">
        {/* <SectionTitle black="Hot" blue="Deal" /> */}

        {/* <ReactSlickSlider>
                {hotDealData.map((prod, i) => (
                  <HotDeal
                    key={i}
                    image={prod.image}
                    prodName={prod.prodName}
                    price={prod.price}
                    unit={prod.unit}
                    of={prod.of}
                  />
                ))}
              </ReactSlickSlider> */}
      </Box>
      <Box>
        <br />
        <SectionTitle black="Picked" blue="for you" />
        <br />
        <Box className="!mt-6 flex flex-wrap justify-center">
          {moreProducts.map((prod, i) => (
            <ProductOnShowcase
              key={i}
              prodName={prod.prodName}
              prodPrice={prod.prodPrice}
              image={`/images/more/${i + 1}.png`}
              star={prod.star}
              store={prod.store}
            />
          ))}
        </Box>
      </Box>
    </Fragment>
  );
};

export default StoreProducts;
