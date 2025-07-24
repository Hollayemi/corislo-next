import { Box, Button, Rating, Typography } from '@mui/material'
import Image from 'next/image'
import ReactSlickSlider from '../../wrapper/react-slick'
import Link from 'next/link'
import themeConfig from '@/app/configs/themeConfig'
import IconifyIcon from '../../icon'

const UserServiceFooter = () => {
  const topLinks = [
    { name: 'Help & Support', link: '#' },
    { name: 'Privacy Policy', link: '#' },
    { name: 'Help & Center', link: '#' },
    { name: 'Language', link: '#' },
  ]
  return (
    <Box>
      <Box className="w-full h-[540px] relative mt-12 bg-[#0F172A] pt-4">
        <Box>
          <Image
            src="/images/misc/ellipse/top1.png"
            alt="top 1"
            width={500}
            height={600}
            className="absolute top-0 -left-2 w-48"
          />
          <Image
            src="/images/misc/ellipse/bt1.png"
            alt="top 1"
            width={500}
            height={600}
            className="absolute bottom-0 right-0 w-36"
          />

          <Image
            src="/images/misc/ellipse/bt1.png"
            alt="top 1"
            width={500}
            height={600}
            className="absolute bottom-0 right-0 w-48"
          />
        </Box>
        <Box className="w-full h-full  justify-center items-center">
          <Box className="flex flex-col justify-center items-center my-12">
            <Typography className="!text-gray-300 !text-[13px] !mb-5">
              25 People have said added their review about us
            </Typography>
            <Typography
              variant="body2"
              className="!text-white !text-[30px]  !font-black"
            >
              What our users has to say about us
            </Typography>
          </Box>
          <Box className="flex justify-center">
            <Box className="w-4/5">
              <ReactSlickSlider>
                <Testimonial />
                <Testimonial />
                <Testimonial />
                <Testimonial />
              </ReactSlickSlider>
            </Box>
          </Box>

          <Typography className="!text-gray-300 !text-[13px] !my-10 underline text-center ">
            Check all 25 reviews
          </Typography>
        </Box>
      </Box>
      <Box className="flex flex-col justify-center px-8 pt-20 !items-center bg-gradient-to-br from-orange-50 to-white">
        <Typography
          variant="body2"
          className="!text-black !text-[35px] !font-black text-center w-3/6"
        >
          Explore top-rated local businesses offering professional services
          tailored to your needs.
        </Typography>

        <Button
          variant="contained"
          className="!h-12 !w-48 !shadow-none !my-10  !text-[12px]"
        >
          Book a Service
        </Button>

        <Box className="flex w-full items-center justify-between pb-8 border-b">
          <Link href="/">
            <Image
              src={themeConfig.vertical1}
              alt="logo"
              width={400}
              height={400}
              className="!w-28 ml-1 md:ml-1 !flex-shrink-0 cursor-pointer"
            />
          </Link>

          <Box className="flex items-center mt-4">
            <IconifyIcon icon="tabler:brand-facebook-filled" className="mx-2" />
            <IconifyIcon icon="tabler:mail-filled" className="mx-2" />
            <IconifyIcon icon="tabler:brand-linkedin-filled" className="mx-2" />
            <IconifyIcon
              icon="tabler:brand-instagram-filled"
              className="mx-2"
            />
          </Box>
        </Box>
        <Box className="flex w-full justify-between py-4">
          <Typography className="!text-gray-400 !text-[13px]">
            © Copyright {new Date().getFullYear()}, All Rights reserved
          </Typography>
          <Box className="flex items-center">
            {topLinks.map((each, i) => (
              <Link href={each.link} key={i} className="mx-1 px-3 h-full">
                <Typography className="!text-gray-400 !text-[13px]">
                  {each.name}
                </Typography>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default UserServiceFooter

const Testimonial = () => {
  return (
    <Box className="w-72 h-56 bg-white m-3 p-3 py-5 rounded-md">
      <Rating
        defaultValue={2.4}
        onChange={(e, t) => {}}
        readOnly
        precision={0.1}
        className="mb-4"
        name="large"
        size="small"
      />
      <Typography className="!text-gray-500 !text-[12px]">
        “I needed my laundry done urgently, and Corisio connected me with a
        local service within minutes. The process was smooth, and I loved how
        easy it was to book. Will definitely use this platform again!”
      </Typography>
      <Box className={`flex items-center mt-4`}>
        <Image
          src={'/images/avatar/1.png'}
          alt={'Oluwasusi Stephen'}
          width={400}
          height={100}
          className={`w-10 h-10 rounded-full`}
        />
        <Box className="!ml-2 w-40">
          <Typography
            noWrap
            variant="body1"
            className="!font-bold !text-[13px] whitespace-nowrap !leading-0 text-ellipsis"
          >
            Oluwasusi Stephen
          </Typography>
          <Typography
            variant="body2"
            className="!leading-0 !text-gray-400 !text-[11px]"
          >
            Okeigbo, Ondo state
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
