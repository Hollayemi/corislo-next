import { Box, TextField, Button, MenuItem } from '@mui/material'
import { SimpleDropDown } from '../add-new-product/components'
import useSWR from 'swr'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createHandler } from '@/app/redux/state/slices/shop/collections/createCollection'
import { GridLayout } from './components'
import QuillTextEditor from '@/app/components/text-editor/quill'

const CreateCollection = () => {
  const { data, isLoading } = useSWR('/corisio/all-categories')
  const dispatch = useDispatch()
  const [collectionInfo, setCollectionInfo] = useState("")
  const [values, setValues] = useState({
    collectionName: '',
    category: '',
    collectionInfo: '',
  })
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const categories = data?.data || [{}]
  return (
    <Box className="flex-grow-1 w-full !overflow-auto overflowStyle py-3">
      <GridLayout
        title="Parent Category"
        comp={
          <SimpleDropDown
            render={categories?.map((res, i) => (
              <MenuItem key={i} value={res._id}>
                {res.label}
              </MenuItem>
            ))}
            placeholder="Parent Category"
            // sx={{ mb: 2 }}

            defaultValue={values.category}
            onChange={handleChange('category')}
            inputProps={{ className: 'bg-gray-50' }}
          />
        }
      />
      <GridLayout
        title="Description"
        subtitle="Wite a short description"
        comp={
          <QuillTextEditor
            value={collectionInfo}
            className="bg-gray-50 h-52"
            onChange={(e) => setCollectionInfo(e)}
          />
        }
      />

      <GridLayout
        title="Collection Name"
        subtitle="Use the selected category to create your collection."
        comp={
          <TextField
            className="w-5/6 bg-gray-50"
            onChange={handleChange('collectionName')}
            // size="small"
            fullWidth
            id="outlined-basic"
            inputProps={{ className: '!h-2' }}
            placeholder="Collection Name"
          />
        }
      />
      <GridLayout
        comp={
          <Button
            fullWidth
            variant="contained"
            onClick={() => createHandler(values, dispatch)}
            className="!mt-4"
          >
            Create Collection
          </Button>
        }
      />
    </Box>
  )
}

export default CreateCollection
