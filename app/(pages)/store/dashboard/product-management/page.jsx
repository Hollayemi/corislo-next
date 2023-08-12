"use client"
import { Typography, Box, Select, MenuItem } from "@mui/material"
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import ProductList from "@/app/components/view/store/tables/productList";
import OverViewCard from "./overview";
import { prodInnerList } from "@/app/data/store/innerList";
import BreadcrumbEle from "./breadcrumbChild";
import { productListingRows } from "./rows"
const ProductManagement = ({ params }) => {
  const path={...params, sidebar: "product-management"}
  return (
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      InnerList={prodInnerList}
      breadCrumbChild={<BreadcrumbEle />}
    >
      <Box className="w-full">
        <Box className="bg-white rounded-md px-3 py-6">
          <OverViewCard />
        </Box>
        <Box className="bg-white rounded-md mt-4 px-3 pt-6 w-full">
          <Box className="flex justify-between items-center px-">
            <Typography className="text-xs md:text-md font-bold">
              All Products (3,627)
            </Typography>
          </Box>
          <Box className={`relative`}>
            <ProductList rows={productListingRows.data} />
          </Box>
        </Box>
      </Box>
    </StoreLeftSideBar>
  );
}

export default ProductManagement