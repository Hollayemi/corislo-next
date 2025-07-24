'use client'
import HomeWrapper from '@/app/components/view/home'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import Premium from './premium'
import Freemium from './freemium'

const UserPlans = () => {
  const [showing, setShowing] = useState('premium')
  return (
    <HomeWrapper noFooter>
      <Box className="flex justify-center px-1 md:px-4">
        <Box className="w-full md:5/6 lg:w-4/6 bg-white md:h-[600px] rounded-xl md:mt-5 shadow-xl">
          <Box className="flex items-center relative ">
            <Box
              onClick={() => setShowing('premium')}
              className="w-1/2 h-10 cursor-pointer  items-center flex justify-center relative rounded-b-md bg-transparent z-40"
            >
              <Typography>Freemium</Typography>
            </Box>
            <Box
              onClick={() => setShowing('freemium')}
              className="w-1/2 h-10 cursor-pointer  items-center flex justify-center relative rounded-b-md bg-transparent z-40"
            >
              <Typography>Premium</Typography>
            </Box>
            <Box
              className={`absolute shadow-inner border-b border-gray-100 top-0 ${
                showing === 'premium'
                  ? 'left-1/2 border-l rounded-bl-xl'
                  : 'left-0 border-r rounded-br-xl'
              } transition-all duration-300 h-full w-1/2`}
              bgcolor="custom.bodyGray"
            ></Box>
          </Box>
          <Box className="pt-5 pb-10">
            {showing === 'freemium' && (
              <Premium viewing={showing === 'freemium'} />
            )}

            {showing === 'premium' && (
              <Freemium viewing={showing === 'freemium'} />
            )}
          </Box>
        </Box>
      </Box>
    </HomeWrapper>
  )
}

export default UserPlans
