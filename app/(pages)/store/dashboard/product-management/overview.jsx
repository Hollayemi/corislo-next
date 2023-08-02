// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from '@/app/components/icon'

// ** Custom Components Imports
import CustomAvatar from '@/app/components/avatar'

const data = [
  {
    stats: '12,400',
    title: 'Overall Products',
    more: 'Total Products that has everbeen available in all stores',
    color: 'primary',
    icon: 'tabler:chart-pie-2'
  },
  {
    color: 'info',
    stats: '5,300',
    title: 'Available Products',
    more: 'Total Products that are available for purchase in all stores',
    icon: 'tabler:users'
  },
  {
    color: 'error',
    stats: '7,943',
    title: 'Sold Products',
    more: 'Total Products that has ever been sold in all stores',
    icon: 'tabler:shopping-cart'
  },
  {
    stats: '400',
    color: 'success',
    title: 'Out Of Stock',
    more: 'Total amount of products that are no longer in stock in all the stores.',
    icon: 'tabler:currency-dollar'
  }
]

const renderStats = () => {
  return data.map((sale, index) => (
    <Grid item xs={12} md={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'start' }}>
        <CustomAvatar skin='light' color={sale.color} sx={{ mr: 2, mt: 2, width: 42, height: 42 }}>
          <Icon icon={sale.icon} />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography color="text.primary" variant='h6' sx={{ fontWeight: 600 }}>{sale.stats}</Typography>
          <Typography color="text.primary" variant='body2' className="!font-bold">{sale.title}</Typography>
          <Typography color="text.primary" variant='caption' className="!text-[10px] !mt-1 !text-gray-500">{sale.more}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const OverViewCard = () => {
  return (
    
      <Box sx={{ pt: theme => `${theme.spacing(0.5)} !important` }}>
        <Grid container spacing={1}>
          {renderStats()}
        </Grid>
      </Box>
  )
}

export default OverViewCard
