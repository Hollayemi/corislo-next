import HomeWrapper from '@/app/components/view/home'
import React from 'react'
import ProductDisplay from '.'
import { server } from '@/app/redux/state/slices/api/baseApi'
import { BasicModal } from '@/app/components/cards/popup'
import Share from '@/app/components/cards/share'

const ProductPage = ({ params, searchParams }) => {
  const share = searchParams.share
  const { store, product } = params
  return (
    <HomeWrapper
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
    </HomeWrapper>
  )
}

export default ProductPage

export async function generateMetadata({ params }) {
  const { product: urlKey } = params
  console.log(urlKey)
  try {
    const response = await fetch(`${server}/products?urlKey=${urlKey}`)
    console.log(response)
    const res = await response.json()
    const product = res?.data.result[0] || {}

    return {
      title: `${product.prodName}`,
      description: product.prodInfo,
      openGraph: {
        title: product.prodName,
        description: product.prodInfo,
        url: `https://corisio.com/${product.store}/${product.urlKey}`,
        images: product.images,
        logo: product.images[0],
        image: product.images[0],
        type: 'website',
        keywords: `${product.store} ${product.prodInfo} ${product.prodName}
                    ${product.branch} ${product?.collectionName} ${product?.subCollectionName} ${product?.group}`,
        logo: 'https://corisio.com/images/logo.png',
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
