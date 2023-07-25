"use client"
import { Typography } from "@mui/material"
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";

const DashboardOverview = ({ params }) => {
  return (
    <StoreLeftSideBar path={params}>
      <Typography color="primary" className="pt-4">
        m;km;k
      </Typography>
    </StoreLeftSideBar>
  )
}

export default DashboardOverview