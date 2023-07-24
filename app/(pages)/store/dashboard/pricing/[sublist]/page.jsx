import { Typography } from "@mui/material"
import StoreLeftSideBar from "@/app/components/store/LeftSideBar";

const PricingList = ({ params }) => {
  const path={...params, sidebar: "pricing"}
  return (
      <StoreLeftSideBar path={path} subListBar={true}>
        <Typography color="primary" className="">
          m;km;k
        </Typography>
    </StoreLeftSideBar>
  )
}

export default PricingList