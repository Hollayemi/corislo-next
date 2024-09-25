'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode'
import useSWR from 'swr'
import io from 'socket.io-client'
import useGeolocation from '../hooks/useGeolocation'
import { UserPages } from '../components/view/home/Components'

const { createContext, useEffect, useState } = require('react')

const defaultProvider = {
  cartedProds: [],
  savedProds: [],
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
  // useEffect(() => {
  //   const getLocalToken =
  //     typeof window !== "undefined" && localStorage.getItem("user_token");

  //   if (
  //     getLocalToken &&
  //     getPath[1] === "auth" &&
  //     getPath[2] === "login"
  //   ) {
  //     router.replace(`/`);
  //   }
  // }, [getPath, router]);

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

  // useEffect(() => {
  //   if (getPath[1]) {
  //     if (
  //       isOffline() &&
  //       getPath[1] !== "auth" &&
  //       getPath[1] !== "store" &&
  //       getPath[2] !== "login"
  //     ) {
  //       router.replace(`/auth/login?returnurl=${pathname.substring(1)}`);
  //     }
  //   }
  // }, [userData, getPath, router]);

  useEffect(() => {
    const offlinePages = UserPages.isOffline.map((x) => x.link)
    const whiteList = ['login', 'register', 'biz', ...offlinePages]
    if (isOffline() && !whiteList.includes(getPath[getPath.length - 1])) {
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
      console.log(pageName, overLay)
      if ((overLay && !pageName) || pageName === overLay) {
        setOverflow(false)
        setOpenOverlay(null)
      } else {
        setOverflow(true)
        setOpenOverlay(pageName)
      }
    }

  const showMapScreen = () => {
    console.log('hello')
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

  //
  //
  // fetch userInfo
  //
  //

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
  // fetch CARTiNFO
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
        following: (!folErr && !folIsLoading && following?.data) || [],
        cartData: (!cartErr && !cartIsLoading && cartData?.data) || {},
        userInfo: (!userErr && !userIsLoading && userInfo?.user) || {},
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
