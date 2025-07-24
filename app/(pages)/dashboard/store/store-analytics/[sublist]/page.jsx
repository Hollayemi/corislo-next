import { Typography } from '@mui/material'
import dynamic from 'next/dynamic'
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
)

const StoreAnlysis = ({ params }) => {
  const path = { ...params, sidebar: 'store-analytics' }
  return (
    <StoreLeftSideBar path={path} subListBar={true}>
      <Typography color="primary" className="">
        m;km;k
      </Typography>
    </StoreLeftSideBar>
  )
}

export default StoreAnlysis
