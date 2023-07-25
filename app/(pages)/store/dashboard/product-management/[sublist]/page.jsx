"use client";
import { Typography, Box } from "@mui/material"
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import { prodInnerList } from "@/app/data/store/innerList";
import OverViewCard from "../overview";
import CategoryAndTags from "./category-and-tags";

const ProductManagementList = ({ params }) => {
  const path={...params, sidebar: "product-management"}
  return (
    <StoreLeftSideBar path={path} subListBar={true} InnerList={prodInnerList}>
      <Box>
        <Box className="bg-white rounded-md px-3 py-6">
          <OverViewCard />
        </Box>
      </Box>
      <Box className="bg-white rounded-md mt-4 px-3 pt-6">
        <CategoryAndTags />
      </Box>
    </StoreLeftSideBar>
  )
}

export default ProductManagementList