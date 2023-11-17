import IconifyIcon from "@/app/components/icon";
import OptionsMenu from "@/app/components/option-menu";
import { ProductOnShowcase } from "@/app/components/templates/productTemplates";
import { moreProducts } from "@/app/data/home/homepage";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

const SearchPage = ({ search, setSearch }) => {
    const [filterBy, editFilter] = useState({ 
        category: "",
        price: "",
        review: "",
        location: "",
        size: "",
        discount: "",
        shipping_method: "",
     })

     console.log(filterBy);

     const FilterOptions = ({ name, options }) => {
        const filterName = name.replace(" ", "_").toLowerCase()
       const handleFilterChange = (option) => {
         editFilter((prev) => {
           return { ...prev, [filterName]: option };
         });
       };
       return (
         <OptionsMenu
           icon={
             <Box className="!text-xs !rounded-full !text-black bg-white px-4 py-1 flex items-center">
               <Typography variant="caption" className="">{name}</Typography>
               <IconifyIcon icon="tabler:chevron-down" className="ml-5" />
               {/* <IconifyIcon icon="tabler:chevron-up" className="ml-5" /> */}
             </Box>
           }
           options={options}
           setOption={handleFilterChange}
           iconButtonProps={{
             size: "small",
             sx: { color: "text.disabled", cursor: "pointer" },
             disableRipple: true,
           }}
         />
       );
     };

  return (
    <Box>
      <Box className="relative">
        <Image
          src="/images/misc/search-rec.png"
          alt="bg"
          width={1200}
          height={300}
          className="w-full h-24"
        />
        <Box className="absolute -bottom-6 left-0 w-full flex justify-center ">
          <Box className="w-2/5 min-w-[370px] relative !overflow-hidden">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-full pl-12 pr-16 focus outline-none border-blue-800 focus:border"
            />
            <IconifyIcon
              icon="tabler:search"
              className="absolute top-[14px] left-4"
            />
            <Button
              variant="text"
              className="!absolute top-[0px] !w-28 !rounded-r-full !h-12 -right-2 !border-l"
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className="relative mt-10 w-full flex flex-wrap justify-center items-center">
        <Typography variant="body2" className="!text-black !text-[12px] !mr-4">
          Filter:
        </Typography>
        <FilterOptions name="Category" options={["Men", "women", "children"]} />
        <FilterOptions name="Price" options={["Men", "women", "children"]} />
        <FilterOptions name="Review" options={["Men", "women", "children"]} />
        <FilterOptions name="Location" options={["Men", "women", "children"]} />
        <FilterOptions name="Size" options={["Men", "women", "children"]} />
        <FilterOptions name="Discount" options={["Men", "women", "children"]} />
        <FilterOptions
          name="Shipping Method"
          options={["Men", "women", "children"]}
        />
        <Typography variant="body2" className="!text-black !text-[12px] !ml-4">
          Reset filter
        </Typography>
      </Box>

      <Box className="md:px-8">
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
    </Box>
  );
};

export default SearchPage;
