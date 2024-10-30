import { Box, TextField, Button, MenuItem } from '@mui/material'
import { SimpleDropDown } from '../add-new-product/components'
import useSWR from 'swr'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBrand } from '@/app/redux/state/slices/shop/brands/brands'
import { GridLayout } from './components'
import QuillTextEditor from '@/app/components/text-editor/quill'

const CreateSubCollection = () => {
  const [brandInfo, setBrandInfo] = useState('')
  const [values, setValues] = useState({
    subCollectionName: '',
    collectionId: '',
    category: null,
    subcategory: '',
    brandInfo: '',
  })
  const { data: cols, isLoading } = useSWR('/store/collections')
  const { data: subCates, isLoading: subCateLoading } = useSWR(
    values.category && `corisio/all-sub-categories?category=${values.category}`
  )
  const dispatch = useDispatch()
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleCollectionSelection = (event) => {
    const det = event.target.value.split('&&&&& ')
    setValues({ ...values, category: det[1], collectionId: det[0] })
  }

  const collections = cols?.data || [{}]
  const subCategories = subCates?.data || [{}]

  return (
    <Box className="flex-grow-1 w-full !overflow-auto overflowStyle py-2">
      <GridLayout
        title="Select Collection"
        comp={
          <SimpleDropDown
            render={collections?.map((res, i) => (
              <MenuItem key={i} value={`${res?._id}&&&&& ${res?.category}`}>
                {res.collectionName}
              </MenuItem>
            ))}
            sx={{ mb: 1.5 }}
            defaultValue={`${values?.collectionId}&&&&& ${values?.category}`}
            onChange={handleCollectionSelection}
            inputProps={{ className: 'bg-gray-50' }}
          />
        }
      />
      <GridLayout
        title="Parent Sub Category"
        comp={
          <SimpleDropDown
            render={subCategories?.map((res, i) => (
              <MenuItem key={i} value={res._id}>
                {res.label}
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
        title="Description"
        subtitle="Wite a short description"
        comp={
          <QuillTextEditor
            value={brandInfo}
            className="bg-gray-50 h-52"
            onChange={(e) => setBrandInfo(e)}
          />
        }
      />
      <GridLayout
        title="Set Sub-collection Name"
        subtitle="Use the selected subcategory to create your sub-collection."
        comp={
          <TextField
            sx={{ mb: 1.5 }}
            className="w-5/6 md:w-full bg-gray-50"
            onChange={handleChange('subCollectionName')}
            // size="small"
            fullWidth
            id="outlined-basic"
            inputProps={{ className: '!h-2' }}
            placeholder="Sub Collection Name"
          />
        }
      />
      <GridLayout
        comp={
          <Button
            fullWidth
            variant="contained"
            onClick={() => createBrand(values, dispatch)}
            className="!mt-2"
          >
            Create Sub-Collection
          </Button>
        }
      />
    </Box>
  )
}

export default CreateSubCollection
