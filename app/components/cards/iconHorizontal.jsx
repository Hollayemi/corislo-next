// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Import
import Icon from '@/app/components/icon'
import CustomAvatar from '@/app/components/avatar'

const CardStatsHorizontal = props => {
  // ** Props
  const { sx, icon, category, subCateNum, prodNumb=0, status='in-active', iconSize = 24, avatarSize = 42, avatarColor = 'primary', alignItems = 'start' } = props

  return (
    <Card sx={{ ...sx }}>
      <CardContent sx={{ gap: 3, display: 'flex',justifyContent: 'space-between' }}>
        <CustomAvatar skin='light' color={avatarColor} sx={{ width: avatarSize, height: avatarSize }}>
          <Icon icon={icon} fontSize={iconSize} />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant='h6'>{category}</Typography>
            <Typography variant='body2'>{subCateNum}</Typography>
            <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems: 'flex-start' }}>
                <Typography variant='h6'>{status}</Typography>
                <Typography variant='body2'><Icon icon={icon} fontSize={iconSize} /> Featured Items</Typography>
            </Box>
        </Box>
        <Typography variant='h6'>{prodNumb}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardStatsHorizontal
