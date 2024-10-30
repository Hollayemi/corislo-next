'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode'
import useSWR from 'swr'
import io from 'socket.io-client'
import { useUserData } from '../hooks/useData'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const { createContext, useEffect, useState } = require('react')

const defaultProvider = {
  staffInfo: {},
  storeInfo: {},
  showOverlay: () => {},
  setLoading: () => {},
  connection: false,
  overLay: null,
  socket: null,
}
const SuperDataContext = createContext(defaultProvider)

const SuperDataProvider = ({ children }) => {
  const [hideOverflow, setOverflow] = useState(true)
  const router = useRouter()
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

  const connection = () => {
    const getLocalToken =
      typeof window !== 'undefined' && localStorage.getItem('super_token')
    if (getLocalToken) {
      const decodedToken = jwt_decode(getLocalToken) // Decode the JWT token
      const currentTime = Date.now() / 1000 // Get the current time in seconds
      // // Check if the token is still valid based on its expiration time
      return decodedToken.exp > currentTime
    }
    return Boolean(getLocalToken)
  }

  useEffect(() => {
    const whiteList = ['login']
    if (
      !connection() &&
      getPath[1] === 'coristen' &&
      !whiteList.includes(getPath[2])
    ) {
      router.replace(`/coristen/login`)
    }
  }, [getPath, router])

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
  } = useSWR(connection() && '/super/staff')

  return (
    <SuperDataContext.Provider
      value={{
        staffInfo: (!staffErr && !staffIsLoading && staffInfo?.data) || {},
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
    </SuperDataContext.Provider>
  )
}
export { SuperDataProvider, SuperDataContext }
