'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode'
import useSWR from 'swr'
import io from 'socket.io-client'
import { useUserData } from '../hooks/useData'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { Box } from '@mui/material'
import { viewAllNotificationsApi } from '../redux/state/slices/shop/others'

const { createContext, useEffect, useState } = require('react')

const defaultProvider = {
  staffInfo: {},
  storeInfo: {},
  showOverlay: () => {},
  setLoading: () => {},
  connection: false,
  overLay: null,
  socket: null,
  notifications: [],
}
const StoreDataContext = createContext(defaultProvider)

const StoreDataProvider = ({ children }) => {
  const [hideOverflow, setOverflow] = useState(true)
  const [notifications, setNotifications] = useState([])
  const router = useRouter()
  const dispatch = useDispatch()
  const pathname = usePathname()
  const [socket, setSocket] = useState(null)
  const [loading, setLoading] = useState(false)
  const [overLay, setOpenOverlay] = useState(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info', // 'success', 'error', 'warning', 'info'
  })

  const getPath = pathname.split('/')

  const showOverlay = (pageName = null) => {
    if (overLay) {
      setOverflow(false)
      setOpenOverlay(null)
       if (overLay === 'notification') {
         dispatch(viewAllNotificationsApi())
       }
    } else {
      setOverflow(true)
      setOpenOverlay(pageName)
    }
  }

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({
      open: true,
      message,
      severity,
    })
  }

  const hideSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }))
  }

  useEffect(() => setOverflow(loading), [loading])
  // useEffect(() => {
  //   if (
  //     !connection &&
  //     getPath[1] !== "store" &&
  //     getPath[2] !== "login"
  //   ) {
  //     router.replace(`/store/login`);
  //   }else{
  //     router.replace(`/store/dashboard`);
  //   }
  // }, [getPath, router]);

  useEffect(() => {
    if (!socket) {
      let server = 'http://localhost:5001'
      if (process.env.NODE_ENV === 'production') {
        server = 'https://corislo-backend.onrender.com'
      }
      const newSocket = io(server, {
        query: {
          token: localStorage.getItem('store_token'),
          by: 'store_token',
          port: 3033,
        },
      })
      setSocket(newSocket)

      newSocket.on('connect', () => {
        newSocket.emit('registerUser', 'business')
        console.log('Socket connected')
      })

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected')
      })

      newSocket.on('newMessage', (data) => {
        console.log(data)
      })

      newSocket.on('notify', (data) => {

        setNotifications(data)
      })
    }

    // Cleanup when the component unmounts
    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [socket])

  useEffect(() => {
    const getLocalToken =
      typeof window !== 'undefined' && localStorage.getItem('store_token')

    if (getLocalToken && getPath[1] === 'auth' && getPath[2] === 'login') {
      router.replace(`/`)
    }
  }, [getPath, router])

  const connection = () => {
    const getLocalToken =
      typeof window !== 'undefined' && localStorage.getItem('store_token')
    if (getLocalToken) {
      const decodedToken = jwt_decode(getLocalToken) // Decode the JWT token
      const currentTime = Date.now() / 1000 // Get the current time in seconds
      // // Check if the token is still valid based on its expiration time
      return decodedToken.exp > currentTime
    }
    return Boolean(getLocalToken)
  }

  useEffect(() => {
    const whiteList = ['login', 'register']
    if (
      !connection() &&
      getPath[1] === 'store' &&
      !whiteList.includes(getPath[2])
    ) {
      router.replace(`/store/login`)
    }
  }, [getPath, router])

  const {
    data: notif,
    error: notifErr,
    isLoading: notifIsLoading,
  } = useSWR(connection() && '/store/notification')

  const loadNotif = (!notifErr && !notifIsLoading && notif?.data) || []

  useEffect(() => {
    setNotifications(loadNotif)
  }, [notif])

  //
  //
  //
  //
  //
  //
  //data fetching functions

  //
  // fetch staffInfo
  //
  const {
    data: staffInfo,
    error: staffErr,
    isLoading: staffIsLoading,
  } = useSWR(connection() && '/branch/logged-in-staff')
  //
  //
  // fetch storeInfo
  //
  const {
    data: storeInfo,
    error: storeErr,
    isLoading: storeIsLoading,
  } = useSWR(connection() && '/store')
  //

  return (
    <Box className={`${hideOverflow && '!overflow-hidden'}`}>
      <StoreDataContext.Provider
        value={{
          staffInfo: (!staffErr && !staffIsLoading && staffInfo?.data) || {},
          storeInfo: (!storeErr && !storeIsLoading && storeInfo) || {},
          selectedAddress: {},
          notifications,
          connection: connection(),
          showOverlay,
          setLoading: setLoading,
          showSnackbar,
          hideSnackbar,
          overLay,
          socket,
        }}
      >
        {children}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={hideSnackbar}
          className="!mt-12 !shadow-md"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={hideSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </StoreDataContext.Provider>
    </Box>
  )
}
export { StoreDataProvider, StoreDataContext }
