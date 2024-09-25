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
import useSWRWithCoordinates from "@/app/hooks/fetchWithCoordinates";
import { MagnifyingGlass } from "react-loader-spinner";
import MyPagination from "@/app/components/templates/pagination";
import { useRouter, useSearchParams } from "next/navigation";

const SearchPage = ({ search, setSearch }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    data: prods,
    isLoading,
    status: prodsStatus,
    isset,
  } = useSWRWithCoordinates(
    `/products?limit=30&search=${search}&p=${searchParams.get("p") || 1}`
  );
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

  const applyFilter = () => {
    const values = Object.values(filterBy);
    const keys = Object.keys(filterBy);
    const currentSearchParams = new URLSearchParams(searchParams);
    values.map((x, i) => {
      console.log(x);
      if (x && x !== "Any") {
        currentSearchParams.set(keys[i], x);
      }
    });

    router.push(`?${currentSearchParams.toString()}`);
  };

  const generatePriceRange = (lowest = 0, highest = 0) => {
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
              {mySubstring(
                filterBy[filterName].toString() || name.toString(),
                15
              )}
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
        <Box className="flex flex-col items-center justify-center my-12 mt-20">
          {isset ? (
            <CircleLoader />
          ) : (
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{}}
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          )}
          <Typography className="!mt-3">{prodsStatus}</Typography>
        </Box>
      ) : (
        <>
          <Box className="relative mt-10 w-full flex flex-wrap justify-center items-center px-3">
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
                className="!text-black !text-[12px] !mr-4"
              >
                Reset Filter:
              </Typography>
            </Box>
            <FilterOptions
              name="Category"
              options={products?.category || [" "]}
            />
            <FilterOptions
              name="Price"
              options={[
                "Any",
                ...generatePriceRange(
                  Math.min(...products?.price),
                  Math.max(...products?.price)
                ),
              ]}
            />
            <FilterOptions
              name="Review"
              options={[
                "Any",
                "1 star",
                "2 star",
                "3 star",
                "4 star",
                "5 star",
              ]}
            />
            <FilterOptions
              name="Location"
              options={[
                "Nearby",
                "Within your street",
                "Within your city",
                "Within your state",
                "Nationwide",
              ]}
            />
            <FilterOptions name="Size" options={["Any"]} />
            {products?.discount.length ? (
              <FilterOptions
                name="Discount"
                options={products?.discount || [""]}
              />
            ) : null}
            <FilterOptions
              name="Shipping Method"
              options={["Pickup", "Waybilling"]}
            />

            <Button
              onClick={() => applyFilter()}
              className="!text-white bg-green-500 !text-[12px] !ml-2 !shadow-none"
            >
              Apply
            </Button>
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
            <Box className="flex justify-center mt-6 md:mt-12">
              <MyPagination
                currentPage={searchParams.get("p") || 1}
                searchParams={searchParams}
                limit={20}
                query="p"
                totalNumber={products?.totalNumber}
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SearchPage;
