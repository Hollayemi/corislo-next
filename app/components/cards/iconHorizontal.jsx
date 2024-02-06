// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Import
import Icon from '@/app/components/icon'
import CustomAvatar from '@/app/components/avatar'
import { lightColors } from '@/app/utils/Colors'
import { hexToRGBA } from '@/app/utils/hex-to-rgba'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const CardStatsHorizontal = props => {
  // ** Props
  const { sx, id, icon, category, subCateNum, prodNumb=0, status='in-active', iconSize = 24, avatarSize = 42, avatarColor = 'primary', selectedCate, setSelectedCate } = props

  const ITEM_HEIGHT = 48
  const randomIndex = Math.floor(Math.random() * lightColors.length);
  const bgcolor = hexToRGBA(lightColors[randomIndex], 0.2)
  const color = hexToRGBA(lightColors[randomIndex], 0.2)
  
  const handleClick = event => {
    console.log(event)
    // console.log(event.target.innerText)
    setSelectedCate(event.currentTarget)
  }

  const handleClose = () => {
    setSelectedCate(null)
  }

  const options = [
    {id, item: 'View'},
    {id, item: 'Deactivate'},
    {id, item: 'Delete'},
  ]

  return (
    <Card sx={{ bgcolor: bgcolor, ...sx, }}>
      <CardContent sx={{ gap: 2, display: 'flex',justifyContent: 'space-between', position: "relative" }}>
        <CustomAvatar skin='light' color={avatarColor} sx={{ width: avatarSize, height: avatarSize }}>
          <Icon icon={icon} fontSize={iconSize} />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant='h6' className="!text-[13px] !font-bold">{category}</Typography>
            <Typography variant='body2' className="!text-xs">{subCateNum} Sub-Categories</Typography>
            <Box className="flex items-center justify-between mt-4 text-xs">
                <Box className="text-xs mr-2 flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-0.5"></div>{status}</Box>
                <Box className="text-xs flex items-center"><Icon icon='tabler:plus' className="bg-blue-500 h-3 w-3 mr-0.5 rounded-full text-white" fontSize={8} /> Featured Items</Box>
            </Box>
        </Box>
        <Typography variant='h6'>{prodNumb}</Typography>

        {/* icon */}
        <div className="absolute bottom-2 right-0">
          <IconButton aria-label='more' aria-controls='long-menu' aria-haspopup='true' onClick={handleClick}>
            <Icon icon='tabler:dots-vertical' />
          </IconButton>
          <Menu
            keepMounted
            id='long-menu'
            anchorEl={selectedCate}
            onClose={handleClose}
            open={Boolean(selectedCate)}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                boxShadow: 3,
                elevation: 1,
              }
            }}
          >
            {options.map((option, i) => (
              <MenuItem key={i} value={option.id} selected={option.item === 'View'} onClick={handleClick}>
                {option.item}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardStatsHorizontal
