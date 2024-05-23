"use client"
import { Typography } from "@mui/material"
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";

const StoreSettings = ({ params }) => {
  const path={...params, sidebar: "settings"}
  return (
    <StoreLeftSideBar path={path} subListBar={false}>
      <Typography color="primary" className="pt-4">
        m;km;k
      </Typography>
    </StoreLeftSideBar>
  )
}

export default StoreSettings