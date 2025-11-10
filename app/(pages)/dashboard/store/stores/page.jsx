/* eslint-disable @next/next/no-img-element */
'use client'
import { use, useEffect, useState } from 'react'
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
  CategoryFolder,
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
import { BasicModal } from '@/app/components/cards/popup'
import { EnhancedCategorySelector } from '../../(auth)/register/personal'
import { useGetBranchInfoQuery, useUpdateStoreInfoMutation } from '@/app/redux/business/slices/branchSlice'

const StorePage = ({ params }) => {
  const { sublist, ...other } = use(params)
  const { storeInfo: originalInfo } = useStoreData()
  console.log({ originalInfo })
  const { store, branch } = originalInfo?.profile || {}
  const dispatch = useDispatch()
  const endpoint = `/store?branch=${sublist || branch
    }`
  const [updateStoreInfo, { isLoading }] = useUpdateStoreInfoMutation()
  console.log({ branch, store })

  const {
    data: storeData,
    error: storeErr,
    refetch,
    isLoading: storeIsLoading,
  } = useGetBranchInfoQuery({ branch: branch, store: store }, { skip: !branch })

  const storeInfo = storeData?.data || {}

  console.log({ storeInfo })

  const branchOwner =
    originalInfo?.profile?.branch === storeInfo?.branch
  const { data } = useSWR('/branch/all?sidelist=true')
  const InnerList = data?.data ? data.data : []

  const [isEdit, allowEdit] = useState(false)
  const [openHours, setOpenHours] = useState({})
  const [socialMedia, setSocialMedia] = useState({})
  const [files, setFiles] = useState([])
  const [localFiles, setLocalFiles] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [profile, setProfile] = useState([])
  const [uploading, setUploading] = useState('')
  const [localProfile, setLocalProfile] = useState('');
  const path = { ...other, sidebar: 'stores' }

  const [inputValues, setValues] = useState({
    address: '',
    city: '',
    landmark: '',
    about_store: '',
    phone: "",
    email: "",
  })
  useEffect(() => {
    setValues({
      address: storeInfo?.address || '',
      city: storeInfo?.city || '',
      landmark: storeInfo?.landmark || '',
      about_store: storeInfo?.about_store || '',
      email: storeInfo?.email || "",
    })
    setSocialMedia(storeInfo?.social_media || {})
    setOpenHours(storeInfo?.opening_hours || {})
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
      <Box className={`!px-10 !hidden sm:!flex z-50 -mt-9 `}>
        <Typography className="pb-1 border-b-2 cursor-pointer !text-[13px] !w-24 text-center border-blue-900">
          Store Profile
        </Typography>
        <Link href="/dashboard/store/stores/settings">
          <Typography className="pb-1 border-b-2 cursor-pointer !text-[13px] !w-28 !ml-6 text-center border-transparent">
            Store Settings
          </Typography>
        </Link>
      </Box>
      <Box className="w-full bg-white !rounded-md !px-4 pt-5 !mt-4 !md:!px-10 !pb-8 relative">
        <Box className="grid grid-cols-1 md:grid-cols-4">
          <Box className="col-span-3 md:!pr-16">
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
                  className="flex items-center cursor-pointer"
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
                      type: 'store_image',
                      state: 'add',
                    },
                    dispatch,
                    setUploading
                  )
                }
                component={
                  <Paper
                    elevation={0}
                    className={`${isEdit && 'border'
                      } border-dashed w relative rounded-md p-1 w-28 h-28 flex items-center justify-center`}
                  >
                    <Box className="!rounded-full relative border w-24 h-24 flex-shrink-0 overflow-hidden">
                      <img
                        src={
                          localProfile
                            ? URL?.createObjectURL(localProfile[0])
                            : storeInfo?.profile_image ||
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
                  <Box XclassName="!px-4 py-1.5 border !rounded-full !shadow-none cursor-pointer mr-3">
                    {`${storeInfo?.profile_image ? 'Change' : 'Add'
                      } Store Profile Photo`}
                  </Box>
                  {/* <Paper className="!px-4 py-1.5 border !rounded-full !shadow-none cursor-pointer mr-3">
                    Delete
                  </Paper> */}
                </Box>
              )}
            </Box>
            <Box className="!mt-8 !border-b border-b-gray-300 !pb-3">
              <InputBoxWithSideLabel
                value={storeInfo?.store || ''}
                inputProps={{
                  disabled: true,
                  className: '!border-none !border-white',
                }}
                isEdit={isEdit}
                onChange={() => { }}
                label="Your Store Name"
              />
            </Box>

            <Box className="!mt-8 !border-b border-b-gray-300 !pb-6">
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

            <Box className="!mt-8 !border-b border-b-gray-300 !pb-6">
              <Typography className="!font-bold !text-gray-800 text-sm">
                Store Contact
              </Typography>
              <Typography variant="caption" className="">
                How can customers reach you
              </Typography>
              <br />
              <br />
              <InputBoxWithSideLabel
                value={storeInfo?.phone || ''}
                isEdit={isEdit}
                onChange={handleChange('phone')}
                label="Phone Number"
                inputProps={{
                  className: '!border-none !border-white',
                }}
              />
              <InputBoxWithSideLabel
                value={storeInfo?.email || ''}
                isEdit={isEdit}
                onChange={handleChange('email')}
                label="Email Address"
                inputProps={{
                  className: '!border-none !border-white',
                }}
              />
            </Box>

            <Box className="!mt-8 !pb-6" id="categoories">
              <Typography className="!font-bold !text-gray-800 text-sm">
                Preferred Categories
              </Typography>
              <Typography variant="caption" className="">
                Select the categories that best describe your store
              </Typography>
              <br />
              <br />
              <CategoryFolder />
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setModalOpen(true)}
                disabled={!branchOwner || !isEdit}
                className={`!bg-white !border ${!isEdit
                  ? '!border-gray-400 !text-gray-400'
                  : '!border-blue-400 !text-blue-400 '
                  }!rounded-md !text-[14px] !shadow-none`}
              >
                Adjust Categories
              </Button>
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

            <Box className="!mt-8 !border-b border-b-gray-300 !pb-6">
              <Typography className="!font-bold !text-gray-800 text-sm">
                Store Gallery
              </Typography>
              <Typography variant="caption" className="">
                Your first picture will be automatically set as the main photo.
              </Typography>
              <br />
              <br />

              <Grid container spacing={2}>
                {storeInfo?.gallery?.map((gal, i) => (
                  <Grid item xs={6} md={4} key={i}>
                    <Box className="p-1 md:p-1.5 border rounded-md bg-gray-50 relative">
                      <Box className="w-full h-full flex items-center rounded-md  justify-center overflow-hidden ">
                        <img
                          className="w-auto h-auto max-h-28 max-w-40 rounded-md"
                          alt={`image ${i}`}
                          src={gal}
                        />
                        <Box className="h-5 w-5 absolute cursor-pointer top-0 right-0 m-0.5 bg-white rounded-full flex justify-center items-center border border-red-500">
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

            <Box className="!mt-8 !border-b border-b-gray-300 !pb-6">
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
                  updateStoreInfo(
                    {
                      ...inputValues,
                      social_media: socialMedia,
                      opening_hours: openHours,
                    },
                    
                  ).then(() => refetch())
                }
              >
                Save
              </Button>
            )}
          </Box>
          <Box className="!relative !pl-5">
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
          </Box>
        </Box>
      </Box>
      <BasicModal
        openModal={Boolean(modalOpen)}
        toggleModal={() => setModalOpen(!modalOpen)}
        content={
          <EnhancedCategorySelector
            closeModal={() => setModalOpen(false)}
            setPreferedCategories={(e) =>
              setValues((prev) => ({
                ...prev,
                categories: e,
              }))
            }
            preferredCategories={inputValues.categories || {}}
          />
        }
      />
    </StoreLeftSideBar>
  )
}

export default StorePage
