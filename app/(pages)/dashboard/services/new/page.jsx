'use client'
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  ClickAwayListener,
  InputAdornment,
} from '@mui/material'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// import QuillTextEditor from '@/app/components/text-editor/quill'
import { GridLayout } from '@/app/(pages)/dashboard/store/product-management/add-new-category/components'
import { SimpleDropDown } from '@/app/(pages)/dashboard/store/product-management/add-new-product/components'
// import ServiceRenderWrapper from '@/app/components/view/services/header'
import { CreateService, UpdateService } from '@/app/redux/state/slices/spb'
import MyAutocomplete from '@/app/components/myAutoComplete'
import dynamic from 'next/dynamic'
import FileUploader from '../../store/product-management/add-new-product/dropZone'
import IconifyIcon from '@/app/components/icon'
import Image from 'next/image'
import { removeOrAddToArray } from '@/app/utils/arrayFunctions'
const ServiceRenderWrapper = dynamic(
  () => import('@/app/components/view/services/header'),
  { ssr: false }
)
const QuillTextEditor = dynamic(
  () => import('@/app/components/text-editor/quill'),
  { ssr: false }
)

const NewService = ({ close, toEdit }) => {
  console.log(toEdit)
  const { data: cats, error } = useSWR('/corisio/service-categories')
  const servCats = cats?.data || []

  const [description, setDescription] = useState('')
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [prevImages, setPrevImages] = useState([])
  const [files, setFiles] = useState([])
  const [localFiles, setLocalFiles] = useState([])
  const searchTerm = search.toLowerCase()

  const [values, setValues] = useState({
    service_name: '',
    category: '',
    priceFrom: 0,
    priceTo: 0,
    subcategory: '',
    description: '',
  })

  useEffect(() => {
    if (toEdit) {
      setValues(() => ({
        _id: toEdit._id,
        service_name: toEdit.service_name,
        priceFrom: toEdit.priceFrom,
        priceTo: toEdit.priceTo,
        category: toEdit.category,
        subcategory: toEdit.subcategory,
        description: toEdit.description,
        minutes: toEdit.minutes,
        hours: toEdit.hours,
        total_in_a_day: toEdit.total_in_a_day,
        collectionName: toEdit.collectionName,
      }))
      setSearch(toEdit.collectionName)
      setPrevImages(toEdit.images)
    }
  }, [toEdit])

  // Loading state based on SWR data fetching
  const catsIsLoading = !cats && !error

  // Filter the service categories based on search term (label and sub-categories)
  const filtered = servCats.filter(
    (x) =>
      x.label.toLowerCase().includes(searchTerm) ||
      x.sub_categories.some((item) => item.toLowerCase().includes(searchTerm))
  )

  const dispatch = useDispatch()
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const subCategories = servCats.filter((x) => x._id === values.category)

  const uploadFunction = () => {
    if (!toEdit) {
      CreateService({ ...values, newImages: files }, dispatch)
    } else {
      UpdateService(
        { ...values, newImages: files, images: prevImages },
        dispatch
      )
    }
  }
  return (
    <Box className="flex w-full  justify-end h-[100vh] py-4 overflowStyle">
      <ClickAwayListener onClickAway={() => {}}>
        <Box className="w-full md:w-[550px] h-full overflow-y-auto overflowStyle  p-3 relative border-8 border-white bg-white rounded-xl md:mr-4 flex flex-col">
          <Box className="sticky -top-3 border-b z-50  bg-white py-3 flex items-center justify-between mb-6">
            <Typography
              variant="body2"
              className="!font-bold !text-[16px] !text-black "
            >
              {toEdit ? 'Edit' : 'Create New'} Service
            </Typography>
            <Box className="" onClick={close}>
              <IconifyIcon icon="tabler:x" />
            </Box>
          </Box>
          <Typography
            variant="body2"
            className={`!text-[14px] !font-bold !my-3 }`}
          >
            Information
          </Typography>
          <Box className="border p-3 pt-7 md:pb-0 rounded-md">
            <GridLayout
              alignStart
              title="Service Heading *"
              className="md:!items-center mb-4"
              comp={
                <TextField
                  className="w-full  mb-"
                  onChange={handleChange('service_name')}
                  value={values.service_name}
                  fullWidth
                  id="outlined-basic"
                  inputProps={{ className: '!h-2' }}
                  placeholder="Sub Collection Name"
                />
              }
            />
            <GridLayout
              alignStart
              title="Category *"
              className="md:!items-center"
              comp={
                <MyAutocomplete
                  searchComponents={
                    <TextField
                      className=""
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                      onFocus={() => setOpen(true)}
                      fullWidth
                      id="outlined-basic"
                      inputProps={{ className: '!h-2 ', autocomplete: 'off' }}
                      placeholder="Category"
                    />
                  }
                  closeFunc={() => setOpen(false)}
                  options={filtered}
                  viewOption={(e) => e.label}
                  open={open}
                  onClick={(value) => {
                    setValues((prev) => ({ ...prev, category: value._id }))
                    setValues((prev) => ({
                      ...prev,
                      collectionName: value.label,
                    }))
                    setSearch(value.label)
                  }}
                />
              }
            />
            <GridLayout
              alignStart
              title="Sub-Category *"
              className="md:!items-center mb-4"
              comp={
                <SimpleDropDown
                  render={subCategories[0]?.sub_categories?.map((res, i) => (
                    <MenuItem key={i} value={res}>
                      {res}
                    </MenuItem>
                  ))}
                  defaultValue={values.subcategory}
                  onChange={handleChange('subcategory')}
                  inputProps={{ className: '' }}
                />
              }
            />

            <GridLayout
              alignStart
              title="Service description"
              comp={
                <TextField
                  className=""
                  onChange={handleChange('description')}
                  value={values.description}
                  multiline
                  rows={4}
                  fullWidth
                  id="outlined-basic"
                  inputProps={{}}
                  placeholder="description"
                />
              }
            />
          </Box>
          <Typography
            variant="body2"
            className={`!text-[14px] !font-bold !mt-5 mb-3 }`}
          >
            Duration
          </Typography>
          <Box className="flex justify-between px-3 border p-3 py-5 mb-4 rounded-md">
            <SimpleDropDown
              label="Hours *"
              render={Array.from({ length: 11 }, (_, i) => i)?.map((res, i) => (
                <MenuItem key={i} value={res.toString()}>
                  {res} Hours
                </MenuItem>
              ))}
              defaultValue={values.hours}
              onChange={handleChange('hours')}
              inputProps={{ className: 'w-11/12' }}
            />
            <SimpleDropDown
              label="Minutes *"
              render={Array.from({ length: 6 }, (_, i) => i * 10).map(
                (res, i) =>
                  values.hours === '0' && i === 0 ? (
                    <></>
                  ) : (
                    <MenuItem key={i} value={res.toString()}>
                      {res} Minutes
                    </MenuItem>
                  )
              )}
              defaultValue={values.minutes}
              onChange={handleChange('minutes')}
              inputProps={{ className: 'w-11/12' }}
            />
            <SimpleDropDown
              label="Max order for a day *"
              render={Array.from({ length: 40 }, (_, i) => i + 1)?.map(
                (res, i) => (
                  <MenuItem key={i} value={res.toString()}>
                    {res}
                  </MenuItem>
                )
              )}
              defaultValue={values.total_in_a_day}
              onChange={handleChange('total_in_a_day')}
              inputProps={{ className: 'w-11/12' }}
            />
          </Box>
          <Typography
            variant="body2"
            className={`!text-[14px] !font-bold !mt-5 }`}
          >
            Price
          </Typography>
          <Box className="flex items-center px-4 mt-3 mb-4">
            <TextField
              sx={{ mb: 1.5 }}
              className="!w-2/5 "
              onChange={handleChange('priceFrom')}
              value={values.priceFrom}
              fullWidth
              id="outlined-basic"
              inputProps={{
                type: 'number',
                className: '!h-2',
                autocomplete: 'off',
              }}
              placeholder="Ranging from"
            />
            <Typography
              variant="body2"
              className="!mx-3 !text-gray-600 w-1/5 !mb-4 text-center"
            >
              -to-
            </Typography>
            <TextField
              sx={{ mb: 1.5 }}
              className="!w-2/5 "
              onChange={handleChange('priceTo')}
              value={values.priceTo}
              startWith="re"
              fullWidth
              id="outlined-basic"
              inputProps={{
                type: 'number',
                className: '!h-2',
                autocomplete: 'off',
                startAdornment: (
                  <InputAdornment position="start">₦</InputAdornment>
                ),
              }}
              placeholder="Ranging to"
            />
          </Box>

          <Typography
            variant="body2"
            className={`!text-[14px] !font-bold !mt-5 mb-3 }`}
          >
            Upload some images / tools you use for this service
          </Typography>
          <Box className="flex items-center flex-wrap">
            {toEdit?.images?.map((each, i) => (
              <Box className="relative w-16 h-16 m-3" key={i}>
                <Image
                  className={`w-full h-full rounded-md ${
                    !prevImages.includes(each) && ' !opacity-40'
                  }`}
                  alt={each}
                  src={each}
                  width={400}
                  height={400}
                />
                <div
                  onClick={() =>
                    removeOrAddToArray(each, prevImages, setPrevImages)
                  }
                  className="text-[6px] flex items-center justify-center absolute -mt-3 -mr-3 top-0 right-0 w-4 h-4 rounded-full !text-red-500"
                >
                  <IconifyIcon
                    icon={`tabler:${
                      !prevImages.includes(each) ? 'restore' : 'trash'
                    }`}
                    fontSize={17}
                  />
                </div>
              </Box>
            ))}
          </Box>
          <FileUploader
            files={files}
            setFiles={setFiles}
            localFiles={localFiles}
            setLocalFiles={setLocalFiles}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={uploadFunction}
            className="!mt-10"
          >
            {toEdit ? 'Update' : 'Create New'} Service
          </Button>
        </Box>
      </ClickAwayListener>
    </Box>
  )
}

export default NewService
