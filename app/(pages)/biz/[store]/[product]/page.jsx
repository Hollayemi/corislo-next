import HomeWrapper from '@/app/components/view/home'
import React from 'react'
import ProductDisplay from '.'
import { server } from '@/app/redux/state/slices/api/baseApi'

const ProductPage = ({ params, searchParams }) => {
  return (
    <HomeWrapper>
      <ProductDisplay params={params} searchParams={searchParams} />
    </HomeWrapper>
  )
}

export default ProductPage

export async function generateMetadata({ params }) {
  const { product: prodNameParam } = params
  console.log(prodNameParam)
  try {
    const response = await fetch(
      `${server}/products?prodName=${prodNameParam.split('%2B').join(' ')}`
    )

    const res = await response.json()
    const product = res?.data.result[0] || {}

    return {
      title: `${product.prodName}`,
      description: product.prodInfo,
      openGraph: {
        title: product.prodName,
        description: product.prodInfo,
        url: `https://corisio.com/biz/${product.store}-${product.store}/${product.prodName}`,
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
