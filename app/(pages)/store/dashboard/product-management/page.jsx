"use client"
import { Typography } from "@mui/material"
import StoreLeftSideBar from "@/app/components/store/LeftSideBar";

const ProductManagement = ({ params }) => {
  const path={...params, sidebar: "product-management"}
  return (
    <StoreLeftSideBar path={path} subListBar={false}>
      <Typography color="primary" className="pt-4">
        m;km;k
      </Typography>
    </StoreLeftSideBar>
  )
}

export default ProductManagement