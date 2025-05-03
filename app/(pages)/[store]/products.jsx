'use client'
import React, { Fragment } from 'react'
import CountdownTimer from '@/app/components/cards/newCountDown'
import { SectionTitle } from '@/app/components/cards/homeCards'
import { Box, Typography } from '@mui/material'
import { ProductOnShowcase } from '@/app/components/templates/productTemplates'
import useSWR from 'swr'
import MyPagination from '@/app/components/templates/pagination'

const StoreProducts = ({ store, branch, searchParams }) => {
  const { data, isLoading } = useSWR(
    `/store/products-campaign?store=${store}&branch=${branch}&type=discounted&page=${
      searchParams?.dp || 1
    }`
  )
  const result = data ? data.data : {}

  const { data: myProduct, isLoading: otherLoading } = useSWR(
    `/store/products-campaign?store=${store}&branch=${branch}&page=${
      searchParams?.p || 1
    }`
  )
  const myProducts = myProduct ? myProduct.data : {}

  return (
    <Box className="!bg-white rounded-xl px-3 py-5 mt-10">
      {/* 
            f
            f
            */}
      {/* FLash Sale */}
      {result?.flashsales?.length > 0 ? (
        <Box
          className="w-full flex items-center justify-between h-12 rounded-md px-3 md:px-6 mt-4"
          bgcolor="custom.sec"
        >
          <Typography
            variant="body2"
            className="!text-s !font-bold"
            color="white"
          >
            Flash Sales Items
          </Typography>

          <CountdownTimer
            initialDate={new Date()}
            endDate={result.flashsales[0].endDate}
            className="!text-md !text-white"
            styleCaption="!text-[11px] !text-white"
          />
        </Box>
      ) : null}

      <Box className="!mt-6 flex flex-wrap justify-center">
        {result?.products?.all?.map((prod, i) => (
          <ProductOnShowcase
            key={i}
            prodName={prod.prodName}
            prodPrice={prod.prodPrice}
            image={`/images/more/${i + 1}.png`}
            star={prod.star}
            store={prod.store}
            others={{ ...prod }}
          />
        ))}
      </Box>
      <Box className="flex justify-center mt-6">
        <MyPagination
          searchParams={searchParams}
          currentPage={searchParams?.dp || 1}
          totalNumber={result?.products?.sum || 0}
          limit={8}
          query="dp"
        />
      </Box>
      <Box className="px-2 md:px-10 my-4"></Box>
      <Box>
        <br />
        <SectionTitle black="Picked" blue="for you" />
        <br />
        <Box className="!mt-6 flex flex-wrap justify-center">
          {myProducts?.all?.map((prod, i) => (
            <ProductOnShowcase
              key={i}
              prodName={prod.prodName}
              prodPrice={prod.prodPrice}
              image={`/images/more/${i + 1}.png`}
              star={prod.star}
              store={prod.store}
              others={prod}
            />
          ))}
        </Box>

        <Box className="flex justify-center mt-6">
          <MyPagination
            searchParams={searchParams}
            currentPage={searchParams?.dp || 1}
            totalNumber={myProducts?.sum || 0}
            limit={8}
            query="p"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default StoreProducts
