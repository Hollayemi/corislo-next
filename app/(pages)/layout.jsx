'use client'
import ThemeComponent from '@/theme'
import persistStore from 'redux-persist/es/persistStore'
import { store } from '@/app/redux/state/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { SWRConfig } from 'swr'
import martApi from '@/app/redux/state/slices/api/baseApi'
import { jsonHeader } from '../redux/state/slices/api/setAuthHeaders'
// ** Third Party Import
import { Toaster } from 'react-hot-toast'
import ReactHotToast from '@/app/styles/react-hot-toast'
import { UserDataProvider } from '../context/userContext'
import handleSubscribeToNotification from '../redux/state/slices/api/webpush'
import { useEffect, useState } from 'react'
import LineLoading from './loading'
import '@/styles/globals.css'
import { osName } from 'react-device-detect'

import { usePathname } from 'next/navigation'
import {
  onMessageListener,
  requestNotificationPermission,
} from '../configs/firebase'

// export const metadata = {
//   title:
//     'Corislo-NG | Your One-Stop Ecommerce Hub for Next-Generation Solutions',
//   description:
//     'Your ultimate destination for top-quality products and unparalleled shopping experiences. Explore a captivating assortment of fashion, electronics, home essentials, and more. Immerse yourself in a seamless and secure shopping journey with our user-friendly platform. Indulge your senses, find inspiration, and redefine convenience with every visit. Embrace the joy of discovering something extraordinary as you navigate through our meticulously curated selection. Elevate your online shopping experience with Corislo – where dreams become reality.',
// }

const persistor = persistStore(store)

// ** Pace Loader
export default function RootLayout({ children }) {
  const [connection, setConnection] = useState([])
  const [hideOverflow, setOverflow] = useState(false)
  const pathname = usePathname()

  const forAdmins = ['/dashboard', '/coristen']
  const pathArr = pathname.split('/')
  const adminPaths = forAdmins.some((path) => pathname.startsWith(path))

  
  useEffect(() => {
    requestNotificationPermission()
  }, [])

  onMessageListener()
    .then((payload) => {
      console.log('Message received: ', payload)
      // Show custom UI for notifications
    })
    .catch((err) => console.log('Failed to receive message: ', err))

  useEffect(() => {
    if ('serviceWorker' in navigator && connection && !adminPaths) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          if (!connection.includes(osName))
            handleSubscribeToNotification(connection)
          // console.log("Service Worker registered: ", registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })
    }
  }, [connection, adminPaths])

  const logos = {
    dashboard: 'main_store.png',
    coristen: 'main1.jpg',
  }

  const icon = logos[pathArr[1]] || 'main.jpg'
  return (
    <html lang="en">
      <head>
        <meta property="og:site_name" content="Corisio Nigeria" />
        <meta property="og:type" content="product" />
        <meta property="og:locale" content="en_NG" />
        <meta name="application-name" content="Corisio" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`/images/logo/icon/${icon}`}
        />
        <link rel="shortcut icon" href={`/images/logo/icon/${icon}`} />
        <link rel="icon" href={`/images/logo/icon/${icon}`} />
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content=" Your ultimate destination for top-quality products and unparalleled shopping experiences. Explore a captivating assortment of fashion, electronics, home essentials, and more. Immerse yourself in a seamless and secure shopping journey with our user-friendly platform. Indulge your senses, find inspiration, and redefine convenience with every visit. Embrace the joy of discovering something extraordinary as you navigate through our meticulously curated selection. Elevate your online shopping experience with Corislo – where dreams become reality."
        />
        <meta
          name="keywords"
          content="HTML, CSS, JavaScriptOnline Shopping, Fashion, Electronics, Home Essentials, Quality Products, User-Friendly Platform, Secure Shopping, Curated Selection, Convenience, Seamless Experience, Trendy, High-Quality, Best Deals, Affordable Prices, Customer Satisfaction, Fast Delivery, Gift Ideas, Gadgets, Accessories, New Arrivals, Business Showcase, Store Registration, Business Promotion, Shop Owners, Local Businesses, Empowering Entrepreneurs, Shop Local, Online Marketplace, Small Businesses, Showcasing Talent, Shopkeepers, Independent Retailers, Supporting Local Economy, Discover Unique Businesses, Connecting Buyers and Sellers."
        />
        <meta name="author" content="Corislo - stephanyemmitty" />
        {/* Open Graph */}
        <meta
          property="og:title"
          content="Corislo-NG | Your Hub for Next-Generation Solutions"
        />
        <meta
          property="og:description"
          content="Your ultimate destination for top-quality products and unparalleled shopping experiences. Explore a captivating assortment of fashion, electronics, home essentials, and more. Immerse yourself in a seamless and secure shopping journey with our user-friendly platform. Indulge your senses, find inspiration, and redefine convenience with every visit. Embrace the joy of discovering something extraordinary as you navigate through our meticulously curated selection. Elevate your online shopping experience with Corislo – where dreams become reality."
        />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/xmart/image/upload/v1722210044/corisio/email/front_c5s5ps.png`}
        />
        <meta property="og:url" content="https:corislo.vercel.app" />
        <meta property="og:type" content="product" />
      </head>

      {!adminPaths ? (
        <body className={`${hideOverflow && '!overflow-hidden'}`}>
          <SWRConfig
            value={{
              refreshInterval: false,
              revalidateOnFocus: true,

              fetcher: async (resource, init) => {
                let url = resource

                if (resource[0] !== '/') {
                  const currentSearchParams = new URLSearchParams(resource[0])
                  currentSearchParams.set('lat', resource[1])
                  currentSearchParams.set('lng', resource[2])
                  url = currentSearchParams
                    ?.toString()
                    ?.replaceAll('%2F', '/')
                    ?.replaceAll('%3F', '?')
                }

                const getToken = jsonHeader('user')
                const res = await martApi.get(url, getToken)
                return res.data
              },
            }}
          >
            {/* <NextProgress /> */}
            <Provider store={store}>
              <UserDataProvider
                setOverflow={setOverflow}
                setConnection={setConnection}
              >
                <LineLoading />
                <PersistGate loading={null} persistor={persistor}>
                  <ThemeComponent>
                    {children}
                    <ReactHotToast>
                      <Toaster
                        position="top-right"
                        containerStyle={{
                          zIndex: 10000, // Ensure the container itself has a high z-index
                        }}
                        toastOptions={{
                          className: 'react-hot-toast !z-[10000000000]',
                          style: {
                            zIndex: 10000000000, // Set the z-index for the toast container
                          },
                        }}
                      />
                    </ReactHotToast>
                  </ThemeComponent>
                </PersistGate>
              </UserDataProvider>
            </Provider>
          </SWRConfig>
        </body>
      ) : (
        <body>
          <ThemeComponent>
            {children}
            <ReactHotToast>
              <Toaster
                position="top-right"
                containerStyle={{
                  zIndex: 10000, // Ensure the container itself has a high z-index
                }}
                toastOptions={{
                  className: 'react-hot-toast !z-[10000000000]',
                  style: {
                    zIndex: 10000000000, // Set the z-index for the toast container
                  },
                }}
              />
            </ReactHotToast>
          </ThemeComponent>
        </body>
      )}
      {/* <VoiceflowChatComponent /> */}
    </html>
  )
}
