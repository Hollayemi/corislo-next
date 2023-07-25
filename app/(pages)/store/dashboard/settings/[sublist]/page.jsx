import { Typography } from "@mui/material"
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";

const SettingsList = ({ params }) => {
  const path={...params, sidebar: "settings"}
  return (
      <StoreLeftSideBar path={path} subListBar={true}>
        <Typography color="primary" className="">
          m;km;k
        </Typography>
    </StoreLeftSideBar>
  )
}

export default SettingsList