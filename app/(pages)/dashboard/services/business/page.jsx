/* eslint-disable @next/next/no-img-element */
'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Typography, Box, Grid, Paper, TextField, Button } from '@mui/material'
import Link from 'next/link'

import {
  InputBoxWithSideLabel,
  FileUploader,
  OpeningHours,
  SocialMediaConponent,
  BreadcrumbRightEle,
} from '../../store/stores/component'
import Icon from '@/app/components/icon'
import { storeBottomBar } from '@/app/data/store/innerList'
import { useStoreData } from '@/app/hooks/useData'
import { useDispatch } from 'react-redux'
import useSWR from 'swr'
import { updateStoreProfile } from '@/app/redux/state/slices/shop/settings/editShop'
import ProfilePictureUploader from '@/app/components/cards/fileUpload'
import { updateBranchImages } from '@/app/redux/state/slices/shop/branches'
// import ServiceRenderWrapper from '@/app/components/view/services/header'
const ServiceRenderWrapper = dynamic(
  () => import('@/app/components/view/services/header'),
  {
    ssr: false,
  }
)
import Image from 'next/image'
import { WorkshopBreadCrumb } from '../components'

const StorePage = ({ params }) => {
  const { storeInfo: originalInfo } = useStoreData()
  const dispatch = useDispatch()
  const {
    data: storeInfo,
    error: storeErr,
    isLoading: storeIsLoading,
  } = useSWR(
    `/store?branch=${params?.sublist || originalInfo?.profile?.branch}`
  )
  const branchOwner =
    originalInfo?.profile?.branch === storeInfo?.profile?.branch
  const { data } = useSWR('/branch/all?sidelist=true')
  const InnerList = data?.data ? data.data : []

  const [openHours, setOpenHours] = useState({})
  const [socialMedia, setSocialMedia] = useState({})
  const [files, setFiles] = useState([])
  const [localFiles, setLocalFiles] = useState([])

  const [profile, setProfile] = useState([])
  const [localProfile, setLocalProfile] = useState('')
  const path = { ...params, sidebar: '/business' }

  const [inputValues, setValues] = useState({
    address: '',
    city: '',
    landmark: '',
    about_store: '',
  })
  useEffect(() => {
    setValues({
      address: storeInfo?.profile?.address || '',
      city: storeInfo?.profile?.city || '',
      landmark: storeInfo?.profile?.landmark || '',
      about_store: storeInfo?.profile?.about_store || '',
    })
    setSocialMedia(storeInfo?.profile?.social_media || {})
    setOpenHours(storeInfo?.profile?.opening_hours || {})
  }, [storeIsLoading])

  const handleChange = (prop) => (event) => {
    setValues({ ...inputValues, [prop]: event.target.value })
    
  }
  return (
    <ServiceRenderWrapper
      path={path}
      BottomList={storeBottomBar}
      hidebreadCrumb
      crumb={[...WorkshopBreadCrumb]}
    >
      <Box className="px-10 !hidden sm:!flex z-50">
        <Typography className="pb-1 border-b-2 cursor-pointer !text-[13px] !w-24 text-center border-blue-900">
          Business Profile
        </Typography>
        <Link href="business/preference">
          <Typography className="pb-1 border-b-2 cursor-pointer !text-[13px] !w-32 !ml-6 text-center border-transparent">
            Business Preference
          </Typography>
        </Link>
      </Box>
      <Box className="w-full bg-white !rounded-md !px-4 md:!p-8 relative">
        <Grid container spacing={2}>
          <Grid item sm={12} md={7} className="md:!pr-16">
            <Box>
              <Box className="flex items-center justify-between">
                <Typography className="font-bold !text-gray-800 text-sm">
                  Business Profile
                </Typography>
              </Box>
              <Typography variant="caption" className="!mt-1">
                Edit contact data that will not be visible on business’s profile
              </Typography>
            </Box>

            <Box className="mt-8 relative">
              <ProfilePictureUploader
                setFiles={setProfile}
                setLocalFiles={setLocalProfile}
                component={
                  <Paper
                    elevation={0}
                    className="border border-dashed w relative rounded-md p-1 w-28 h-28 flex items-center justify-center"
                  >
                    {localProfile ? (
                      <img
                        src={URL.createObjectURL(localProfile[0])}
                        alt="Profile"
                        width={600}
                        height={600}
                        className="!rounded-full border w-24 h-24 flex-shrink-0"
                      />
                    ) : (
                      <Image
                        src={
                          storeInfo?.profile?.profile_image ||
                          '/images/misc/no-profile.png'
                        }
                        alt="Profile"
                        width={600}
                        height={600}
                        className="!rounded-full border w-24 h-24 flex-shrink-0"
                      />
                    )}

                    <Box
                      className="absolute !bottom-2 !right-4 !rounded-full p-0.5 cursor-pointer text-xs"
                      bgcolor="custom.bodyLight"
                    >
                      <Icon icon="tabler:camera" className="text-[15px]" />
                    </Box>
                  </Paper>
                }
              />
              <Typography className="!text-[12px] !text-gray-400 !mt-2">
                JPG, GIF or PNG, Max size of 500kb
              </Typography>
              {branchOwner && (
                <Box className="flex item-center mt-4">
                  <Box
                    onClick={() =>
                      updateBranchImages(
                        {
                          image: profile[0],
                          type: 'profile_image',
                          state: 'add',
                        },
                        dispatch
                      )
                    }
                    className="px-4 py-1.5 border !rounded-full !shadow-none cursor-pointer mr-3"
                  >
                    Change Photo
                  </Box>
                  <Paper className="px-4 py-1.5 border !rounded-full !shadow-none cursor-pointer mr-3">
                    Delete
                  </Paper>
                </Box>
              )}
            </Box>
            <Box className="!mt-8 !border-b !pb-3">
              <InputBoxWithSideLabel
                value={storeInfo?.profile?.businessName || ''}
                inputProps={
                  {
                    // disabled: true,
                  }
                }
                onChange={() => {}}
                label="Your Business Name"
              />
            </Box>

            <Box className="!mt-8 !border-b !pb-6">
              <Typography className="!font-bold !text-gray-800 text-sm">
                Business Address
              </Typography>
              <Typography variant="caption" className="">
                Where is your business situated
              </Typography>
              <br />
              <br />
              <InputBoxWithSideLabel
                value={inputValues.city}
                onChange={handleChange('city')}
                label="City"
              />
              <InputBoxWithSideLabel
                value={inputValues.address}
                onChange={handleChange('address')}
                label="Address"
              />
              <InputBoxWithSideLabel
                value={inputValues.landmark}
                onChange={handleChange('landmark')}
                label="Closest Bus Stop or Landmark"
              />
            </Box>

            <Box className="!mt-8 !pb-6">
              <Typography className="!font-bold !text-gray-800 text-sm">
                About the business
              </Typography>
              <Typography variant="caption" className="">
                Write a little bit about your business
              </Typography>
              <br />
              <br />
              <TextField
                sx={{ mb: 0.5 }}
                fullWidth
                multiline
                value={inputValues.about_store}
                onChange={handleChange('about_store')}
                // defaultValue="About Store: Welcome to Sport Zone, your ultimate destination for all things sports and fitness. We are dedicated to providing athletes and fitness enthusiasts with top-notch sports equipment, apparel, and accessories to help you excel in your game and achieve your fitness goals. At Sport Zone, we understand the importance of having the right gear to enhance your performance. Our extensive collection features top brands and high-quality products that cater to a wide range of sports, including basketball, soccer, tennis, running, and more. Whether you're a professional athlete, a weekend warrior, or a fitness enthusiast, we have everything you need to unleash your full potential."
                id="textarea-outlined"
                maxRows={12}
                minRows={10}
              />
            </Box>

            <Box className="!mt-8 !border-b !pb-6">
              <Typography className="!font-bold !text-gray-800 text-sm">
                Business Gallery
              </Typography>
              <Typography variant="caption" className="">
                Your first picture will be automatically set as the main photo.
              </Typography>
              <br />
              <br />

              <Grid container spacing={2}>
                {storeInfo?.profile?.gallery?.map((gal, i) => (
                  <Grid item xs={6} md={4} key={i}>
                    <Box className="p-1 md:p-1.5 border rounded-md bg-gray-50">
                      <Box className="w-full h-full flex items-center rounded-md  justify-center overflow-hidden ">
                        <img
                          className="w-auto h-auto max-h-28 max-w-40 rounded-md"
                          alt={`image ${i}`}
                          src={gal}
                          width={600}
                          height={600}
                        />
                      </Box>
                    </Box>
                  </Grid>
                ))}
                {branchOwner && (
                  <FileUploader
                    files={files}
                    setFiles={setFiles}
                    localFiles={localFiles}
                    setLocalFiles={setLocalFiles}
                    directUpload
                  />
                )}
              </Grid>
            </Box>

            <Box className="!mt-8 !border-b !pb-6">
              <Typography className="!font-bold !text-gray-800 text-sm">
                Social Media Integration
              </Typography>
              <Typography variant="caption" className="">
                Get to connect your business with your social media accounts
              </Typography>
              <br />
              <br />
              <SocialMediaConponent
                socialMedia={socialMedia}
                setSocialMedia={setSocialMedia}
                label="Facebook"
              />
              <SocialMediaConponent
                socialMedia={socialMedia}
                setSocialMedia={setSocialMedia}
                label="Instagram"
              />
              <SocialMediaConponent
                socialMedia={socialMedia}
                setSocialMedia={setSocialMedia}
                label="Twitter"
              />
              <SocialMediaConponent
                socialMedia={socialMedia}
                setSocialMedia={setSocialMedia}
                label="Tik Tok"
              />
            </Box>

            <Box className="!mt-8 !pb-6">
              <Typography className="!font-bold !text-gray-800 text-sm">
                Opening Hours
              </Typography>

              <br />
              <br />
              <OpeningHours
                label="Monday"
                openHours={openHours}
                setOpenHours={setOpenHours}
              />
              <OpeningHours
                label="Tuesday"
                openHours={openHours}
                setOpenHours={setOpenHours}
              />
              <OpeningHours
                label="Wednesday"
                openHours={openHours}
                setOpenHours={setOpenHours}
              />
              <OpeningHours
                label="Thursday"
                openHours={openHours}
                setOpenHours={setOpenHours}
              />
              <OpeningHours
                label="Friday"
                openHours={openHours}
                setOpenHours={setOpenHours}
              />
              <OpeningHours
                label="Saturday"
                openHours={openHours}
                setOpenHours={setOpenHours}
              />
              <OpeningHours
                label="Sunday"
                openHours={openHours}
                setOpenHours={setOpenHours}
              />
            </Box>

            {branchOwner && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="!py-2 !bg-blue-900"
                startIcon={<Icon icon="tabler:device-floppy" />}
                onClick={() =>
                  updateStoreProfile(dispatch, {
                    ...inputValues,
                    social_media: socialMedia,
                    opening_hours: openHours,
                  })
                }
              >
                Save
              </Button>
            )}
          </Grid>
          <Grid item sm={12} md={5} className="!relative !pl-5">
            {/* <Box className="h-[500px] bg-gray-50 !sticky top-0 md:mt-32">
              <MapGraph
                markers={[
                  {
                    lat: 7.1762595,
                    lng: 4.7260668,
                    info: "Coristen",
                    branchId: "65ac80101cc3db0407fa00c9",
                  },
                ]}
              />
              <h3 className="text-center py-10 hidden"> Map here</h3>
            </Box> */}
          </Grid>
        </Grid>
      </Box>
    </ServiceRenderWrapper>
  )
}

export default StorePage
