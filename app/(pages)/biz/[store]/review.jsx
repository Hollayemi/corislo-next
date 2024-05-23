import { Box, Rating, Typography } from '@mui/material'
import React from 'react'
import { ReviewTab } from './reviewTab'
import IconifyIcon from '@/app/components/icon';

const Review = () => {
  return (
    <Box>
      <Box className="!bg-white rounded-xl px-3 py-5 mt-10">
        <ReviewTab />
      </Box>
      <Box className="!bg-white rounded-xl px-10 py-8 mt-6">
        <Typography variant="body2" className="!font-bold !text-xl">
          Rate this app
        </Typography>
        <Typography variant="body2" className="!text-[12px]">
          Tell others what you think
        </Typography>
        <Rating defaultValue={0} className="py-6" name="large" size="large" />
        <Box className="relative">
          <input
            type="text"
            placeholder="Write your own review"
            className="border border-gray-100 w-full h-10 !rounded-full pl-4 pr-14"
          />
          <IconifyIcon icon="tabler:user-plus" className="absolute top-2 right-4" />
        </Box>
      </Box>
    </Box>
  );
}

export default Review