"use client"
import { Typography } from "@mui/material"
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";

const StoreAnalysisPage = ({ params }) => {
  const path={...params, sidebar: "store-analytics"}
  return (
    <StoreLeftSideBar path={path} subListBar={false}>
      <Typography color="primary" className="pt-4">
        m;km;k
      </Typography>
    </StoreLeftSideBar>
  )
}

export default StoreAnalysisPage