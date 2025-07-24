/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { usePathname, useRouter } from 'next/navigation'
import jwt_decode from 'jwt-decode'
import useSWR from 'swr'
import io from 'socket.io-client'
import useGeolocation from '../hooks/useGeolocation'
import { UserPages } from '../components/view/home/Components'
import { isMobile, osName, osVersion } from 'react-device-detect'

const deviceKey = `${osName} ${osVersion}`.replace(/[^a-zA-Z0-9_]/g, '_')
const { createContext, useEffect, useState } = require('react')

const defaultProvider = {
  cartedProds: [],
  savedProds: [],
  savedServices: [],
  following: [],
  cartData: {},
  userInfo: {},
  selectedAddress: {},
  isOffline: true,
  notifications: [],
  loading: false,
  setLoading: () => {},
  socket: null,
  overLay: null,
  showMapScreen: () => {},
  popMap: false,
  temp: {},
  addTemp: () => {},
  seletedCartProds: [],
  selectCartProd: () => {},
  shopNow: false,
  coordinates: {},
  setShopNow: () => {},
}
const DataContext = createContext(defaultProvider)

const UserDataProvider = ({ children, setOverflow, setConnection }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { coordinates, error } = useGeolocation(10000)
  const [shopNow, setShopNow] = useState(false)
  const [notifications, setNotification] = useState([])
  const [loading, setLoading] = useState(false)
  const [seletedCartProds, selectCartProd] = useState([])
  const [socket, setSocket] = useState(null)
  const [temp, addTemp] = useState({})
  const [overLay, setOpenOverlay] = useState(null)
  const [popMap, setMapPopup] = useState(false)

  useEffect(() => setOverflow(loading), [loading])

  const getPath = pathname.split('/')

  const isOffline = () => {
    const getLocalToken =
      typeof window !== 'undefined' && localStorage.getItem('user_token')
    if (getLocalToken) {
      const decodedToken = jwt_decode(getLocalToken) // Decode the JWT token
      const currentTime = Date.now() / 1000 // Get the current time in seconds
      // // Check if the token is still valid based on its expiration time
      return decodedToken.exp < currentTime
    }
    return true
  }

  useEffect(() => {
    const offlinePages = UserPages.isOffline.map((x) => x.link)
    const whiteList = [
      'auth',
      'biz',
      'picker-order',
      'category',
      ...offlinePages,
    ]
    if (isOffline() && !whiteList.includes(getPath[getPath.length - 2])) {
      router.replace(`/auth/login?returnurl=${pathname.substring(1)}`)
    }
  }, [getPath, router])

  useEffect(() => {
    if (!socket) {
      let server = 'http://localhost:5001'
      if (process.env.NODE_ENV === 'production') {
        server = 'https://corislo-backend.onrender.com'
      }
      const newSocket = io(server, {
        query: {
          token: localStorage.getItem('user_token'),
          by: 'user_token',
          port: 3033,
        },
      })
      setSocket(newSocket)

      newSocket.on('connect', () => {
        newSocket.emit('registerUser', 'user')
      })

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected')
      })

      newSocket.on('newMessage', (data) => {
        console.log(data)
      })

      newSocket.on('notify', (data) => {
        setNotification(data)
      })
    }

    // Cleanup when the component unmounts
    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [socket])
  //  Overlays
  const showOverlay =
    (pageName = null) =>
    (e) => {
      if ((overLay && !pageName) || pageName === overLay) {
        setOverflow(false)
        setOpenOverlay(null)
      } else {
        setOverflow(true)
        setOpenOverlay(pageName)
      }
    }

  const showMapScreen = () => {
    if (popMap) {
      setOverflow(false)
      setMapPopup(false)
    } else {
      setOverflow(true)
      setMapPopup(true)
    }
  }

  //
  //
  //
  //
  //
  //data fetching functions
  //
  //
  //

  const {
    data: userInfo,
    error: userErr,
    isLoading: userIsLoading,
  } = useSWR(!isOffline() && '/user/get-account')

  useEffect(() => {
    setConnection(userInfo?.user?.push_subscription)
  }, [userInfo])

  userInfo?.user?.loginActivities &&
    userInfo.user.loginActivities[deviceKey]?.logout &&
    localStorage.removeItem('user_token')

  //
  //
  // fetch userInfo
  //
  //
  // F

  const { data: agent, agentIsLoading } = useSWR(!isOffline() && '/agent')
  const agentData = agent?.data[0] || {}

  const {
    data: notif,
    error: notifErr,
    isLoading: notifIsLoading,
  } = useSWR(!isOffline() && '/user/notification')

  const loadNotif = (!notifErr && !notifIsLoading && notif?.data) || []

  useEffect(() => {
    setNotification(loadNotif)
  }, [notif])
  //
  //
  // fetch CARTiNFO
  //
  //
  const {
    data: cartData,
    error: cartErr,
    isLoading: cartIsLoading,
  } = useSWR(!isOffline() && '/user/cart')
  //
  // fetch CARTiNFO
  //
  const {
    data: savedData,
    error: savedErr,
    isLoading: savedIsLoading,
  } = useSWR(!isOffline() && '/user/save-item/prods')

  // saved services
  const {
    data: savedServices,
    error: savedSerr,
    isLoading: savedServicesIsLoading,
  } = useSWR(!isOffline() && '/user/saved-services')

  // fetch stores you follow
  //
  const {
    data: following,
    error: folErr,
    isLoading: folIsLoading,
  } = useSWR(!isOffline() && '/user/following')
  return (
    <DataContext.Provider
      value={{
        cartedProds:
          (!cartErr && !cartIsLoading && cartData?.data?.cartedProds) || [],
        savedProds: (!savedErr && !savedIsLoading && savedData?.data) || [],
        savedServices:
          (!savedSerr && !savedServicesIsLoading && savedServices?.data) || [],
        following: (!folErr && !folIsLoading && following?.data) || [],
        cartData: (!cartErr && !cartIsLoading && cartData?.data) || {},
        userInfo: (!userErr && !userIsLoading && userInfo?.user) || {},
        agentInfo: !agentIsLoading ? agentData : {},
        notifications,
        selectedAddress: {},
        coordinates,
        socket,
        loading,
        setLoading: setLoading,
        setOverflow: setOverflow,
        showOverlay: showOverlay,
        showMapScreen: showMapScreen,
        seletedCartProds,
        selectCartProd,
        popMap: popMap,
        overLay: overLay,
        isOffline: isOffline(),
        shopNow,
        setShopNow,
        temp,
        addTemp,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
export { UserDataProvider, DataContext }
