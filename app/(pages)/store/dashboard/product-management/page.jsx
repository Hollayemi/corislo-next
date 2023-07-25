"use client"
import { Typography, Box, Select, MenuItem } from "@mui/material"
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import ProductList from "@/app/components/view/store/tables/productList";
import OverViewCard from "./overview";
import { prodInnerList } from "@/app/data/store/innerList";
import BreadcrumbEle from "./breadcrumbChild";

const ProductManagement = ({ params }) => {
  const path={...params, sidebar: "product-management"}
  return (
    <StoreLeftSideBar path={path} subListBar={false} InnerList={prodInnerList} breadCrumbChild = {<BreadcrumbEle />}>
      <Box>
        <Box className="bg-white rounded-md px-3 py-6">
          <OverViewCard />
        </Box>
        <Box className="bg-white rounded-md mt-4 px-3 pt-6">
          <Box className="flex justify-between items-center px-">
            <Typography color="text.primary" className="font-bold">All Products (3,627)</Typography>
            <Box className="flex items-center">
              <Typography color="text.primary" className="mr-3">Result per page</Typography>
              <Select
                label='Age'
                defaultValue='30'
                id='demo-simple-select-outlined'
                labelId='demo-simple-select-outlined-label'
                size="small"
              >
                <MenuItem value='10'>10</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>45</MenuItem>
              </Select>
            </Box>
          </Box>
          <ProductList />
        </Box>
      </Box>
    </StoreLeftSideBar>
  )
}

export default ProductManagement