'use client'
import dynamic from 'next/dynamic'
import { StoreDataProvider } from "@/app/context/storeContext";
import { Box } from '@mui/material'
import { SWRConfig } from 'swr'
import { jsonHeader } from '@/app/redux/state/slices/api/setAuthHeaders'
import martApi from '@/app/redux/state/slices/api/baseApi'
import { store } from '@/app/redux/business/store'
import { Provider } from 'react-redux'
import { useEffect, useState } from 'react';
import handleSubscribeToNotification from '@/app/redux/state/slices/api/webpush';
import '../../globals.css'
import '../../../styles/index.css'
import { osName } from 'react-device-detect'
import ReactHotToast from '@/styles/react-hot-toast';
import ThemeComponent from '@/theme';
import { Toaster } from 'react-hot-toast';
import { ChatDataProvider } from '@/app/hooks/useChatContext';
import { server } from '@/app/redux/business/api/axiosBaseQuery';

// export const metadata = {
//   title: "Store - corislo",
//   description: "Showcase your store now",
// };

const icon = "main_store.png"

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
    <html lang="en">
      <head>
        <meta property="og:site_name" content="Corisio Nigeria" />
        <meta property="og:type" content="product" />
        <meta property="og:locale" content="en_NG" />
        <meta name="application-name" content="Corisio" />
        <title>Corisio-NG</title>
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
        <meta property="og:url" content="https:corisio.com" />
        <meta property="og:type" content="product" />

        {/* <script
        defer
        src="https://session-witness-backend.onrender.com/api/v1/websites/p2pBtqBHWLFZBYtyXOaA/session-witness.js"
      ></script> */}
      </head>
      <body>
        <ThemeComponent>
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
                <ChatDataProvider server={server} role="store">
                  <Box
                    className="h-full !w-full absolute min-h-scren !overflow-x-hidden"
                    bgcolor="custom.bodyGray"
                  >
                    {children}
                  </Box>
                </ChatDataProvider>
              </StoreDataProvider>
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
            </Provider>
          </SWRConfig>
        </ThemeComponent>
      </body>
    </html>
  )
}
