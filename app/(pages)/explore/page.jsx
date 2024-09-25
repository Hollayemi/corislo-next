'use client'
import IconifyIcon from '@/app/components/icon'
import OptionsMenu from '@/app/components/option-menu'
import { ProductOnShowcase } from '@/app/components/templates/productTemplates'
import ReactSlickSlider from '@/app/components/wrapper/react-slick'
import { mySubstring } from '@/app/utils/format'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import useSWR from 'swr'
import { reshapePrice } from '../store/dashboard/marketing/components'
import { CircleLoader } from '@/app/components/cards/loader'
import useSWRWithCoordinates from '@/app/hooks/fetchWithCoordinates'
import { MagnifyingGlass } from 'react-loader-spinner'
import MyPagination from '@/app/components/templates/pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import HomeWrapper from '@/app/components/view/home'

const SearchPage = () => {
  const [triggerSearch, setTriggerSearch] = useState('')
  const [search, setSearch] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentSearchParams = new URLSearchParams(searchParams)

  const {
    data: prods,
    isLoading,
    status: prodsStatus,
    isset,
  } = useSWRWithCoordinates(
    `/products?limit=30&${currentSearchParams.toString()}`
  )
  const products = prods ? prods.data : null
  const toRemove = ['₦', 'star', 'stars', ',']
  const [filterBy, editFilter] = useState({
    category: '',
    price: '',
    star: '',
    location: '',
    size: '',
    discount: '',
    shipping_method: '',
  })

  const searchClick = () => {
    currentSearchParams.set('search', search)
    let sanitizedParams = currentSearchParams.toString()
    toRemove.forEach((item) => {
      sanitizedParams = sanitizedParams.replaceAll(item, '')
    })
    router.push(`?${sanitizedParams}`)
  }
  const applyFilter = () => {
    const values = Object.values(filterBy)
    const keys = Object.keys(filterBy)
    values.map((x, i) => {
      if (x && x !== 'Any') {
        let sanitizedParams = x.toString()
        console.log(sanitizedParams)
        toRemove.forEach((item) => {
          sanitizedParams = sanitizedParams?.replaceAll(item, '')
        })
        currentSearchParams.set(keys[i], sanitizedParams)
      }
    })
    router.push(`?${currentSearchParams.toString()}`)
  }

  const generatePriceRange = (lowest = 0, highest = 0) => {
    let step
    switch (true) {
      case highest <= 1000:
        step = 100
        break
      case highest <= 5000:
        step = 500
        break
      case highest <= 10000:
        step = 1500
        break
      case highest <= 30000:
        step = 5000
        break
      case highest <= 50000:
        step = 8000
      case highest >= 50001:
        step = 10000
        break
      default:
        step = 100
        break
    }

    const range = []
    let curr = 0
    for (let price = lowest; price <= highest; price += step) {
      if (curr !== 0)
        range.push(
          `${reshapePrice(curr)} to ${reshapePrice(
            price + step > highest ? highest : price
          )}`
        )
      curr = price
    }
    return range
  }

  const FilterOptions = ({ name, options }) => {
    const filterName = name.replace(' ', '_').toLowerCase()
    const handleFilterChange = (option) => {
      console.log(option)
      if (!option) {
        currentSearchParams.delete(filterName)
        router.push(`?${currentSearchParams.toString()}`)
      }
      editFilter((prev) => {
        return { ...prev, [filterName]: option }
      })
    }
    let myOptions = options
    filterBy[filterName] &&
      (myOptions = [
        {
          rest: '',
          component: (
            <Box className="!h-8 !w-full !py-0 flex items-center text-[12px] !text-red-500">
              <IconifyIcon icon="tabler:x" className="mr-3 ml-2 !text-[14px]" />
              Clear
            </Box>
          ),
        },
        ...myOptions,
      ])
    return (
      <OptionsMenu
        icon={
          <Box className="!text-xs !rounded-full !text-black bg-white px-4 m-1 py-1 flex items-center">
            <Typography variant="caption" className="">
              {mySubstring(
                filterBy[filterName].toString() || name.toString(),
                15
              )}
            </Typography>
            <IconifyIcon icon="tabler:chevron-down" className="ml-5" />
            {/* <IconifyIcon icon="tabler:chevron-up" className="ml-5" /> */}
          </Box>
        }
        options={myOptions}
        setOption={handleFilterChange}
        iconButtonProps={{
          size: 'small',
          sx: { color: 'text.disabled', cursor: 'pointer' },
        }}
        itemsClassName="!bg-transparent hover:!bg-gray-50"
      />
    )
  }
  const sliders = [
    'flyer2',
    'search-rec',
    'default-map',
    'who-is-waiting',
    'shadow1',
    'shadow1',
  ]
  let flattenedSizes = products?.size?.flat() || []
  let sizesArr = [...new Set(flattenedSizes)]
  return (
    <HomeWrapper>
      <Box className="relative -mt-3">
        <ReactSlickSlider config={3}>
          {sliders.map((img, i) => (
            <div
              key={i}
              className="relative w-full h-24 md:h-44 bg-no-repeat bg-cover bg-left-top outline-none"
            >
              <Image
                src={`/images/misc/${img}.png`}
                alt="bg"
                layout="fill"
                objectFit="cover"
                // className="!w-full !min-w-full h-24 md:h-44"
              />
            </div>
          ))}
        </ReactSlickSlider>
        <Box className="absolute -bottom-5 left-0 w-full flex justify-center z-50">
          <Box className="w-2/5 min-w-[370px] relative !overflow-hidden shadow-md rounded-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  searchClick()
                }
              }}
              className="h-12 w-full rounded-full pl-12 pr-16 focus outline-none border-blue-800 focus:border"
            />
            <IconifyIcon
              icon="tabler:search"
              className="absolute top-[14px] left-4"
            />
            <Button
              variant="text"
              onClick={() => searchClick()}
              className="!absolute top-[0px] !w-28 !rounded-r-full !h-12 -right-2 !border-l"
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>
      {isLoading ? (
        <Box className="flex flex-col items-center justify-center my-12 mt-20">
          {isset ? (
            <CircleLoader />
          ) : (
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{}}
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          )}
          <Typography className="!mt-3">{prodsStatus}</Typography>
        </Box>
      ) : products ? (
        <>
          <Box className="relative mt-10 w-full flex flex-wrap justify-center items-center px-3 cursor-pointer">
            <Box
              onClick={() =>
                editFilter({
                  category: '',
                  price: '',
                  star: '',
                  location: '',
                  size: '',
                  discount: '',
                  shipping_method: '',
                })
              }
            >
              <Typography
                variant="body2"
                className="!text-black !text-[12px] !mr-4"
              >
                Reset Filter:
              </Typography>
            </Box>
            <FilterOptions
              name="Category"
              options={products?.category || [' ']}
            />
            {products?.price && (
              <FilterOptions
                name="Price"
                options={[
                  'Any',
                  ...generatePriceRange(
                    Math.min(...products.price),
                    Math.max(...products.price)
                  ),
                ]}
              />
            )}
            <FilterOptions
              name="Star"
              options={[
                'Any',
                '1 star',
                '2 stars',
                '3 stars',
                '4 stars',
                '5 stars',
              ]}
            />
            {/* <FilterOptions
              name="Location"
              options={[
                'Nearby',
                'Within your street',
                'Within your city',
                'Within your state',
                'Nationwide',
              ]}
            /> */}
            {products?.size?.length ? (
              <FilterOptions name="Size" options={sizesArr} />
            ) : null}
            {products?.discount?.length ? (
              <FilterOptions
                name="Discount"
                options={products?.discount || ['']}
              />
            ) : null}
            <FilterOptions
              name="Shipping Method"
              options={['Pickup', 'Waybilling']}
            />

            <Button
              onClick={() => applyFilter()}
              variant="contained"
              className=" !text-[12px] !ml-2 !shadow-none"
              bgcolor="custom.sec"
            >
              Apply
            </Button>
          </Box>

          <Box className="px-2 md:px-8">
            <Box className="!mt-6 flex flex-wrap justify-center">
              {products &&
                products?.result?.map((prod, i) => (
                  <ProductOnShowcase
                    key={i}
                    prodName={prod.prodName}
                    prodPrice={prod.prodPrice}
                    image={`/images/more/${i + 1}.png`}
                    star={prod.star}
                    store={prod.store}
                    branch={prod.branch}
                    others={{ ...prod }}
                  />
                ))}
            </Box>
            <Box className="flex justify-center mt-6 md:mt-12">
              <MyPagination
                currentPage={searchParams.get('p') || 1}
                searchParams={searchParams}
                limit={20}
                query="p"
                totalNumber={products?.totalNumber}
              />
            </Box>
          </Box>
        </>
      ) : (
        <Box className="h-60 flex items-center justify-center">
          <Box className="w-80 h-24 border border-dashed rounded flex items-center justify-center">
            <Typography>No Item Found</Typography>
          </Box>
        </Box>
      )}
    </HomeWrapper>
  )
}

export default SearchPage
