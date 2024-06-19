import IconifyIcon from "@/app/components/icon";
import OptionsMenu from "@/app/components/option-menu";
import { ProductOnShowcase } from "@/app/components/templates/productTemplates";
import ReactSlickSlider from "@/app/components/wrapper/react-slick";
import { mySubstring } from "@/app/utils/format";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import useSWR from "swr";
import { reshapePrice } from "../store/dashboard/marketing/components";
import { CircleLoader } from "@/app/components/cards/loader";

const SearchPage = ({ search, setSearch }) => {
  const {
    data: prods,
    isLoading,
    error,
  } = useSWR(`/products?limit=50&search=${search}`);
  const products = prods ? prods.data : null;

  const [filterBy, editFilter] = useState({
    category: "",
    price: "",
    review: "",
    location: "",
    size: "",
    discount: "",
    shipping_method: "",
  });

  console.log(filterBy);

  const generatePriceRange = (lowest = 0, highest = 0) => {
    console.log(lowest, highest);
    let step;
    switch (true) {
      case highest <= 1000:
        step = 100;
        break;
      case highest <= 5000:
        step = 500;
        break;
      case highest <= 10000:
        step = 1500;
        break;
      case highest <= 30000:
        step = 5000;
        break;
      case highest <= 50000:
        step = 8000;
      case highest >= 50001:
        step = 10000;
        break;
      default:
        step = 100;
        break;
    }

    const range = [];
    let curr = 0;
    for (let price = lowest; price <= highest; price += step) {
      if (curr !== 0)
        range.push(
          `${reshapePrice(curr)} to ${reshapePrice(
            price + step > highest ? highest : price
          )}`
        );
      curr = price;
    }
    return range;
  };

  const FilterOptions = ({ name, options }) => {
    const filterName = name.replace(" ", "_").toLowerCase();
    const handleFilterChange = (option) => {
      editFilter((prev) => {
        return { ...prev, [filterName]: option };
      });
    };
    return (
      <OptionsMenu
        icon={
          <Box className="!text-xs !rounded-full !text-black bg-white px-4 m-1 py-1 flex items-center">
            <Typography variant="caption" className="">
              {mySubstring(filterBy[filterName] || name, 15)}
            </Typography>
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
  const sliders = [
    "flyer2",
    "search-rec",
    "default-map",
    "who-is-waiting",
    "shadow1",
    "shadow1",
  ];

  return (
    <Box>
      <Box className="relative">
        <ReactSlickSlider config={2}>
          {sliders.map((img, i) => (
            <Image
              key={i}
              src={`/images/misc/${img}.png`}
              alt="bg"
              width={1200}
              height={300}
              className="!w-full !min-w-full h-24 md:h-44"
            />
          ))}
        </ReactSlickSlider>
        <Box className="absolute -bottom-6 left-0 w-full flex justify-center z-50">
          <Box className="w-2/5 min-w-[370px] relative !overflow-hidden shadow-md rounded-full">
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
      {isLoading ? (
        <Box className="w-full h-40 flex items-center justify-center">
          <CircleLoader width={40} />
        </Box>
      ) : (
        <>
          <Box className="relative mt-10 w-full flex flex-wrap justify-center items-center px-3">
            <Typography
              variant="body2"
              className="!text-black !text-[12px] !mr-4"
            >
              Filter:
            </Typography>
            <FilterOptions
              name="Category"
              options={products?.category || []}
            />
            <FilterOptions
              name="Price"
              options={generatePriceRange(
                products?.minPrice,
                products?.maxPrice
              )}
            />
            <FilterOptions
              name="Review"
              options={["Men", "women", "children"]}
            />
            <FilterOptions
              name="Location"
              options={["Men", "women", "children"]}
            />
            <FilterOptions name="Size" options={["Men", "women", "children"]} />
            {products?.discount[0].length ? (
              <FilterOptions
                name="Discount"
                options={["Men", "women", "children"]}
              />
            ) : null}
            <FilterOptions
              name="Shipping Method"
              options={["Pickup", "Waybilling", "children"]}
            />
            <Box
              onClick={() =>
                editFilter({
                  category: "",
                  price: "",
                  review: "",
                  location: "",
                  size: "",
                  discount: "",
                  shipping_method: "",
                })
              }
            >
              <Typography
                variant="body2"
                className="!text-black !text-[12px] !ml-4 !m-2 !h-6"
              >
                Reset filter
              </Typography>
            </Box>
          </Box>

          <Box className="px-2 md:px-8">
            <Box className="!mt-6 flex flex-wrap justify-center">
              {products &&
                products?.result?.map((prod, i) => (
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
        </>
      )}
    </Box>
  );
};

export default SearchPage;
