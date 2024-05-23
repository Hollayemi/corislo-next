/* eslint-disable @next/next/no-img-element */
"use client";
import { Box, Button, Rating, Typography } from "@mui/material";
import IconifyIcon from "../icon";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import { useEffect } from "react";
import { formatCurrency, ngnPrice } from "@/app/utils/format";
import { Map } from "@mui/icons-material";
import { useUserData } from "@/app/hooks/useData";

export const PopularProduct = ({ image, prodName, store, price, small }) => {
  const router = useRouter();
  return (
    <Box className={`${small ? "!w-28 !h-44 m-1 " : "!w-28 !h-44 md:!w-44 md:!h-56 m-0.5 md:m-2 "}`}>
      <Box onClick={() => router.push(`/biz/${store}/${prodName}`)}>
        <img
          src={image}
          alt="product_image"
          className={`!w-full ${small ? "!h-28" : "!h-28 md:!h-44"} rounded-md`}
        />
      </Box>
      <Box className="py-1">
        <Link href={`/biz/${store}/${prodName}`}>
          <Box>
            <Typography
              variant="body2"
              className="!text-[10px] md:!text-[12px] !h-7 md:!h-8 overflow-hidden"
            >
              {prodName}
            </Typography>
          </Box>
        </Link>
        <Box className="flex items-center justify-between">
          <Typography
            variant="body2"
            className="whitespace-nowrap text-ellipsis !font-bold"
          >
            {formatCurrency(price || 6400.54)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export const HotDeal = ({ image, prodName, small, price, store, unit, of }) => {
  const percentage = (unit / of) * 100;
  const router = useRouter();
  return (
    <Box
      className={`${
        small
          ? "!w-28 !h-44 m-1 "
          : "!w-28 !h-44 md:!w-44 md:!h-60 m-0.5 md:m-2 "
      }`}
    >
      <Box onClick={() => router.push(`/biz/${store}/${prodName}`)}>
        <img
          src={image}
          alt="product_image"
          className={`!w-full ${small ? "!h-28" : "!h-28 md:!h-44"} rounded-md`}
        />
      </Box>
      <Box className="pt-1">
        <Link href={`/biz/${store}/${prodName}`}>
          <Box>
            <Typography
              variant="body2"
              className="!whitespace-nowrap !text-[12px] !overflow-hidden !text-ellipsis"
            >
              {prodName}
            </Typography>
          </Box>
        </Link>
        <Box className="flex items-center justify-between">
          <Typography
            variant="body2"
            className="whitespace-nowrap text-ellipsis !font-bold !text-[11px] md:!text-[13px]"
          >
            {formatCurrency(price || 6400.54)}
          </Typography>
        </Box>
        <Box className="w-full !rounded-full h-1.5 bg-gray-300 overflow-hidden">
          <Box
            className={`!w-[45%] h-full !rounded-full`}
            bgcolor="custom.sec"
          ></Box>
        </Box>
        <h5 className="text-[10px]">
          {unit} of {of} Remaining
        </h5>
      </Box>
    </Box>
  );
};

export const ProductOnCategory = ({
  product,
  cartProducts,
  handleLocalCartChange,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { offline } = {};

  return (
    <Box className="m-1  p-3 py-4 rounded-xl md:!w-76 relative bg-white ProductOnCategory">
      <Box className="!flex items-center relative">
        <Link
          href={`/shop/${product?.category?.replaceAll(" ", "-")}/${
            product._id
          }`}
          className="w-5/12 flex-shrink-0"
        >
          <img
            src={product.images && product.images[0].image}
            className="w-full h-full rounded-xl"
            alt={product?.prodName}
          />
        </Link>
        <Link
          href={`/shop/${product?.category?.replaceAll(" ", "-")}/${
            product._id
          }`}
        >
          <Box className="pl-2 cursor-pointer">
            <Typography variant="body2" className="!font-bold">
              {product?.prodName}
            </Typography>
            <Typography variant="h5" className="!mt-1 !text-[11px] !leading-1">
              {product?.prodInfo}
            </Typography>

            <Typography variant="body1" className="!font-extrabold">
              <span className="!font-extrabold text-[10px]">$</span>
              {product?.prodPrice}
            </Typography>
          </Box>
        </Link>

        <Typography
          variant="caption"
          className="!text-[10px] absolute bottom-2 right-2"
        >
          {product.totInStock} units
        </Typography>
      </Box>
      <Box className="ProductOnCategory-CartBtn !transition-all delay-200 !duration-200">
        <Button
          variant="contained"
          className="!mt-5 !rounded-full !text-xs"
          fullWidth
          startIcon={<IconifyIcon icon="tabler:shopping-cart" />}
          onClick={() => {
            // cartHandler({ productId: product?._id }, dispatch, offline);
            handleLocalCartChange(product?._id);
          }}
        >
          {cartProducts?.includes(product._id)
            ? "Remove from Cart"
            : "Add to Cart"}
        </Button>
      </Box>
    </Box>
  );
};

export const ProductOnShowcase = ({
  others,
  image,
  store,
  branch,
  prodName,
  prodPrice,
  star,
}) => {
  const { showMapScreen } = useUserData()
  const router = useRouter();
  const reshapedProdName = prodName.split(" ").join("+").toLowerCase();
  return (
    <Box className="w-4/12 min-w-[100px] relative max-w-[140px] md:max-w-[170px] md:w-44 h-48 md:!h-64 md:mx-2 my-2.5 ">
      {others.discount && <Box className="w-9 h-4 bg-red-600 rounded-full absolute right-2 top-2 shadow flex items-center justify-center">
      <Typography
              variant="body2"
              className="!text-white !text-[11px] cursor-pointer"
              title={others.discountTitle}
            >
        {others.discount}%
        </Typography>
        </Box>}
      <Box
        onClick={() => router.push(`/biz/${store}/${reshapedProdName}`)}
        className="!px-0.5"
      >
        <img
          src={image}
          alt="product_image"
          className="!w-full px-0.5 !h-28 md:!h-48 rounded-md"
        />
      </Box>
      <Box className="pt-1 px-px">
        <Link href={`/biz/${store}/${reshapedProdName}`}>
          <Box>
            <Typography
              variant="body2"
              className="!whitespace-nowrap !text-[12px] !font-bold !overflow-hidden !text-ellipsis"
            >
              {prodName}
            </Typography>
          </Box>
        </Link>

        <Box className="flex items-center justify-between">
          <Typography
            variant="body2"
            className="whitespace-nowrap !text-md text-ellipsis !font-black"
          >
            {ngnPrice(prodPrice)}
          </Typography>
        </Box>

        <Box className="flex flex-col items-start justify-between w-full">
          <Rating
            defaultValue={star || 0}
            className="!text-[13px]"
            name="size-small"
            size="small"
          />
          <Box className="flex justify-between items-center w-full mt-1">
            <Link href={`/biz/${store}-${branch}/`}>
              <Typography
                variant="body2"
                className="whitespace-nowrap text-ellipsis !text-[10px]"
              >
                {store}
              </Typography>
            </Link>
            <Box className="flex items-center cursor-pointer mr-3" onClick={() => showMapScreen()}>
              <IconifyIcon
                icon="tabler:map-pin-filled"
                className="!mr-1 !text-[15px]"
              />
              <Typography
                variant="body2"
                className="whitespace-nowrap text-ellipsis !text-[10px]"
              >
                24cm
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const OfflineProductOnCartView = ({
  product,
  handleLocalCartChange,
  sumCartTotal,
}) => {
  const { offline } = {};
  const dispatch = useDispatch();

  const { data, loading, error } = useSWR(`/products?prodId=${product}`);

  useEffect(() => {
    if (data && data.data[0]) {
      sumCartTotal((prev) => prev + data.data[0].prodPrice || 0);
    }
  }, [data, sumCartTotal]);

  return !loading && !error && data ? (
    <Box className="!flex !w-full md:p-2 m-1 items-center relative">
      <Box
        onClick={() => {
          // cartHandler({ productId: product }, dispatch, offline);
          handleLocalCartChange(product);
          sumCartTotal((prev) => prev - data.data[0].prodPrice);
        }}
        className="absolute -top-2 !mt-3 -right-2 bg-pink-500 w-6 h-6 flex items-center justify-center !rounded-full !shadow-xl"
      >
        <IconifyIcon icon="tabler:minus" className="!text-[13px] !text-white" />
      </Box>
      <img
        src={data.data[0].images[0].image}
        className="w-16 h-16 rounded-xl"
        alt={data.data[0].prodName}
      />
      <Box className="pl-2">
        <Typography
          variant="h5"
          className="!text-[8px] md:!text-[12px] !leading-1"
        >
          {data.data[0].prodName}
        </Typography>

        <Box className="flex items-center justify-between mt-2">
          <Typography
            variant="caption"
            className="!text-[8px] md:!text-[12px] text-pink-500"
          >
            1 units
          </Typography>

          <Typography
            variant="body1"
            className="!font-extrabold !text-[8px] md:!text-[12px]"
          >
            <span className="!font-extrabold !text-[10px] md:!text-[10px]">
              $
            </span>
            {data.data[0].prodPrice}
          </Typography>
        </Box>
      </Box>
    </Box>
  ) : (
    <h4>loading</h4>
  );
};

export const ProductOnOrderView = ({ product }) => {
  return (
    <Box className="flex items-ccnter md:px-4">
      <Box className="!flex !w-full p-2 m-1 flex-grow items-center relative">
        <img
          src={product.image}
          className="w-16 md:w-28 h-16 md:h-28 rounded-xl"
          alt={product.prodName}
        />
        <Box className="pl-6">
          <Typography
            variant="body2"
            className="!text-[15px] md:!text-[17px] !leading-1"
          >
            {product.prodName}
          </Typography>

          <Box className="flex mt-1">
            {product.size.length > 0 && (
              <Box className="flex flex-col items-start">
                <Typography
                  variant="caption"
                  className="!text-[13px] md:!text-[16px]"
                >
                  colors
                </Typography>

                {/* <SpecBox all={product.color} iscolor /> */}
              </Box>
            )}
            {product.size.length > 0 && (
              <Box className="flex flex-col items-start !ml-7">
                <Typography
                  variant="caption"
                  className="!text-[13px] md:!text-[16px]"
                >
                  Sizes
                </Typography>

                {/* <SpecBox all={product.size} /> */}
              </Box>
            )}
          </Box>
          <Box className="flex items-center justify-between mt-1">
            <Typography
              variant="caption"
              className="!text-[13px] md:!text-[17px] text-pink-500"
            >
              {product.totInStack || 5} units
            </Typography>

            <Typography variant="body1" className="!font-extrabold  md:hidden">
              <span className="!font-extrabold text-[10px]">$</span>
              {product.prodPrice}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className=" hidden flex-shrink-0 w-48 md:flex flex-col justify-center items-center">
        <Typography variant="body1" className="!font-extrabold">
          <span className="!font-extrabold text-[10px]">$</span>
          {product.prodPrice}
        </Typography>
        <Typography variant="caption" className="!text-[15px]">
          (vax included)
        </Typography>
      </Box>
    </Box>
  );
};
