import { Typography } from "@mui/material"
import StoreLeftSideBar from "@/app/components/store/LeftSideBar";

const Subisr = ({ params }) => {
  const path={...params, sidebar: "customer-management"}
  return (
      <StoreLeftSideBar path={path} subListBar={true}>
        <Typography color="primary" className="">
          m;km;k
        </Typography>
    </StoreLeftSideBar>
  )
}

export default Subisr