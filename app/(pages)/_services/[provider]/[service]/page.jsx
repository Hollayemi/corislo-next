'use client'
// import UserWrapper from '@/app/components/view/user'
import { Box, Button, Divider, Tab, Typography } from '@mui/material'
import Image from 'next/image'
import useSWR from 'swr'
import { LongServiceListing, ServiceListing2 } from '../../components'
import { useState } from 'react'
import ReactSlickSlider from '@/app/components/wrapper/react-slick'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import IconifyIcon from '@/app/components/icon'
import { htmlToText } from 'html-to-text'
import { intervals, mySubstring } from '@/app/utils/format'
import { formatName } from '@/app/utils/get-initials'
import { Promoted, Recommend } from '@/app/components/cards/recommendations'
import { IconImage } from '@/app/components/view/home/header'
import { reshapePrice } from '@/app/(pages)/dashboard/store/marketing/components'
import { saveService } from '@/app/redux/state/slices/spb'
import { useDispatch } from 'react-redux'
import { useUserData } from '@/app/hooks/useData'
import { BasicModal } from '@/app/components/cards/popup'
import Share from '@/app/components/cards/share'

const ServiceDisplay = ({ params, searchParams }) => {
  const dispatch = useDispatch('')
  const { savedServices } = useUserData()
  const { provider: prov, service } = params
  const { data } = useSWR(`/services?provider=${params.provider}`)
  const services = data?.data || []
  const [search, setSearch] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const [allHours, seeAllHours] = useState(false)
  const currentDay = daysOfWeek[new Date().getDay()]
  console.log(services)

  const theService =
    services?.filter(
      (x) => `${x._id.substring(0, 8)}_${x._id.substring(16)}` === service
    )[0] || {}

  const otherServices =
    services?.filter(
      (x) => `${x._id.substring(0, 8)}_${x._id.substring(16)}` !== service
    ) || []
  const provider = theService.provider || {}
  const category = theService.category || {}
  const homeService =
    provider.service_delivery_type === 'Both' || 'Visiting client'
  const officeService =
    provider.service_delivery_type === 'Both' || 'Client visiting'
  const savePayload = {
    serviceId: theService._id,
    provider: prov,
    branch: theService.branch,
  }
  const share = `Discover ${theService.service_name} on Corisio! Easily schedule and access products and services near you. Join Corisio today and start exploring what's available in your area!
`

  const saved = savedServices.includes(theService?._id)
  return (
    <Box
      bg="white"
      popup={
        <BasicModal
          openModal={openModal}
          toggleModal={() => setOpenModal(false)}
          content={
            <Share
              searchParams={searchParams}
              message={share}
              close={() => setOpenModal(false)}
            />
          }
        />
      }
    >
      <Box className="!px-2 md:!px-10">
        <Box className="flex flex-col md:flex-row justify-start">
          <Box className="w-full shrink md:w-7/12 lg:w-4/6 md:pr-8">
            <Box className="bg-white  p-2 overflow-hidden">
              <ReactSlickSlider config={3}>
                {theService?.images?.map((each, i) => (
                  <Image
                    key={i}
                    src={each}
                    alt="gal"
                    width={900}
                    height={900}
                    className="h-[300px] !rounded-xl md:!h-[400px] w-full object-scale-down"
                  />
                ))}
              </ReactSlickSlider>
              <Box className="flex items-center mt-3">
                {provider.mobile_service?.issset && (
                  <IconChip icon="tabler:car" text="Mobile Service" />
                )}
                {homeService && (
                  <IconChip icon="tabler:home" text="Home Service" />
                )}
                {officeService && (
                  <IconChip icon="tabler:tools" text="Workshop Service" />
                )}
              </Box>

              <Box className="mt-2">
                <Box className="flex justify-between items-start">
                  <Typography
                    variant="body2"
                    className="!font-bold font-sans !text-[20px] md:!text-2xl  !text-slate-900 !text-pretty !w-full"
                  >
                    {theService.service_name}
                  </Typography>
                  <Box className="flex items-center">
                    <IconifyIcon
                      onClick={() => saveService(savePayload, dispatch)}
                      icon={`tabler:${saved ? 'heart-filled' : 'heart'}`}
                      className={` ${saved && '!text-red-500'
                        } hover:text-red-500 !text-[30px] mr-2 cursor-pointer`}
                    />
                    <IconifyIcon
                      icon="tabler:share-2"
                      onClick={() => setOpenModal(true)}
                      className="!text-[30px]"
                    />
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  className="text-white !mt-2 !mb-4 !shadow-none !rounded-md !text-md"
                  startIcon={<IconifyIcon icon="tabler:calendar" />}
                >
                  Book Service
                </Button>
                <Typography
                  variant="body2"
                  className="!text-gray-500 !text-[12px] !leading-6 !mb-1.5"
                >
                  {provider.address}
                </Typography>

                <Recommend />
                <Box className="flex items-center">
                  <Promoted />
                  <Typography
                    variant="body2"
                    className="!text-gray-500 !text-[12px] !leading-6 "
                  >
                    Entrepreneur
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="w-full md:w-5/12 lg:w-2/6 flex-shrink-0 !min-w-[250px] bg-white rounded-md ">
            <Box className=" shadow-md p-3 rounded-xl border">
              <Box className="flex items-center">
                <IconifyIcon
                  icon="tabler:shopping-bag"
                  className="text-2xl !text-black mr-5"
                />
                <Typography
                  variant="body2"
                  className="!text-[16px] !font-bold !text-black !mt-2"
                >
                  Want to get {category.label?.toLowerCase()}'s materials?
                </Typography>
              </Box>
              <Typography variant="caption">
                You can also shop with us to find the products you need.
              </Typography>
              <br />
              <Button
                variant="outlined"
                className="!border !border-gray-400 !text-[12px] !rounded-md !mt-4 !w-40 !h-8 !text-gray-600"
              >
                Shop Now
              </Button>
            </Box>

            <Box className=" mt-5">
              <Box className="h-44 w-full relative">
                <Image
                  src="/images/misc/order-timeline.png"
                  alt="default-map"
                  width={600}
                  height={600}
                  className="absolute top-0 left-0 w-full h-full"
                />
                <Box className="absolute bg-black opacity-70 top-0 left-0 w-full h-full"></Box>
                <Box className="flex flex-col items-center relative justify-center z-50 h-full !px-3">
                  <IconifyIcon
                    icon="tabler:map-pin"
                    className="!text-5xl !font-black text-white"
                  />
                  <Box className="w-5/6 h-[66px] relative bg-white shadow-lg rounded-xl mt-4 flex items-center p-2">
                    <Image
                      src={provider.profile_image}
                      alt="default-map"
                      width={600}
                      height={600}
                      className="w-12 h-12 rounded-full"
                    />
                    <Box className="w-3/5 ml-3">
                      <Typography
                        variant="body2"
                        noWrap
                        className="!text-gray-800 !font-bold !text-[12px] md:!text-[15px]"
                      >
                        {provider.businessName}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="!text-gray-500 !text-[11px]"
                      >
                        {provider.address}, ({provider.city})
                      </Typography>
                    </Box>
                    <Box className="border-l absolute cursor-pointer w-12 h-full top-0 right-0 flex items-center justify-center">
                      <IconifyIcon
                        icon="tabler:location"
                        className="!text-2xl !text-gray-600 "
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className="p-4 bg-[#f8f8f8]">
                <Typography
                  variant="body2"
                  noWrap
                  className="!text-gray-900 !font-bold !text-[17px] mt-4"
                >
                  {provider.businessName}
                </Typography>
                <Typography
                  variant="body2"
                  noWrap
                  className="!text-gray-800 !font-bold !text-[13px] !mt-5"
                >
                  ABOUT US
                </Typography>
                <Typography
                  variant="body2"
                  className="!text-gray-500 !text-[11px] !leading-6 !mt-2"
                >
                  {htmlToText(theService.description)}
                </Typography>

                <Typography
                  variant="body2"
                  noWrap
                  className="!text-gray-800 !font-bold !text-[13px] !mt-8 !mb-2"
                >
                  CONTACT AND BUSINESS HOURS
                </Typography>
                <Divider className="!mb-4" />

                {provider.phone && (
                  <ContactButton
                    icon="tabler:device-mobile"
                    name={provider.phone}
                    btnText="Call"
                    link={`tel:${provider.phone}`}
                  />
                )}
                {provider.email && (
                  <ContactButton
                    icon="tabler:mail"
                    name={provider.email}
                    btnText="Mail"
                    link={`mail:${provider.email}`}
                  />
                )}
                <Box className="mb-8">
                  <Divider className="!mb-4 !bg-gray-50" />
                  {...Object.entries(provider.opening_hours || {}).map(
                    ([day, info], i) =>
                      allHours ? (
                        <Box
                          className={`flex items-center justify-between ${currentDay.toLowerCase() === day
                            ? '!text-black'
                            : '!text-gray-500'
                            }`}
                          key={i}
                        >
                          <Typography
                            variant="body2"
                            className="!text-inherit !text-[14px] !leading-6 !ml-3"
                          >
                            {formatName(day)}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="!text-inherit !text-[14px] !leading-6 !ml-3"
                          >
                            {info.isset
                              ? `${info.from} - ${info.to}`
                              : ' Not open'}
                          </Typography>
                        </Box>
                      ) : (
                        currentDay?.toLowerCase() === day && (
                          <>
                            <Box
                              className="flex items-center justify-between"
                              key={i}
                            >
                              <Typography
                                variant="body2"
                                className="!text-gray-500 !text-[14px] !leading-6 !ml-3"
                              >
                                Today
                              </Typography>
                              <Typography
                                variant="body2"
                                className="!text-gray-500 !text-[14px] !leading-6 !ml-3"
                              >
                                {info.isset
                                  ? `${info.from} - ${info.to}`
                                  : ' Not open'}
                              </Typography>
                            </Box>
                            <Button
                              onClick={() => seeAllHours(!allHours)}
                              className="!text-blue-500 !text-[14px] h-8 float-right  !ml-3"
                            >
                              See all
                            </Button>
                          </>
                        )
                      )
                  )}
                </Box>
                <Typography
                  variant="body2"
                  noWrap
                  className="!text-gray-800 !font-bold !text-[13px] !mt-6 !mb-2"
                >
                  SOCIAL MEDIA
                </Typography>
                <Divider className="!mb-4" />
                {...Object.entries(provider.social_media || {}).map(
                  ([platform, link]) =>
                    link && (
                      <a
                        key={platform}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </a>
                    )
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="mt-5">
          <Box className="flex !justify-start itms-center">
            <Typography
              variant="body2"
              className="!font-bold font-sans !text-[14px] md:!text-xl  !text-slate-900 !text-pretty !w-full"
            >
              Other Services
            </Typography>
            <Box className="relative md:mr-4 w-full md:w-80 !px-2 md:!px-0">
              <input
                type="text"
                placeholder="Our Services"
                value={search}
                className="w-full pr-8 md:pr-12 text-[13px] pl-3 md:pl-5 h-9 md:h-8 border border-black rounded-full transition-all outline-none"
                onChange={(e) => setSearch(e.target.value)}
              />
              <IconImage
                image="search"
                className="w-4 absolute top-0 mt-2 right-2 mr-3 cursor-pointer"
              />
            </Box>
          </Box>
        </Box>
        <Box className="mt-12">
          <ReactSlickSlider>
            {otherServices.map((each, i) => (
              <ServiceListing2
                others={each}
                fixedSize
                key={i}
                icon={each.images[0]}
                provider={each.provider.store}
              />
            ))}
          </ReactSlickSlider>
        </Box>
      </Box>
    </Box>
  )
}

export default ServiceDisplay

const ContactButton = ({ icon, name, btnText, link }) => (
  <Box className="flex items-center justify-between mb-2">
    <Box className="flex items-center">
      <IconifyIcon icon={icon} />
      <Typography
        variant="body2"
        className="!text-gray-500 !text-[14px] !leading-6 !ml-3"
      >
        {name}
      </Typography>
    </Box>
    <a href={link}>
      <Button
        variant="outlined"
        className="!h-9 !bg-white !border !border-gray-300 !text-sm !shadow-none !text-gray-600"
      >
        {btnText}
      </Button>
    </a>
  </Box>
)

const IconChip = ({ icon, text }) => (
  <Box className="bg-gray-50 flex items-center  w-fit shrink-0 rounded-full !px-2 md:!px-3 py-1 mr-1 md:mr-2 flex-wrap">
    <IconifyIcon icon={icon} className="text-[16px]" />
    <Typography
      variant="body2"
      className="!text-gray-500 !text-[12px] !leading-6 !ml-2"
    >
      {text}
    </Typography>
  </Box>
)

//

// https://booksy.com/en-us/dl/show-business/1181963?utm_medium=c2c_referral
