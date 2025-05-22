/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useState } from 'react'
import { Typography, Box, Grid, Paper, TextField, Button } from '@mui/material'
import Link from 'next/link'
import dynamic from 'next/dynamic'
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
)

import {
  InputBoxWithSideLabel,
  FileUploader,
  OpeningHours,
  SocialMediaConponent,
  StoreBreadCrumb,
  BreadcrumbRightEle,
} from './component'
import Icon from '@/app/components/icon'
import { storeBottomBar } from '@/app/data/store/innerList'
import { useStoreData } from '@/app/hooks/useData'
import { useDispatch } from 'react-redux'
import useSWR, { mutate } from 'swr'
import { updateStoreProfile } from '@/app/redux/state/slices/shop/settings/editShop'
import ProfilePictureUploader from '@/app/components/cards/fileUpload'
import {
  deletePicture,
  updateBranchImages,
} from '@/app/redux/state/slices/shop/branches'
import { SpinLoader } from '@/app/components/cards/loader'
import IconifyIcon from '@/app/components/icon'

const StorePage = ({ params }) => {
  const { storeInfo: originalInfo } = useStoreData()
  const dispatch = useDispatch()
  const endpoint = `/store?branch=${
    params?.sublist || originalInfo?.profile?.branch
  }`

  const {
    data: storeInfo,
    error: storeErr,
    isLoading: storeIsLoading,
  } = useSWR(endpoint)

  const branchOwner =
    originalInfo?.profile?.branch === storeInfo?.profile?.branch
  const { data } = useSWR('/branch/all?sidelist=true')
  const InnerList = data?.data ? data.data : []

  const [isEdit, allowEdit] = useState(false)
  const [openHours, setOpenHours] = useState({})
  const [socialMedia, setSocialMedia] = useState({})
  const [files, setFiles] = useState([])
  const [localFiles, setLocalFiles] = useState([])

  const [profile, setProfile] = useState([])
  const [uploading, setUploading] = useState('')
  const [localProfile, setLocalProfile] = useState('')
  const path = { ...params, sidebar: 'stores' }

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
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      InnerList={{ title: 'Store List', content: InnerList }}
      BottomList={storeBottomBar}
      breadCrumbRIghtChildren={<BreadcrumbRightEle />}
      crumb={[...StoreBreadCrumb, { text: 'All Stores', link: '' }]}
    >
      <Box className="px-10 !hidden sm:!flex z-50 -mt-6">
        <Typography className="pb-1 border-b-2 cursor-pointer !text-[13px] !w-24 text-center border-blue-900">
          Store Profile
        </Typography>
        <Link href="/dashboard/store/stores/settings">
          <Typography className="pb-1 border-b-2 cursor-pointer !text-[13px] !w-28 !ml-6 text-center border-transparent">
            Store Settings
          </Typography>
        </Link>
      </Box>
      <Box className="w-full bg-white !rounded-md !px-4 !mt-4 !md:px-5 !pb-8 relative">
        <Grid container spacing={2}>
          <Grid item sm={12} md={7} className="md:!pr-16">
            <Box className="flex items-center justify-between">
              <Box>
                <Box className="flex items-center justify-between">
                  <Typography className="font-bold !text-gray-800 text-sm">
                    Store Profile
                  </Typography>
                </Box>
                <Typography variant="caption" className="!mt-1">
                  Store overview and preferences
                </Typography>
              </Box>

              {!isEdit && (
                <Box
                  className="flex items-center"
                  onClick={() => allowEdit(!isEdit)}
                >
                  <IconifyIcon icon="tabler:edit" />
                  <Typography variant="caption" className="!mt-1">
                    Edit
                  </Typography>
                </Box>
              )}
            </Box>

            <Box className="mt-8 relative">
              <ProfilePictureUploader
                setFiles={setProfile}
                setLocalFiles={setLocalProfile}
                directUpload={(base64) =>
                  updateBranchImages(
                    {
                      image: base64,
                      type: 'profile_image',
                      state: 'add',
                    },
                    dispatch,
                    setUploading
                  )
                }
                component={
                  <Paper
                    elevation={0}
                    className={`${
                      isEdit && 'border'
                    } border-dashed w relative rounded-md p-1 w-28 h-28 flex items-center justify-center`}
                  >
                    <Box className="!rounded-full relative border w-24 h-24 flex-shrink-0 overflow-hidden">
                      <img
                        src={
                          localProfile
                            ? URL?.createObjectURL(localProfile[0])
                            : storeInfo?.profile?.profile_image ||
                              '/images/misc/store_placeholder.png'
                        }
                        alt="Profile"
                        height="70"
                        width="70"
                        className="object-fill h-full w-full"
                      />
                      {uploading === 'profile_image' && (
                        <Box className="w-full opacity-55 h-full bg-black absolute flex justify-center items-center top-0 z-20">
                          <SpinLoader />
                        </Box>
                      )}
                    </Box>
                    <Box
                      className="absolute !bottom-2 !right-4 !rounded-full p-1 shadow cursor-pointer z-30 text-xs"
                      bgcolor="custom.bodyLight"
                    >
                      <Icon icon="tabler:camera-plus" className="text-[20px]" />
                    </Box>
                  </Paper>
                }
              />
              <Typography className="!text-[12px] !text-gray-400 !mt-2">
                JPG, GIF or PNG, Max size of 500kb
              </Typography>
              {branchOwner && localProfile && (
                <Box className="flex item-center mt-4">
                  <Box XclassName="px-4 py-1.5 border !rounded-full !shadow-none cursor-pointer mr-3">
                    {`${
                      storeInfo?.profile?.profile_image ? 'Change' : 'Add'
                    } Store Profile Photo`}
                  </Box>
                  {/* <Paper className="px-4 py-1.5 border !rounded-full !shadow-none cursor-pointer mr-3">
                    Delete
                  </Paper> */}
                </Box>
              )}
            </Box>
            <Box className="!mt-8 !border-b !pb-3">
              <InputBoxWithSideLabel
                value={storeInfo?.profile?.store || ''}
                inputProps={{
                  disabled: true,
                  className: '!border-none !border-white',
                }}
                isEdit={isEdit}
                onChange={() => {}}
                label="Your Store Name"
              />
            </Box>

            <Box className="!mt-8 !border-b !pb-6">
              <Typography className="!font-bold !text-gray-800 text-sm">
                Store Address
              </Typography>
              <Typography variant="caption" className="">
                Where is your store situated
              </Typography>
              <br />
              <br />
              <InputBoxWithSideLabel
                value={inputValues.city}
                isEdit={isEdit}
                onChange={handleChange('city')}
                label="City"
              />
              <InputBoxWithSideLabel
                isEdit={isEdit}
                value={inputValues.address}
                onChange={handleChange('address')}
                label="Address"
              />
              <InputBoxWithSideLabel
                value={inputValues.landmark}
                onChange={handleChange('landmark')}
                isEdit={isEdit}
                label="Closest Bus Stop or Landmark"
              />
            </Box>

            <Box className="!mt-8 !pb-6">
              <Typography className="!font-bold !text-gray-800 text-sm">
                About the store
              </Typography>
              <Typography variant="caption" className="">
                Write a little bit about your store
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
                Store Gallery
              </Typography>
              <Typography variant="caption" className="">
                Your first picture will be automatically set as the main photo.
              </Typography>
              <br />
              <br />

              <Grid container spacing={2}>
                {storeInfo?.profile?.gallery?.map((gal, i) => (
                  <Grid item xs={6} md={4} key={i}>
                    <Box className="p-1 md:p-1.5 border rounded-md bg-gray-50 relative">
                      <Box className="w-full h-full flex items-center rounded-md  justify-center overflow-hidden ">
                        <img
                          className="w-auto h-auto max-h-28 max-w-40 rounded-md"
                          alt={`image ${i}`}
                          src={gal}
                        />
                        <Box className="h-5 w-5 absolute top-0 right-0 m-0.5 bg-white rounded-full flex justify-center items-center border border-red-500">
                          <IconifyIcon
                            onClick={() =>
                              deletePicture(gal, dispatch, mutate(endpoint))
                            }
                            icon="tabler:minus"
                            className=" text-red-500"
                          />
                        </Box>
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
                Get to connect your store with your social media
              </Typography>
              <br />
              <br />
              <SocialMediaConponent
                socialMedia={socialMedia}
                setSocialMedia={setSocialMedia}
                label="Facebook"
                isEdit={isEdit}
              />
              <SocialMediaConponent
                socialMedia={socialMedia}
                setSocialMedia={setSocialMedia}
                label="Instagram"
                isEdit={isEdit}
              />
              <SocialMediaConponent
                socialMedia={socialMedia}
                setSocialMedia={setSocialMedia}
                label="Twitter"
                isEdit={isEdit}
              />
              <SocialMediaConponent
                socialMedia={socialMedia}
                setSocialMedia={setSocialMedia}
                label="Tik Tok"
                isEdit={isEdit}
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
                isEdit={isEdit}
              />
              <OpeningHours
                label="Tuesday"
                openHours={openHours}
                setOpenHours={setOpenHours}
                isEdit={isEdit}
              />
              <OpeningHours
                label="Wednesday"
                openHours={openHours}
                setOpenHours={setOpenHours}
                isEdit={isEdit}
              />
              <OpeningHours
                label="Thursday"
                openHours={openHours}
                setOpenHours={setOpenHours}
                isEdit={isEdit}
              />
              <OpeningHours
                label="Friday"
                openHours={openHours}
                setOpenHours={setOpenHours}
                isEdit={isEdit}
              />
              <OpeningHours
                label="Saturday"
                openHours={openHours}
                setOpenHours={setOpenHours}
                isEdit={isEdit}
              />
              <OpeningHours
                label="Sunday"
                openHours={openHours}
                setOpenHours={setOpenHours}
                isEdit={isEdit}
              />
            </Box>

            {branchOwner && isEdit && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="!py-2 !bg-blue-900"
                startIcon={<Icon icon="tabler:device-floppy" />}
                onClick={() =>
                  updateStoreProfile(
                    dispatch,
                    {
                      ...inputValues,
                      social_media: socialMedia,
                      opening_hours: openHours,
                    },
                    () => {
                      allowEdit(false)
                      mutate(endpoint)
                    }
                  )
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
    </StoreLeftSideBar>
  )
}

export default StorePage
