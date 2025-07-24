// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import Icon from '../icon'
import DatePickerWrapper from '@/app/styles/react-datepicker'

// ** Styled Component


const SidebarLeft = props => {
  const {
    store,
    mdAbove,
    dispatch,
    calendarApi,
    calendarsColor,
    leftSidebarOpen,
    leftSidebarWidth,
    handleSelectEvent,
    handleAllCalendars,
    handleCalendarsUpdate,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle
  } = props
  const colorsArr = calendarsColor ? Object.entries(calendarsColor) : []

  const renderFilters = colorsArr.length
    ? colorsArr.map(([key, value]) => {
        return (
          <FormControlLabel
            key={key}
            label={key}
            className='!text-sm'
            control={
              <Checkbox
                color={value}
                size='small'
                checked={store.selectedCalendars?.includes(key)}
                onChange={() => dispatch(handleCalendarsUpdate(key))}
              />
            }
          />
        )
      })
    : null

  const handleSidebarToggleSidebar = () => {
    handleAddEventSidebarToggle()
    dispatch(handleSelectEvent(null))
  }
  if (renderFilters) {
    return (
      <Drawer
        open={leftSidebarOpen}
        onClose={handleLeftSidebarToggle}
        variant={mdAbove ? 'permanent' : 'temporary'}
        ModalProps={{
          disablePortal: true,
          disableAutoFocus: true,
          disableScrollLock: true,
          keepMounted: true // Better open performance on mobile.
        }}
        
        sx={{
          zIndex: 2,
          display: 'block',
          position: mdAbove ? 'static' : 'absolute',
          '& .MuiDrawer-paper': {
            borderRadius: 1,
            boxShadow: 'none',
            width: leftSidebarWidth,
            borderTopRightRadius: 0,
            alignItems: 'flex-start',
            borderBottomRightRadius: 0,
            zIndex: mdAbove ? 2 : 'drawer',
            position: mdAbove ? 'static' : 'absolute'
          },
          '& .MuiBackdrop-root': {
            borderRadius: 1,
            position: 'absolute'
          }
        }}
      >

        {/* <Divider sx={{ width: '100%', m: '0 !important' }} /> */}
        <Box className="flex justify-center">
        <DatePickerWrapper
        className='!w-9/12'
          sx={{
            
            display: 'flex',
            justifyContent: 'center',
            '& .react-datepicker': { boxShadow: 'none !important', border: 'none !important', margin: 0, padding:0 }
          }}
        >
          <DatePicker inline onChange={date => calendarApi.gotoDate(date)} />
        </DatePickerWrapper>
        </Box>
        <Divider sx={{ width: '100%', m: '0 !important' }} />
        <Box sx={{ p: 2, display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Typography variant='body2' sx={{ mb: 2, color: 'text.disabled', textTransform: 'uppercase' }}>
            Filters
          </Typography>
          <FormControlLabel
            label='View All'
            
            control={
              <Checkbox
              size='small'
                checked={store.selectedCalendars?.length === colorsArr.length}
                onChange={e => dispatch(handleAllCalendars(e.target.checked))}
              />
            }
          />
          {renderFilters}
        </Box>
      </Drawer>
    )
  } else {
    return null
  }
}

export default SidebarLeft
