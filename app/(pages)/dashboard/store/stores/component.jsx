/* eslint-disable @next/next/no-img-element */
'use client'

// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import {
  Box,
  Grid,
  TextField,
  Switch,
  Typography,
  Button,
  Checkbox,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from '@/app/components/icon'

import { DashboardCrumb } from '../components'
// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/navigation'
import { convertFileToBase64 } from '@/app/components/cards/fileUpload'
import { updateBranchImages } from '@/app/redux/state/slices/shop/branches'
import { useDispatch } from 'react-redux'
import { CircleLoader } from '@/app/components/cards/loader'
import { useStoreData } from '@/app/hooks/useData'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
}))

export const FileUploader = ({
  files,
  setFiles,
  localFiles,
  setLocalFiles,
  directUpload,
}) => {
  // ** Hooks
  const theme = useTheme()
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const fileInfo = acceptedFiles.map((file) => Object.assign(file))
      setLocalFiles(fileInfo)

      const base64Files = await Promise.all(
        acceptedFiles.map(async (file, i) => {
          if (file) {
            const base64Image = await convertFileToBase64(file)
            directUpload
              ? updateBranchImages(
                  {
                    image: base64Image,
                    type: 'gallery',
                    state: 'add',
                  },
                  dispatch,
                  setLoading
                )
              : setFiles((item) => {
                  return [
                    ...item,
                    { name: fileInfo[i].name, base64: base64Image },
                  ]
                })
          }
        })
      )
    },
  })

  const renderFilePreview = (file) => {
    if (file.type.startsWith('image')) {
      return (
        <img
          className="w-auto h-auto max-h-28 max-w-40 rounded-md"
          alt={file.name}
          src={URL.createObjectURL(file)}
        />
      )
    } else {
      return (
        <Icon icon="tabler:file-description" className="w-16 h-16 rounded-md" />
      )
    }
  }

  const handleRemoveFile = (file) => {
    const uploadedFiles = localFiles
    const filtered = uploadedFiles.filter((i) => i.name !== file.name)
    setLocalFiles([...filtered])

    const filteredbASE64 = files.filter((i) => i.name !== file.name)
    setFiles([...filteredbASE64])
  }

  return (
    <>
      {localFiles.length
        ? localFiles.map((file) => (
            <Grid item xs={6} md={4} key={file.name}>
              <div
                className="relative w-auth h-auto rounded-md"
                title={file.name}
              >
                {renderFilePreview(file)}
                <div className="absolute bottom-0 right-0 rounded-t-md bg-white p-0.5 ">
                  <Typography className="!text-[11px] !pt-.5" variant="body2">
                    {Math.round(file.size / 100) / 10 > 1000
                      ? `${(Math.round(file.size / 100) / 10000).toFixed(1)}mb`
                      : `${(Math.round(file.size / 100) / 10).toFixed(1)}kb`}
                  </Typography>
                </div>
                {isLoading && (
                  <div
                    onClick={() => handleRemoveFile(file)}
                    className="text-[6px] flex items-center justify-center text-white absolute -mt-2 -mr-4 top-0 right-0 w-5 h-5 rounded-full bg-red-500"
                  >
                    <Icon icon="tabler:trash" fontSize={13} />
                  </div>
                )}
                {isLoading && (
                  <>
                    {' '}
                    <div className="absolute w-full h-full top-0 left-0 bg-white opacity-40 "></div>
                    <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center ">
                      <CircleLoader />
                    </div>
                  </>
                )}
              </div>
            </Grid>
          ))
        : null}

      <Grid item xs={6} sm={4}>
        <div {...getRootProps({ className: 'dropzone cursor-pointer' })}>
          <input {...getInputProps()} />
          <Box className="flex items-center 2 justify-center p-1 w-36 h-36 rounded-md flex-col border border-dashed">
            <Img
              alt="Upload img"
              src={`/images/misc/upload-${theme.palette.mode}.png`}
            />
            <Typography sx={{ fontSize: '10px', textAlign: 'center', mt: 0.5 }}>
              Drag and Drop image here or Choose File
            </Typography>
          </Box>
        </div>
      </Grid>
    </>
  )
}

export const InputBoxWithSideLabel = ({
  label,
  value,
  className,
  inputProps,
  isEdit,
  onChange,
  shortInput,
}) => {
  return (
    <Grid container spacing={2} className={`mb-6 ${className}`}>
      <Grid item xs={12} sm={shortInput ? 8 : 4} className="!flex items-center">
        <Typography variant="body2" className="!text">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={shortInput ? 4 : 8}>
        <TextField
          InputProps={{
            ...inputProps,
            sx: {
              ...inputProps?.sx,
              ...(!isEdit && {
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }),
            },
          }}
          disabled={!isEdit}
          fullWidth
          onChange={onChange}
          className="!border-none"
          value={value}
          size="small"
        />
      </Grid>
    </Grid>
  )
}

export const SocialMediaConponent = ({
  label,
  className,
  socialMedia,
  setSocialMedia,
  inputProps,
  isEdit,
}) => {
  const smallLabel = label.toLowerCase().split(' ').join('')

  const handleChange = (label, value) => {
    const updated = { ...socialMedia, [label]: value }

    setSocialMedia(updated)
  }

  return (
    <Grid container spacing={2} className={`mb-6 ${className}`}>
      <Grid item xs={12} sm={4} className="!flex items-center">
        <Typography variant="body2">{label}</Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField
          onChange={(e) => handleChange(smallLabel, e.target.value)}
          fullWidth
          InputProps={{
            ...inputProps,
            sx: {
              ...inputProps?.sx,
              ...(!isEdit && {
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }),
            },
          }}
          disabled={!isEdit}
          value={
            label && socialMedia[label?.split(' ').join('')?.toLowerCase()]
          }
          size="small"
        />
      </Grid>
    </Grid>
  )
}

export const OpeningHours = ({
  label,
  className,
  openHours,
  inputProps,
  setOpenHours,
  isEdit,
}) => {
  const smallLabel = label.toLowerCase()
  const isPresent = Object.keys(openHours || {}).includes(smallLabel)

  const handleChange = (label, key, value) => {
    let updated
    if (isPresent) {
      updated = {
        ...openHours,
        [label]: { ...openHours[label], [key]: value },
      }
    } else {
      updated = { ...openHours, [label]: { [key]: value } }
    }
    setOpenHours(updated)
  }

  const checked = Boolean(openHours[smallLabel]?.isset)
  return (
    <Grid container spacing={1} className={`mb-6 ${className}`}>
      <Grid item xs={6} sm={4} className="!flex items-center">
        <Box className="!flex !items-center -ml-4 md:ml-0">
          <Checkbox
            edge="end"
            checked={isPresent && openHours[smallLabel]?.isset == true}
            className="!mr-2"
            onChange={(e) => handleChange(smallLabel, 'isset', !checked)}
          />
          <Typography variant="body2">{label}</Typography>
        </Box>
      </Grid>
      <Grid item xs={3} sm={4}>
        <TextField
          fullWidth
          defaultValue="08:00"
          className=""
          size="small"
          InputProps={{
            ...inputProps,
            sx: {
              ...inputProps?.sx,
              ...(!isEdit && {
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }),
            },
          }}
          disabled={!isEdit}
          onChange={(e) => handleChange(smallLabel, 'from', e.target.value)}
        />
      </Grid>
      <Grid item xs={3} sm={4}>
        <TextField
          fullWidth
          defaultValue="05:00"
          className=""
          size="small"
          InputProps={{
            ...inputProps,
            sx: {
              ...inputProps?.sx,
              ...(!isEdit && {
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }),
            },
          }}
          disabled={!isEdit}
          onChange={(e) => handleChange(smallLabel, 'to', e.target.value)}
        />
      </Grid>
    </Grid>
  )
}

export const StoreBreadCrumb = [
  ...DashboardCrumb,
  {
    text: 'Store',
    link: 'stores',
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
          startIcon={<Icon icon="tabler:plus" />}
          onClick={() => router.push('/dashboard/store/stores/sub-store')}
        >
          <span className="hidden md:block mr-1">Add New </span> Sub-Store
        </Button>
      </Box>
    )
  )
}

export const MySwitch = (props) => {
  return <Switch {...props} />
}
