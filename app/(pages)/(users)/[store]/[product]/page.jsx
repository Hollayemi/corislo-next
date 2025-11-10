import UserWrapper from '@/app/components/view/user'
import React from 'react'
import ProductDisplay from '.'
// import { server } from '@/app/redux/state/slices/api/baseApi'
import { BasicModal } from '@/app/components/cards/popup'
import Share from '@/app/components/cards/share'

const ProductPage = ({ params, searchParams }) => {
  const share = searchParams.share
  const { store, product } = params
  return (
    <UserWrapper
      popup={
        <BasicModal
          openModal={Boolean(share)}
          content={
            <Share
              message=""
              shareUrl={`https://corisio.com/${store}/${product}`}
              searchParams={searchParams}
            />
          }
        />
      }
    >
      <ProductDisplay params={params} searchParams={searchParams} />
    </UserWrapper>
  )
}

export default ProductPage

async function getProductData(urlKey) {
  const server = process.env.NODE_ENV === "production"
    ? "https://corislo-backend.onrender.com"
    : "http://localhost:5001"

  try {
    const response = await fetch(
      `${server}/api/v1/products?urlKey=${urlKey}`,
      {
        next: { revalidate: 3600 },
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

export async function generateMetadata({ params, searchParams }) {
  const awaitedParams = await params
  const awaitedSearchParams = await searchParams

  const getStore = awaitedParams

  console.log({ getStore, awaitedSearchParams })
  
  
  const { product: urlKey } = params
  console.log(urlKey)
  try {
    const { data: productData, error } = await getProductData(urlKey)
    const product = productData?.result?.[0] || {}

    console.log({ product })

    return {
      title: `${product.prodName}`,
      description: product.prodInfo,
      images: product.images,
      image: product.images?.[0],
      openGraph: {
        title: product.prodName,
        description: product.prodInfo,
        url: `https://corisio.com/${product.store}/${product.urlKey}`,
        images: product.images,
        logo: product.images?.[0],
        image: product.images?.[0],
        type: 'website',
        keywords: `${product.store} ${product.prodInfo} ${product.prodName}
                    ${product.branch} ${product?.collectionName} ${product?.subCollectionName} ${product?.group}`,
        logo: product.images?.[0] || 'https://corisio.com/images/logo.png',
      },
      other: {
        canonical: `https://corisio.com/${product.store}/${product.urlKey}`
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
