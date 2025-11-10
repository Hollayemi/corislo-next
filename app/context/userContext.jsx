/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { usePathname, useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import useSWR from 'swr'
import io from 'socket.io-client'
import useGeolocation from '../hooks/useGeolocation'
import { UserPages } from '../components/view/home/Components'
import { isMobile, osName, osVersion } from 'react-device-detect'
import { isAuthenticated } from '../redux/user/api/axiosBaseQuery'
import { useGetSavedItemsQuery, useSaveItemMutation } from '../redux/user/slices/saveItemSlice'
import confetti from "canvas-confetti";
import { useGetFollowingStoresQuery } from '../redux/user/slices/followSlice'

const deviceKey = `${osName} ${osVersion}`.replace(/[^a-zA-Z0-9_]/g, '_')
const { createContext, useEffect, useState } = require('react')

const defaultProvider = {
  savedProds: [],
  savedServices: [],
  following: [],
  userInfo: {},
  selectedAddress: {},
  isOffline: true,
  notifications: [],
  loading: false,
  setLoading: () => { },
  socket: null,
  overLay: null,
  showMapScreen: () => { },
  popMap: false,
  temp: {},
  addTemp: () => { },
  seletedCartProds: [],
  selectCartProd: () => { },
  refetchFollowing: () => { },
  refetchSavedItems: () => { },
  agentInfo: {},
  shopNow: false,
  coordinates: {},
  setShopNow: () => { },
}

export const whiteList = [
  'order',
  'checkout',
  'user',
  'chat',
  'earn'
]

const DataContext = createContext(defaultProvider)
const UserDataProvider = ({ children, setOverflow, setConnection }) => {
  const [saveItem, { isLoading: saving }] = useSaveItemMutation()
  const router = useRouter()
  const pathname = usePathname()
  const { coordinates, error } = useGeolocation(10000)
  const [shopNow, setShopNow] = useState(false)
  const [notifications, setNotification] = useState([])
  const [loading, setLoading] = useState(false)
  const [temp, addTemp] = useState({})
  const [overLay, setOpenOverlay] = useState(null)
  const [popMap, setMapPopup] = useState(false)
  useEffect(() => setOverflow(loading), [loading])


  const launchConfetti = () => {
    // Flowers (or hearts, stars) can be added with emojis
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 1,
      decay: 0.94,
      startVelocity: 30,
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 30,
        scalar: 1.5,
        shapes: ["circle"], // can use "square" or custom shapes
        origin: { y: 0 }, // fall from top
      });
    };

    shoot();
    setTimeout(shoot, 200);
    setTimeout(shoot, 400);
  };

  const getPath = pathname.split("/");

  const isOffline = !isAuthenticated()

  useEffect(() => {
    console.log({ getPath }, getPath[1])

    console.log({
      isOffline, page: whiteList.includes(getPath[1])
    })
    if (isOffline && whiteList.includes(getPath[1])) {
      router.replace(`/auth/login?returnurl=${pathname.substring(1)}`)
    }
  }, [getPath, router])

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
  } = useSWR(!isOffline && '/user/get-account')

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

  const { data: agent, agentIsLoading } = useSWR(!isOffline && '/agent')
  const agentData = agent?.data[0] || {}

  const {
    data: notif,
    error: notifErr,
    isLoading: notifIsLoading,
  } = useSWR(!isOffline && '/user/notification')

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
  } = useSWR(!isOffline && '/user/cart')
  //
  // fetch CARTiNFO
  //
  const {
    data: savedData,
    error: savedErr,
    isLoading: savedIsLoading,
    refetch: refetchSavedItems,
  } = useGetSavedItemsQuery();


  // fetch stores you follow
  //
  const {
    data: following,
    error: folErr,
    isLoading: folIsLoading,
    refetch: refetchFollowing,
  } = useGetFollowingStoresQuery()
  return (
    <DataContext.Provider
      value={{
        savedProds: (!savedErr && !savedIsLoading && savedData?.data?.map(e => e?.productId)) || [],
        following: (!folErr && !folIsLoading && following?.data) || [],
        userInfo: (!userErr && !userIsLoading && userInfo?.user) || {},
        agentInfo: !agentIsLoading ? agentData : {},
        notifications,
        selectedAddress: {},
        coordinates,
        loading,
        setOverflow: setOverflow,
        setLoading: setLoading,
        showOverlay: showOverlay,
        showMapScreen: showMapScreen,
        refetchSavedItems,
        refetchFollowing,
        popMap: popMap,
        overLay: overLay,
        isOffline: isOffline,
        shopNow,
        setShopNow,
        launchConfetti,

        temp,
        addTemp,

        saveItem
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
export { UserDataProvider, DataContext }
