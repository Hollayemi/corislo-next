'use client'
import RadialChart from '@/app/components/chart/Radial'
import { Avatar, AvatarGroup, Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { DashboardCrumb } from '../store/components'
import IconifyIcon from '@/app/components/icon'
import { lightColors } from '@/app/utils/Colors'
import { hexToRGBA } from '@/app/utils/hex-to-rgba'
import { rgbaToHex } from '@/app/utils/rgba-to-hex'

export const DigitWord = () => (
  <Box className="flex items-center ">
    <Box className="w-10 h-7 flex items-center justify-center mr-1 rounded relative overflow-hidden">
      <Box className="w-full h-full absolute top-0 left-0 bg-black opacity-15"></Box>
      <Typography
        variant="body2"
        className="!text-gray-500 !text-[12px] !leading-6"
      >
        30
      </Typography>
    </Box>
    <Typography
      variant="body2"
      className="!text-gray-500 !text-[12px] !leading-6"
    >
      Order
    </Typography>
  </Box>
)

export const DashboardSlider = () => {
  return (
    <Box className=" h-full w-full flex justify-between items-center">
      <Box className=" w-7/12 px-8">
        <Typography
          variant="body2"
          className="!text-gray-800 !text-[16px] !leading-6 mt-3"
        >
          Sir Joe Custumes
        </Typography>
        <Typography
          variant="body2"
          noWrap
          className="!text-gray-500 !text-[12px] !leading-6 mb-3"
        >
          this has gained recongition in above areas
        </Typography>
        <Typography
          variant="body2"
          className="!text-gray-800 !text-[13px] !leading-6 !font-bold !my-2 "
        >
          Brief
        </Typography>
        <Box className="flex items-center justify-between">
          <Box className="flex flex-col justify-between">
            <DigitWord />
            <Box className="h-4"></Box>
            <DigitWord />
          </Box>
          <Box className="flex flex-col justify-between">
            <DigitWord />
            <Box className="h-4"></Box>
            <DigitWord />
          </Box>
        </Box>
      </Box>
      <Image
        src="/images/misc/storeImage.png"
        alt="stre"
        width={500}
        height={500}
        className="w-52 mt-4"
      />
    </Box>
  )
}

export const CardsExplain = ({ explain, stat = 0, icon, title }) => {
  return (
    <Box className="w-1/2 px-1 h-full">
      <Box className="bg-white w-full p-3 rounded-md h-full">
        <Typography
          variant="body2"
          className="!text-gray-800 !text-[15px] !-mb-2"
        >
          {title}
        </Typography>
        <RadialChart height={180} percentage={stat} dash={6} />

        <Box className>
          <Typography variant="body2" className="!text-gray-500 !text-[11px]">
            There are chances to create 5 services more
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export const WorkshopBreadCrumb = [
  ...DashboardCrumb,
  {
    text: 'Business',
    link: 'business',
    icon: 'shop',
  },
]

export const BreadcrumbRightEle = () => {
  const { storeInfo } = useStoreData()
  const router = useRouter()
  return (
    storeInfo.profile?.branchName && (
      <Box className="flex items-center -mr-6 md:mr-0">
        <Button
          variant="contained"
          className="!mr-4 !bg-blue-900 !shadow-none !text-[12px] !rounded-full"
          startIcon={<IconifyIcon icon="tabler:plus" />}
          onClick={() => router.push('/dashboard/service/services/new')}
        >
          <span className="hidden md:block mr-1">Add New </span> Service
        </Button>
      </Box>
    )
  )
}

export const EachService = ({ id = 0 }) => {
  const bgColor = rgbaToHex(hexToRGBA(lightColors[id], 0.2))
  console.log(bgColor)
  const Tag = ({ text }) => (
    <Box className="rounded-full  w-fit m-1 px-3 py-0.5 border border-gray-400">
      <Typography
        variant="body2"
        noWrap
        className="!text-gray-700 !text-[11px]"
      >
        {text}
      </Typography>
    </Box>
  )
  return (
    <Box className="w-60 md:w-1/5 h- p-px mb-2">
      <Box className=" m-1.5 rounded-md h-full p-1 bg-gray-50 border">
        <Box className={`h-44 w-full rounded-md p-2`} sx={{ bgcolor: bgColor }}>
          <Box className="flex items-center justify-between">
            <Box className="w-44">
              <Typography
                variant="body2"
                noWrap
                className="!text-gray-700 !text-[11px]"
              >
                By: Kinna
              </Typography>
              <Typography
                variant="body2"
                className="!text-gray-900 leading-5 !font-bold !text-[12px] md:!text-[18px] !mt-1"
              >
                Sir Joe Costumes
              </Typography>
            </Box>
            <AvatarGroup>
              <Avatar
                className="!rounded-md"
                alt="Remy Sharp"
                src="/images/avatar/1.png"
                sx={{ width: 25, height: 25 }}
              />
              <Avatar
                className="!rounded-md"
                alt="Travis Howard"
                src="/images/avatar/2.png"
                sx={{ width: 25, height: 25 }}
              />
              <Avatar
                className="!rounded-md"
                alt="Agnes Walker"
                src="/images/avatar/4.png"
                sx={{ width: 25, height: 25 }}
              />
            </AvatarGroup>
          </Box>
          <Box className="flex flex-wrap mt-4">
            <Tag text="Custumes" />
            <Tag text="Uniforms" />
            <Tag text="Student Wears" />
            <Tag text="Suits" />
          </Box>
        </Box>
        <Box className="flex justify-between items-center mt-2 px-1.5">
          <Box className="flex items-center w-fit">
            <Box className="flex items-end mr-1.5" title="clicks">
              <IconifyIcon icon="tabler:users" className="!text-[16px] mx-1" />
              <Typography
                variant="body2"
                noWrap
                className="!text-gray-700 !text-[11px]"
              >
                22
              </Typography>
            </Box>
            <Box className="flex items-end mr-1.5" title="favorites">
              <IconifyIcon
                icon="tabler:heart"
                className="!text-[16px] mx-1 text-red-500"
              />
              <Typography
                variant="body2"
                noWrap
                className="!text-gray-700 !text-[11px]"
              >
                12
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={
              <IconifyIcon icon="tabler:edit" className="!text-[16px]" />
            }
            className="!w-16 !h-6 !text-[12px] !rounded-full !bg-black !text-white !shadow-none"
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
