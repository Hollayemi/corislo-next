import HomeWrapper from '@/app/components/view/home'
import { Box } from '@mui/material'
import Image from 'next/image'
import martApi, { server } from '@/app/redux/state/slices/api/baseApi'
import StoreProducts from './products'
import Review from './review'
import Policies from './policies'
import StoreTabs from './tabs'
import FollowStore from './followStore'
import { BasicModal } from '@/app/components/cards/popup'
import Share from '@/app/components/cards/share'
import Head from 'next/head'
import React from 'react'

// export const metadata = {
//   title:
//     'Corislo-NG | Your One-Stop Ecommerce Hub for Next-Generation Solutions',
//   description:
//     'Your ultimate destination for top-quality products and unparalleled shopping experiences. Explore a captivating assortment of fashion, electronics, home essentials, and more. Immerse yourself in a seamless and secure shopping journey with our user-friendly platform. Indulge your senses, find inspiration, and redefine convenience with every visit. Embrace the joy of discovering something extraordinary as you navigate through our meticulously curated selection. Elevate your online shopping experience with Corislo – where dreams become reality.',
// }

const BusinessPage = ({ params, searchParams, data, error }) => {
  const getStore = params.store.split('-')
  const share = searchParams.share
  // Page content based on tab selection
  const page = {
    0: (
      <StoreProducts
        store={getStore[0]}
        branch={getStore[1]}
        searchParams={searchParams}
      />
    ),
    1: (
      <Review
        store={getStore[0]}
        branch={getStore[1]}
        searchParams={searchParams}
      />
    ),
    2: <Policies store={getStore[0]} branch={getStore[1]} />,
  }

  // Handle possible error gracefully
  if (error) {
    return <div>Error loading data: {error}</div>
  }

  return (
    <React.Fragment>
      <Head>
        <title>Home Page | Your Website Name</title>
        <meta
          name="description"
          content="This is the home page of Your Website."
        />
        <meta name="keywords" content="nextjs, homepage, website" />
      </Head>
      <HomeWrapper
        customersReview={false}
        popup={
          <BasicModal
            openModal={Boolean(share)}
            content={
              <Share
                message=""
                searchParams={searchParams}
              />
            }
          />
        }
      >
        <Box className="relative">
          <Image
            src="/images/misc/biz-header.png"
            alt="header"
            width={1900}
            height={1400}
            className="w-full"
          />
          <Image
            src="/images/misc/shop/1.png"
            alt="flyer"
            width={400}
            height={400}
            className="w-14 h-14 md:w-36 md:h-36 absolute -bottom-6 left-6 md:-bottom-12 md:left-28 !rounded-full md:-m-8 border border-blue-800 float-right mr-10"
          />
        </Box>
        <Box className="flex justify-center sticky top-0">
          <Box className="w-full mt-3 md:mt-0">
            <FollowStore getStore={getStore} />
            <Box className="h-full mt-2 flex flex-col md:flex-row relative">
              <Box className="px-1 md:px-4 md:w-3/12 mt-10 sticky top-20">
                <Box className="bg-white md:py-4 rounded-md">
                  <StoreTabs currTab={searchParams.tab} />
                </Box>
              </Box>
              <Box className="w-full md:w-9/12 relative">
                <Box className="w-full">{page[searchParams.tab || 0]}</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </HomeWrapper>
    </React.Fragment>
  )
}

export default BusinessPage

// export async function getServerSideProps() {
//   console.log('Entering getServerSideProps') // This should log in your terminal

//   try {
//     // Test with a simple fetch to ensure server-side fetching is working
//     const response = await fetch(
//       `http://localhost:5001/api/v1/branch/info?store=mamafeeds&branch=eSlOTN`
//     )

//     if (!response.ok) {
//       throw new Error(`Failed to fetch data: ${response.status}`)
//     }

//     const data = await response.json()
//     console.log('Data fetched successfully:', data) // Logs fetched data in terminal

//     return {
//       props: {
//         data,
//       },
//     }
//   } catch (error) {
//     console.error('Error in getServerSideProps:', error) // Error logging

//     return {
//       props: {
//         data: null,
//         error: 'Failed to fetch data',
//       },
//     }
//   }
// }

export async function generateMetadata({ params }) {
  const getStore = params.store.split('-')
  try {
    const response = await fetch(
      `${server}/branch/info?store=${getStore[0]}&branch=${getStore[1]}&type=meta`
    )

    const res = await response.json()
    const branchInfo = res?.data || {}

    console.log(res, branchInfo, 'branchInfo')

    return {
      title: `${branchInfo.businessName}`,
      description: branchInfo.about_store,
      openGraph: {
        title: branchInfo.businessName,
        description: branchInfo.about_store,
        url: `https://corislo.vercel.app/biz/${branchInfo.store}-${branchInfo.store}`,
        images: branchInfo.gallery,
        logo: branchInfo.profile_image,
        image: branchInfo.profile_image,
        type: 'website',
        keywords: `${getStore} ${branchInfo.businessName} ${branchInfo.address} ${getStore[1]} ${branchInfo?.payment_settings?.account_name}`,
        logo: 'https://corislo.vercel.app/images/logo.png',
        contact_email: branchInfo.email,
        contact_phone: branchInfo.phone,
        location: {
          latitude: branchInfo?.coordinates?.coordinates[0],
          longitude: branchInfo?.coordinates?.coordinates[0],
        },
      },
      other: {
        // canonical: `https://www.example.com/${params.slug}`,
      },
    }
  } catch (error) {
    console.error('Error fetching metadata:', error)
    return {
      title: 'Fallback Title',
      description: 'Fallback description',
    }
  }
}
