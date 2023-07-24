import { Typography } from "@mui/material"
import StoreLeftSideBar from "@/app/components/store/LeftSideBar";

const StoreLists = ({ params }) => {
  const path={...params, sidebar: "store"}
  return (
      <StoreLeftSideBar path={path} subListBar={true}>
        <Typography color="primary" className="">
          m;km;k
        </Typography>
    </StoreLeftSideBar>
  )
}

export default StoreLists