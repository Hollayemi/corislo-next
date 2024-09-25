'use client'
import { Box, Button, Divider, Typography } from '@mui/material'
import { ProgressBar } from 'react-loader-spinner'
import { useState } from 'react'
import { StatusView } from '../components'
import { BasicModal } from '@/app/components/cards/popup'
import ServiceDashboardWrapper from '@/app/components/view/services'
import { SetLocation } from './component'
import { FileUploader } from '../../store/dashboard/stores/component'
import ProfilePictureUploader from '@/app/components/cards/fileUpload'
import IconifyIcon from '@/app/components/icon'
import Image from 'next/image'
import {
  addImageLink,
  deletePicture,
  updateBranchImages,
} from '@/app/redux/state/slices/shop/branches'
import { useDispatch } from 'react-redux'
import { formatBytes } from '@/app/utils/format'

const ServiceDashboard = () => {
  const dispatch = useDispatch()
  const [url, setUrl] = useState('')
  const [files, setFiles] = useState([])
  const [localFiles, setLocalFiles] = useState([])
  const [openModal, setOpenModal] = useState(true)
  const UploadBar = ({ file, link, done = 0 }) => {
    const url = files.filter((x) => x.name === file.name)[0]
    return (
      <Box className="flex flex-col items-center h-fit mt-3 w-full bg-gray-100 rounded-md px-2 ">
        <Box className="flex justify-between items-center w-full h-14">
          <Box className="flex items-center">
            <Image
              src={`/images/misc/${
                file.type.startsWith('video') ? 'video' : 'image'
              }-file.png`}
              alt="video png"
              className="h-8 w-8"
              width={300}
              height={300}
            />
            <Box className="flex flex-col items-start ml-2">
              <Typography
                variant="body2"
                className="!text-[13px] !font-bold !text-black"
              >
                {file.name}
              </Typography>
              {link}
              <Typography
                variant="body2"
                className="!text-[10px] !text-gray-400"
              >
                {formatBytes(file?.size || 0)} <span className="px-2 ">.</span>{' '}
                {!done ? 'uploading' : 'uploaded'}
              </Typography>
            </Box>
          </Box>
          <Box className="flex flex-col items-center ml-2 w-8">
            {done && (
              <IconifyIcon
                icon="tabler:trash"
                className="text-red-500 text-[16px]"
                onClick={() =>
                  deletePicture(url.link, dispatch, () =>
                    setLocalFiles((prev) =>
                      prev.filter((x) => x.name !== file.name)
                    )
                  )
                }
              />
            )}
            {done && (
              <Typography
                variant="body2"
                className="!text-[10px] !text-gray-400 !mt-2"
              >
                100%
              </Typography>
            )}
            {!done && (
              <ProgressBar
                visible={true}
                height="40"
                width=""
                borderColor="blue"
                barColor="blue"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{ width: '50px' }}
                wrapperClass="mr-5"
              />
            )}
          </Box>
        </Box>
      </Box>
    )
  }
  return (
    <ServiceDashboardWrapper
    // popup={
    //   <BasicModal
    //     openModal={openModal}
    //     toggleModal={() => setOpenModal(false)}
    //     content={<Box className="md:w-[400px] h-[500px]"><SetLocation close={() => setOpenModal(false)} /></Box>}
    //   />
    // }
    >
      <Box>
        <Box className="flex flex-col justify-center items-center px-2">
          <Box className="px-4 py-6 md:p-10 bg-white rounded-xl shadow h-fit my-6 md:my-10 w-full md:w-[500px]">
            <Typography
              variant="body2"
              className="!text-[13px] !font-bold !text-black"
            >
              Add Media Files
            </Typography>
            <Box className="w-full mt-3 mb-2">
              <ProfilePictureUploader
                fileNum={10}
                setLocalFiles={setLocalFiles}
                component={
                  <Box className="relative w-full h-40 md:h-44">
                    <Box className="flex flex-col items-center border-2 bg-gray-100 border-blue-700 border-dashed justify-center w-full h-full rounded-xl absolute top-0 left-0 !text-white">
                      <img
                        className="w-16 h-16"
                        alt="Upload img"
                        src={`/images/misc/upload-cloud.png`}
                      />
                      <Typography
                        variant="caption"
                        className="!text-[12px] z-50 !text-gray-600"
                      >
                        Drag & Drop or{' '}
                        <span className="text-blue-600">Choose</span> file to
                        upload
                      </Typography>
                      <Typography
                        variant="caption"
                        className="!text-[10px] z-50 !text-gray-400"
                      >
                        img, png, jpg, mp4, amv
                      </Typography>
                    </Box>
                  </Box>
                }
                directUpload={(image, file) =>
                  updateBranchImages(
                    {
                      image,
                      type: 'gallery',
                      state: 'add',
                      name: file.name,
                      isVideo: file.type.startsWith('video'),
                    },
                    dispatch,
                    () => {},
                    setFiles,
                    setLocalFiles
                  )
                }
              />
            </Box>
            {localFiles?.map((file, i) => {
              const isFile = files.filter((x) => x.name === file.name)
              return (
                <UploadBar
                  file={file}
                  key={i}
                  link={isFile.link}
                  done={isFile.length > 0}
                />
              )
            })}
            <br />
            <br />
            <Divider>
              <Typography
                variant="body2"
                className="!text-[12px] !text-gray-400"
              >
                OR
              </Typography>
            </Divider>
            <Typography
              variant="body2"
              className="!text-[13px] !font-bold !text-black !mt-6"
            >
              Import from URL
            </Typography>

            <Box className="relative w-full mt-3">
              <input
                type="text"
                placeholder="Add images from link (.jpg,png,jpeg,)"
                value={url}
                className="w-full pr-8 md:pr-20 text-[15px] pl-3 md:pl-5 h-9 md:h-11 border border-black rounded-lg transition-all outline-none"
                onChange={(e) => setUrl(e.target.value)}
              />

              <Button
                onClick={() => addImageLink({ url, type: 'gallery' }, dispatch)}
                className="!absolute top-1 -mt-0.5 right-2 mr-3 cursor-pointer"
              >
                Upload
              </Button>
            </Box>

            <Box className="mt-10 flex items-center justify-between">
              <Box className="flex items-center">
                <IconifyIcon icon="tabler:help-circle" />
                <Typography
                  variant="body2"
                  className="!text-[12px] !ml-2 !text-black"
                >
                  Help Center
                </Typography>
              </Box>
              <Box className="flex justify-center absolute left-1/2 -ml-6 mt-10">
                <Box className="w-2 h-2 m-1 rounded-full bg-blue-600"></Box>
                <Box className="w-2 h-2 m-1 rounded-full bg-gray-300"></Box>
              </Box>
              <Button
                variant="contained"
                className="!shadow-none !rounded-full w-32"
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ServiceDashboardWrapper>
  )
}
export default ServiceDashboard
