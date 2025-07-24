'use client'
import dynamic from 'next/dynamic'
import { StoreDataProvider } from "@/app/context/storeContext";
import { Box } from '@mui/material'
import { SWRConfig } from 'swr'
import { jsonHeader } from '@/app/redux/state/slices/api/setAuthHeaders'
import martApi from '@/app/redux/state/slices/api/baseApi'
import { store } from '@/app/redux/state/store'
import { Provider } from 'react-redux'
import { useEffect, useState } from 'react';
import handleSubscribeToNotification from '@/app/redux/state/slices/api/webpush';

import { osName } from 'react-device-detect'

// export const metadata = {
//   title: "Store - corislo",
//   description: "Showcase your store now",
// };

export default function MyStoreDashboardLayout({ children }) {
   const [connection, setConnection] = useState([])
  useEffect(() => {
    if ('serviceWorker' in navigator && connection) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          if (!connection.includes(osName))
            handleSubscribeToNotification(connection, "store")
          // console.log("Service Worker registered: ", registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })
    }
  }, [connection])
  return (
    <SWRConfig
      value={{
        refreshInterval: false,
        revalidateOnFocus: false,

        fetcher: async (resource, init) => {
          const getToken = jsonHeader('store')
          const res = await martApi.get(resource, getToken)
          return res.data
        },
      }}
    >
      <Provider store={store}>
        <StoreDataProvider setConnection={setConnection}>
          <Box
            className="h-full !w-full absolute min-h-scren !overflow-x-hidden"
            bgcolor="custom.bodyGray"
          >
            {children}
          </Box>
        </StoreDataProvider>
      </Provider>
    </SWRConfig>
  )
}
