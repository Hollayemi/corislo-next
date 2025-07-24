import { MyTextField } from '@/app/(pages)/user/components'
import IconifyIcon from '@/app/components/icon'
import { InfoOutlined } from '@mui/icons-material'

const { Box, Typography, InputAdornment, Button } = require('@mui/material')

const CompleteReg = ({ setSection }) => {
  return (
    <Box className="w-full h-screen bg-white flex justify-center">
      <Box className="w-[330px] mt-20">
        <Box
          className="w-8 h-8 bg-gray-50 mb-3 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => setSection(0)}
        >
          <IconifyIcon icon="tabler:arrow-narrow-left" />
        </Box>
        <Typography
          variant="body2"
          className="!font-black !text-blue-800 !text-[15px] sm:!text-xl md:!text-3xl"
        >
          Tell us about your services
        </Typography>
        <Box className="mt-4">
          <MyTextField
            title={
              <h5>
                Website of your services{' '}
                <InfoOutlined className="!text-gray-400 !ml-2 !text-[15px] cursor-pointer" />
                <i className="ml-1">(optional)</i>
              </h5>
            }
            onChange={() => {}}
            value={''}
            gray={false}
            placeholder={'website link'}
            PClassName={`w-full md:w-auto`}
            others={{}}
          />

          <MyTextField
            title="Write a little description about your service"
            type="text"
            level={7}
            name="about_store"
            values={'values'}
            onChange={() => {}}
            placeholder="Write about your service, not less than 500 words"
            label="Write a little description about your service"
            gray={false}
            others={{
              minRows: 6,
              maxRows: 3,
              multiline: true,
              rows: 6,
            }}
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          endIcon={<IconifyIcon icon="tabler:arrow-narrow-right" />}
          className="!mt-32"
        >
          Complete Setup
        </Button>
        <Box className="flex justify-center absolute left-1/2 -ml-6 mt-10">
          <Box className="w-2 h-2 m-1 rounded-full bg-gray-300"></Box>
          <Box className="w-2 h-2 m-1 rounded-full bg-blue-600"></Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CompleteReg
