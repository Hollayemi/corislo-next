import ServiceRenderWrapper from '@/app/components/view/services/header'
import { Box, Typography } from '@mui/material'
import { EachService } from './components'

const Services = () => {
  return (
    <ServiceRenderWrapper >
      <Box className="w-full bg-white !rounded-md !px-4 md:!px-8 !py-4 relative">
        <Box className=" !mb-3">
          <Typography
            variant="body2"
            className="!text-gray-800 !font-bold !text-[16px] !leading-6 mt-3"
          >
            Services
          </Typography>
          <Typography
            variant="body2"
            className="!text-gray-500 !text-[12px] !leading-6"
          >
            List of services and their reactions
          </Typography>
        </Box>
        <Box className=" flex flex-wrap">
          <EachService id={0} />
          <EachService id={1} />
          <EachService id={2} />
          <EachService id={3} />
          <EachService id={4} />
          <EachService id={5} />
          <EachService id={6} />
          <EachService id={7} />
        </Box>
      </Box>
    </ServiceRenderWrapper>
  )
}
export default Services
