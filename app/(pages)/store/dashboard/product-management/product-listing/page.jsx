"use client";
import { useState } from "react";
import { prodInnerList } from "@/app/data/store/innerList";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import { Box } from "@mui/material";

const ProductListing = ({ params }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);

  const path = {
    ...params,
    sidebar: "product-management",
    sublist: "product-listing",
  };

  return (
    <StoreLeftSideBar path={path} subListBar={true} InnerList={prodInnerList}>
      <Box className="bg-white rounded-md px-3 md:px-5 pt-6 pb-8 w-full grow"></Box>
    </StoreLeftSideBar>
  );
};

export default ProductListing;
