import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import IconifyIcon from '../icon'

const AddEventComponent = ({ close, toEdit }) => {
  const [values, setValues] = useState({
    title: '',
    category: '',
    time: '',
    description: '',
  })
  console.log(values)
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <Box className="">
      <Box className="flex w-full  justify-end h-[100vh] py-4 overflowStyle">
        <Box className="w-full md:w-[350px] h-full overflow-y-auto overflowStyle  p-3 relative border-8 border-white bg-white rounded-xl md:mr-4 flex flex-col">
          <Box className="sticky -top-3 border-b z-50  bg-white py-3 flex items-center justify-between mb-6">
            <Typography
              variant="body2"
              className="!font-bold !text-[16px] !text-black "
            >
              {toEdit ? 'Update' : 'Create New'} Booking
            </Typography>
            <Box className="" onClick={close}>
              <IconifyIcon icon="tabler:x" />
            </Box>
          </Box>
          <Box
            className="relative h-full
          "
          >
            <Box sx={{ pl: 0.2, mb: 0.5 }}>
              <Typography variant="caption" className="!mb-1">
                Booking Title
              </Typography>
              <TextField
                className="!mt-1 !mb-3"
                fullWidth
                size="small"
                value={values.title}
                id="outlined-basic"
                onChange={handleChange('title')}
                // label="Product Name"
              />
            </Box>
            <Box sx={{ pl: 0.2, mb: 0.5 }}>
              <Typography variant="caption" className="!mb-1">
                Booking Category
              </Typography>
              <TextField
                className="!mt-1 !mb-3"
                fullWidth
                size="small"
                value={'Mechanic'}
                id="outlined-basic"
                onChange={handleChange('category')}
                // label="Product Name"
              />
            </Box>
            <Box sx={{ pl: 0.2, mb: 0.5 }}>
              <Typography variant="caption" className="!mb-1">
                Starting Time
              </Typography>
              <TextField
                className="!mt-1 !mb-3"
                type="time"
                fullWidth
                size="small"
                value={'Mechanic'}
                id="outlined-basic"
                onChange={handleChange('time')}
                // label="Product Name"
              />
            </Box>
            <Box sx={{ pl: 0.2, mb: 0.5 }}>
              <Typography variant="caption" className="!mb-1">
               Leave a message
              </Typography>
              <TextField
                className="!mt-1 !mb-3"
                type="time"
                fullWidth
                multiline
                rows={4}
                size="small"
                placeholder={'a short message'}
                id="outlined-basic"
                onChange={handleChange('description')}
                // label="Product Name"
              />
            </Box>
            <Button
              variant="contained"
              fullWidth
              className="!rounded-md !shadow-none absolute bottom-0"
            >
              Create Booking
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AddEventComponent
