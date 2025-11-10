import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import IconifyIcon from '../icon'
import themeConfig from '@/app/configs/themeConfig'

export const WatchVideo = ({ close }) => {
  const info = {
    icon: '/images/misc/shop/6.png',
    name: 'Mamafeeds International',
    city: 'Benin City',
  }

  const images = [1, 2, 3, 4, 5]

  const StatusMedia = ({ image }) => (
    <Box className="w-full h-auto !px-2 mt-4 flex items-center justify-center">
      <Image
        src={image}
        alt="ser"
        className="w-full h-full rounded-xl"
        width={1000}
        height={1000}
      />
    </Box>
  )
  return (
    <Box className="flex items-center justify-center w-full h-full !px-4">
      <Box className="w-full max-w-[400px] h-[560px] mt-10 rounded-xl overflow-hidden shadow-xl relative">
        <Box className="bg-slate-900 h-full w-full opacity-90"></Box>
        <Box className="absolute left-0 top-0 w-full h-[100%] !px-3 pt-2">
          <Box className="flex items-center justify-between">
            <Box className="flex items-center p-2">
              <Image
                src={themeConfig.mainWhite}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white p-1"
                width={300}
                height={300}
                alt="name"
              />
              <Box className="!ml-2 w-fit min-w-24 md:min-w-32">
                <Typography
                  variant="body2"
                  noWrap
                  className="!text-gray-200 !font-bold !text-[12px] md:!text-[15px]"
                >
                  Corisio
                </Typography>
                <Typography
                  variant="body2"
                  noWrap
                  className="!text-gray-300 !text-[11px]"
                >
                  {info.city}
                </Typography>
              </Box>
            </Box>

            <Box
              className="w-6 h-6 cursor-pointer hover:bg-slate-700 flex items-center justify-center !rounded-full mr-3"
              onClick={close}
            >
              <IconifyIcon
                icon="tabler:x"
                className="!text-[19px] text-white"
              />
            </Box>
          </Box>
          <Box className="h-full flex items-center justify-center max-h-[350px]">
            <video className=" w-full  relative rounded-md" controls autoPlay>
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              <div
                onClick={() => { }}
                className="text-[6px] flex items-center z-50 justify-center text-white absolute -mt-2 -mr-2 top-0 right-0 w-4 h-4 rounded-full bg-red-500"
              >
                <IconifyIcon icon="tabler:trash" fontSize={16} />
              </div>
            </video>
          </Box>
          <Typography
            variant="body2"
            className="!text-white !text-[11px] absolute bottom-6 z-50 h-12 !mt-6 !px-6"
          ></Typography>
        </Box>
      </Box>
    </Box>
  )
}
