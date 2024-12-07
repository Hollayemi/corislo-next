'use client'
import { Box, TextField, Button, MenuItem, Typography } from '@mui/material'
import useSWR from 'swr'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
// import QuillTextEditor from '@/app/components/text-editor/quill'
import { GridLayout } from '@/app/(pages)/dashboard/store/product-management/add-new-category/components'
import { SimpleDropDown } from '@/app/(pages)/dashboard/store/product-management/add-new-product/components'
// import ServiceRenderWrapper from '@/app/components/view/services/header'
import { FileUploader } from '@/app/(pages)/dashboard/store/stores/component'
import { CreateService } from '@/app/redux/state/slices/spb'
import MyAutocomplete from '@/app/components/myAutoComplete'
import dynamic from 'next/dynamic'
const ServiceRenderWrapper = dynamic(
  () => import('@/app/components/view/services/header'),
  { ssr: false }
)
const QuillTextEditor = dynamic(
  () => import('@/app/components/text-editor/quill'),
  { ssr: false }
)

const NewService = () => {
  const { data: cats, error } = useSWR('/corisio/service-categories')
  const servCats = cats?.data || []

  const [description, setDescription] = useState('')
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
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

  console.log(searchTerm)
  // Loading state based on SWR data fetching
  const catsIsLoading = !cats && !error

  // Filter the service categories based on search term (label and sub-categories)
  const filtered = servCats.filter(
    (x) =>
      x.label.toLowerCase().includes(searchTerm) ||
      x.sub_categories.some((item) => item.toLowerCase().includes(searchTerm))
  )

  console.log(filtered)

  const dispatch = useDispatch()
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const subCategories = servCats.filter((x) => x._id === values.category)
  return (
    <ServiceRenderWrapper>
      <Box className="flex-grow-1 w-full !overflow-auto overflowStyle p-4 rounded-sm bg-white">
        <Typography
          variant="body2"
          className="!font-bold !text-[16px] !mb-6 !text-black "
        >
          Create New Service
        </Typography>

        <GridLayout
          alignStart
          title="Category"
          subtitle="Choose the main category for your service."
          comp={
            <MyAutocomplete
              searchComponents={
                <TextField
                  sx={{ mb: 1.5 }}
                  className="w-5/6 bg-gray-50"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  onFocus={() => setOpen(true)}
                  fullWidth
                  id="outlined-basic"
                  inputProps={{ className: '!h-2' }}
                  placeholder="Category"
                />
              }
              closeFunc={() => setOpen(false)}
              options={filtered}
              viewOption={(e) => e.label}
              open={open}
              onClick={(value) => {
                setValues((prev) => ({ ...prev, category: value._id }))

                setSearch(value.label)
              }}
            />
          }
        />
        <GridLayout
          alignStart
          title="Sub-Category"
          subtitle="Narrow down your service by picking a sub-category"
          comp={
            <SimpleDropDown
              render={subCategories[0]?.sub_categories?.map((res, i) => (
                <MenuItem key={i} value={res}>
                  {res}
                </MenuItem>
              ))}
              sx={{ mb: 1.5 }}
              defaultValue={values.subcategory}
              onChange={handleChange('subcategory')}
              inputProps={{ className: 'bg-gray-50' }}
            />
          }
        />
        <GridLayout
          alignStart
          title="Service Name"
          subtitle="Give your service a clear and catchy name."
          comp={
            <TextField
              sx={{ mb: 1.5 }}
              className="w-5/6 bg-gray-50"
              onChange={handleChange('service_name')}
              // size="small"
              fullWidth
              id="outlined-basic"
              inputProps={{ className: '!h-2' }}
              placeholder="Sub Collection Name"
            />
          }
        />
        <GridLayout
          alignStart
          title="Price Range"
          subtitle="Set the price range for your service."
          comp={
            <Box className="flex items-center">
              <TextField
                sx={{ mb: 1.5 }}
                className="!w-2/5 bg-gray-50"
                onChange={handleChange('priceFrom')}
                // size="small"
                fullWidth
                id="outlined-basic"
                inputProps={{ type: 'number', className: '!h-2' }}
                placeholder="Ranging from"
              />
              <Typography
                variant="body2"
                className="!mx-3 !text-gray-600 w-1/5 !mb-2 text-center"
              >
                -to-
              </Typography>
              <TextField
                sx={{ mb: 1.5 }}
                className="!w-2/5 bg-gray-50"
                onChange={handleChange('priceTo')}
                // size="small"
                fullWidth
                id="outlined-basic"
                inputProps={{ type: 'number', className: '!h-2' }}
                placeholder="Ranging to"
              />
            </Box>
          }
        />

        <GridLayout
          alignStart
          title="Upload Few Images"
          subtitle="Showcase your service with a few images."
          comp={
            <FileUploader
              files={files}
              setFiles={setFiles}
              localFiles={localFiles}
              setLocalFiles={setLocalFiles}
            />
          }
        />

        <GridLayout
          alignStart
          title="Description"
          subtitle="Write a detailed description of your service."
          comp={
            <QuillTextEditor
              value={description}
              className="bg-gray-50 h-52"
              onChange={(e) => setDescription(e)}
            />
          }
        />

        <GridLayout
          comp={
            <Button
              fullWidth
              variant="contained"
              onClick={() =>
                CreateService(
                  { ...values, description, images: files },
                  dispatch
                )
              }
              className="!mt-2"
            >
              Create New Service
            </Button>
          }
        />
      </Box>
    </ServiceRenderWrapper>
  )
}

export default NewService
