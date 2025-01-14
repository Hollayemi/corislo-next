// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import OptionsMenu from '@/app/components/option-menu'
import { Icon } from '@mui/material'
import Image from 'next/image'
import useSWR from 'swr'

// ** Icon Imports

const data = [
  {
    title: '$8.45k',
    trendNumber: 25.8,
    subtitle: 'United States',
    imgSrc: '/images/avatar/1.png'
  },
  {
    title: '$7.78k',
    trend: 'negative',
    trendNumber: 16.2,
    subtitle: 'Brazil',
    imgSrc: '/images/avatar/1.png'
  },
  {
    title: '$6.48k',
    subtitle: 'India',
    trendNumber: 12.3,
    imgSrc: '/images/avatar/1.png'
  },
  {
    title: '$5.12k',
    trend: 'negative',
    trendNumber: 11.9,
    subtitle: 'Australia',
    imgSrc: '/images/avatar/1.png'
  },
  {
    title: '$4.45k',
    subtitle: 'France',
    trendNumber: 16.2,
    imgSrc: '/images/avatar/1.png'
  },
  {
    title: '$3.90k',
    subtitle: 'China',
    trendNumber: 14.8,
    imgSrc: '/images/avatar/1.png'
  }
]

const AnalyticsSalesByCountries = () => {
  const { data: realData } = useSWR("/super/top-users")
  const users  = realData?.data || []
  return (
    <Box className="p-3 mt-3">
     
      <Box>
        {users.map((item, index) => {
          return (
            <Box
              key={item.customerId}
              sx={{
                display: 'flex',
                '& img': { mr: 2 },
                alignItems: 'center',
                mb: index !== data.length - 1 ? 3 : undefined
              }}
            >
              <Image  src={item.picture} height={500} width={500} alt={item.customer} className='w-10 g-10 rounded-full' />

              <Box
                sx={{
                  rowGap: 1,
                  columnGap: 2,
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography sx={{ fontWeight: 500 }}>{item.customer}</Typography>
                  <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                    {item.email}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    '& svg': { mr: 1 },
                    alignItems: 'center',
                    '& > *': { color: item.trend === 'negative' ? 'error.main' : 'success.main' }
                  }}
                >
                  <Icon
                    fontSize='1.25rem'
                    icon="tabler:info"
                  />
                  <Typography sx={{ fontWeight: 500 }}>more</Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default AnalyticsSalesByCountries
