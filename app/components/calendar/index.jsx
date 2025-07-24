'use client'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useDispatch, useSelector } from 'react-redux'
import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'
import CalendarWrapper from './wrapper'
import AddEventSidebar from './AddEventSidebar'

const {
  updateEvent = () => {},
  handleSelectEvent = () => {},
  handleAllCalendars = () => {},
  handleCalendarsUpdate = () => {},
} = {}

const calendarsColor = {
  Personal: 'error',
  Business: 'primary',
  Family: 'warning',
  Holiday: 'success',
  ETC: 'info',
}

const AppCalendar = ({ handleAddEventToggle, addEventOpen }) => {
  const [calendarApi, setCalendarApi] = useState(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)

  const dispatch = useDispatch()
  const store = { selectedEvent: null }

  const leftSidebarWidth = 320
  const addEventSidebarWidth = 400
  const mdAbove = useMediaQuery((theme) => theme.breakpoints.up('md'))
  //   useEffect(() => {
  //     dispatch(fetchEvents(store.selectedCalendars))
  //   }, [dispatch, store.selectedCalendars])
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)

  return (
    <CalendarWrapper className="app-calendar">
      <SidebarLeft
        store={store}
        mdAbove={mdAbove}
        dispatch={dispatch}
        calendarApi={calendarApi}
        calendarsColor={calendarsColor}
        leftSidebarOpen={leftSidebarOpen}
        leftSidebarWidth={leftSidebarWidth}
        handleSelectEvent={handleSelectEvent}
        handleAllCalendars={handleAllCalendars}
        handleCalendarsUpdate={handleCalendarsUpdate}
        handleLeftSidebarToggle={handleLeftSidebarToggle}
        handleAddEventToggle={handleAddEventToggle}
      />
      <Box
        sx={{
          p: 2,
          pb: 0,
          flexGrow: 1,
          borderRadius: 1,
          boxShadow: 'none',
          backgroundColor: 'background.paper',
          ...(mdAbove
            ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
            : {}),
        }}
      >
        <Calendar
          store={store}
          dispatch={dispatch}
          updateEvent={updateEvent}
          calendarApi={calendarApi}
          calendarsColor={calendarsColor}
          setCalendarApi={setCalendarApi}
          handleSelectEvent={handleSelectEvent}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          handleAddEventToggle={handleAddEventToggle}
        />
      </Box>
    </CalendarWrapper>
  )
}

export default AppCalendar
