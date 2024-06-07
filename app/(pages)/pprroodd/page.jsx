"use client";
import { ProductOnShowcase } from "@/app/components/templates/productTemplates";
import { Box } from "@mui/material";
import useSWR from "swr";

const { default: HomeWrapper } = require("@/app/components/view/home");

const AIProductListing = () => {
  const { data: prods, isLoading } = useSWR("/products?limit=400");
  const products = prods ? prods.data : [];
  return (
    <HomeWrapper>
      <Box className="px-2 md:px-8">
        <Box className="!mt-6 flex flex-wrap justify-center">
          {products.map((prod, i) => (
            <ProductOnShowcase
              key={i}
              prodName={prod.prodName}
              prodPrice={prod.prodPrice}
              image={`/images/more/${i + 1}.png`}
              star={prod.star}
              store={prod.store}
              branch={prod.branch}
              others={{ ...prod }}
            />
          ))}
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default AIProductListing;
