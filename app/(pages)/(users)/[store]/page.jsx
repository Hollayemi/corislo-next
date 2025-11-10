import UserWrapper from '@/app/components/view/user'
import { Box } from '@mui/material'
import Image from 'next/image'
import StoreProducts from './products'
import Review from './review'
import Policies from './policies'
import StoreTabs from './tabs'
import FollowStore from './followStore'
import { BasicModal } from '@/app/components/cards/popup'
import dynamic from 'next/dynamic'
const Share = dynamic(() => import('@/app/components/cards/share'), {
  loading: () => <div>Loading...</div>
})

// Server-side data fetching function
async function getStoreData(store, branch, type = 'full') {
  const server = process.env.NODE_ENV === "production"
    ? "https://corislo-backend.onrender.com"
    : "http://localhost:5001"

  try {
    const response = await fetch(
      `${server}/api/v1/branch/info?store=${store}&branch=${branch}&type=${type}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch store data: ${response.status}`)
    }

    const res = await response.json()
    return { data: res?.data || null, error: null }
  } catch (error) {
    console.error('Error fetching store data:', error)
    return { data: null, error: error.message }
  }
}

const BusinessPage = async ({ params, searchParams }) => {
  // Await params and searchParams
  const awaitedParams = await params
  const awaitedSearchParams = await searchParams

  const getStore = awaitedParams?.store?.split('-')

  // Validate store parameters
  if (!getStore || !getStore[0] || !getStore[1]) {
    return <div>Invalid store parameters</div>
  }

  // Fetch store data server-side
  const { data: storeData, error } = await getStoreData(getStore[0], getStore[1])

  console.log({ getStore, storeData })

  const page = {
    0: (
      <StoreProducts
        store={getStore[0]}
        branch={getStore[1]}
        searchParams={awaitedSearchParams}
        storeData={storeData}
      />
    ),
    1: (
      <Review
        store={getStore[0]}
        branch={getStore[1]}
        searchParams={awaitedSearchParams}
        storeData={storeData}
      />
    ),
    2: (
      <Policies
        store={getStore[0]}
        branch={getStore[1]}
        storeData={storeData}
      />
    ),
  }

  if (error) {
    return <div>Error loading data: {error}</div>
  }

  return (
    <UserWrapper
      customersReview={false}
      noFooter
      popup={
        <BasicModal
          openModal={Boolean(awaitedSearchParams?.share)}
          content={<Share message="" shareUrl={`https://corisio.com/${awaitedParams?.store}`} searchParams={awaitedSearchParams} />}
        />
        // <></>
      }
    >
      {/* <Box className="relative">
        <ReactSlickSlider
          hideArrow
          slidesToShow={4}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {storeData?.gallery?.map((item, i) => (
            <Box
              key={i}
              onClick={() => showImage(item)}
              className={`p-1 cursor-pointer`}
            >
              <Image
                src={item}
                alt={`Thumbnail ${i + 1}`}
                width={80}
                height={80}
                className="w-16 h-16 rounded-md object-cover border border-gray-200"
              />
            </Box>
          ))}
        </ReactSlickSlider>
        <Image
          src={storeData?.profile_image || "/images/misc-header.png"}
          alt="header"
          width={1900}
          height={1400}
          className="w-full !h-80"
        />
        <Image
          src={storeData?.profile_image || "/images/misc/shop/1.png"}
          alt="flyer"
          width={400}
          height={400}
          className="w-14 h-14 md:w-36 md:h-36 absolute -bottom-6 left-6 md:-bottom-12 md:left-28 !rounded-full md:-m-8 border border-blue-800 float-right mr-10"
        />
      </Box> */}

      <Box className="flex justify-center sticky top-0">
        <Box className="w-full mt-3 md:mt-0">
          <FollowStore getStore={getStore} storeData={storeData} />
          <Box className="h-full mt-2 flex flex-col md:flex-row relative">
            <Box className="!px-1 md:!px-4 md:w-3/12 mt-10 sticky top-20">
              <Box className="bg-white md:py-4 rounded-md">
                <StoreTabs currTab={awaitedSearchParams?.tab} />
              </Box>
            </Box>
            <Box className="w-full md:w-9/12 relative">
              <Box className="w-full">{page[awaitedSearchParams?.tab || 0]}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </UserWrapper>
  )
}

export default BusinessPage

export async function generateMetadata({ params }) {
  try {
    // Await params first
    const awaitedParams = await params

    // Check if it's a favicon request (common issue)
    if (awaitedParams.store === 'favicon.ico') {
      return {
        title: 'Corisio - Your Shopping Destination',
        description: 'Explore stores on Corisio platform',
      }
    }

    const getStore = awaitedParams.store.split('-')

    // Validate store parameters
    if (!getStore[0] || !getStore[1]) {
      throw new Error('Invalid store parameters')
    }

    console.log('Generating metadata for store:', getStore)

    const { data: branchInfo, error } = await getStoreData(getStore[0], getStore[1], 'meta')

    if (error || !branchInfo) {
      throw new Error(error || 'No store data found')
    }

    console.log('Branch info:', branchInfo)

    return {
      title: branchInfo.businessName || `${getStore[0]} Store`,
      description: branchInfo.about_store || `Explore ${getStore[0]} on Corisio`,
      images: branchInfo.gallery?.length > 0 ? branchInfo.gallery[0] : branchInfo.profile_image ? branchInfo.profile_image : "",
      image: branchInfo.gallery?.length > 0 ? branchInfo.gallery : branchInfo.profile_image ? [branchInfo.profile_image] : [],
      openGraph: {
        title: branchInfo.businessName || `${getStore[0]} Store`,
        description: branchInfo.about_store || `Explore ${getStore[0]} on Corisio`,
        url: `https://corisio.com/${awaitedParams.store}-${awaitedParams.branch}`,
        images: branchInfo.gallery?.length > 0 ? branchInfo.gallery[0] : branchInfo.profile_image ? branchInfo.profile_image : "",
        image: branchInfo.gallery?.length > 0 ? branchInfo.gallery : branchInfo.profile_image ? [branchInfo.profile_image] : [],
        type: 'website',
        type: 'website',
        siteName: 'Corisio',
      },
      keywords: `${getStore[0]} ${branchInfo.businessName || ''} ${branchInfo.address || ''} ${getStore[1]} ${branchInfo?.payment_settings?.account_name || ''}`,
      authors: [{ name: branchInfo.businessName || getStore[0] }],
      creator: branchInfo.businessName || getStore[0],
      publisher: 'Corisio',
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    try {
      const awaitedParams = await params
      const storeName = awaitedParams.store ? awaitedParams.store.split('-')[0] : 'Store'

      return {
        title: `${storeName} | Corisio`,
        description: `Explore ${storeName} on Corisio platform`,
      }
    } catch (fallbackError) {
      return {
        title: 'Corisio - Your Shopping Destination',
        description: 'Explore stores on Corisio platform',
      }
    }
  }
}