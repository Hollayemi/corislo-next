'use client'
import IconifyIcon from '@/app/components/icon'
import OptionsMenu from '@/app/components/option-menu'
import HomeWrapper from '@/app/components/view/home'
import { removeOrAddToArray } from '@/app/utils/arrayFunctions'
import { mySubstring } from '@/app/utils/format'
import { CheckBox } from '@mui/icons-material'
import Image from 'next/image'
import { useState } from 'react'
import useSWR from 'swr'
import { reshapePrice } from '../../dashboard/store/marketing/components'
import { ProductOnShowcase } from '@/app/components/templates/productTemplates'
import { CircleLoader } from '@/app/components/cards/loader'
import useSWRWithCoordinates from '@/app/hooks/fetchWithCoordinates'
import { useRouter } from 'next/navigation'
const {
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
} = require('@mui/material')

const CategoryPage = ({ params }) => {
  const theCategory = params.category
  const router = useRouter()
  const { data: getCategory } = useSWR(
    `/corisio/all-categories?id=${theCategory}`
  )
  const category = getCategory?.data || {}
  const [group, setGroup] = useState([])
  const { data: getData, error } = useSWR(
    `/corisio/all-sub-categories?category=${theCategory}`
  )
  const subs = getData?.data || []

  const {
    data: prods,
    isLoading: prodsLoading,
    status: prodsStatus,
    lat,
    lng,
  } = useSWRWithCoordinates(
    `/products?limit=30&category=${theCategory}&prodGroup=${group.join('-')}`
  )

  const products = prods ? prods.data : []

  console.log(products)

  const FilterOptions = ({ name, id }) => {
    const { data: getGroups, error } = useSWR(
      `/corisio/product-groups?category=${theCategory}&sub=${id}`
    )
    const options = getGroups?.data || []

    const handleFilterChange = (option) => {
      removeOrAddToArray(option, group, setGroup)
    }
    let myOptions = options.map((each) => ({
      rest: each.label,
      component: (
        <FormControlLabel
          value={each._id}
          className="h-6"
          control={
            <Checkbox
              size="small"
              checked={group?.includes(each._id)}
              onChange={() => removeOrAddToArray(each._id, group, setGroup)}
              disabled={false}
            />
          }
          label={each.label}
          labelPlacement="end"
        />
      ),
    }))

    return (
      <OptionsMenu
        icon={
          <Box className="!text-xs !rounded-full !text-black bg-white cursor-pointer !w-fit px-4 m-1 py-1 flex items-center">
            <Typography variant="caption" className="">
              {mySubstring(name.toString(), 15)}
            </Typography>
            <IconifyIcon icon="tabler:chevron-down" className="ml-5" />
            {/* <IconifyIcon icon="tabler:chevron-up" className="ml-5" /> */}
          </Box>
        }
        options={myOptions}
        setOption={() => {}}
        iconButtonProps={{
          size: 'small',
          sx: { color: 'text.disabled', cursor: 'pointer' },
        }}
        itemsClassName="!bg-transparent hover:!bg-gray-50"
      />
    )
  }
  return (
    <HomeWrapper className=" px-2 md:px-8">
      <Box className="bg-pink-100 h-52 w-full p-8 rounded-xl flex justify-between md:justify-evenly items-center">
        <Box className="w-3/5 md:w-2/5">
          <Typography
            variant="body2"
            className="!font-black !text-black !text-[15px] sm:!text-xl md:!text-3xl"
          >
            Get Huge Discount (Upto 50%) Off On items on {category?.label}
          </Typography>

          <Button
            className="!shadow-none w-36 !h-10 md:!h-11 md:!mt-6 !mt-6 !px-0 !bg-green-800 !text-white !rounded-full"
            variant="contained"
            onClick={() => router.push('/explore')}
          >
            Browse More
          </Button>
        </Box>
        <Image
          src={category?.icon || '/images/misc/store-picker.png'}
          alt="picker-img"
          className=" w-3/5 md:w-60 max-w-44"
          width={400}
          height={400}
        />
      </Box>

      <Box className="flex items-start mt-3 flex-wrap">
        {subs.map((each, i) => (
          <FilterOptions key={i} name={each.label} id={each._id} />
        ))}
      </Box>

      <Box>
        <Box className="!mt-6 flex flex-wrap justify-center">
          {!prodsLoading ? (
            products?.result?.map((prod, i) => (
              <ProductOnShowcase
                key={i}
                prodName={prod.prodName}
                prodPrice={prod.prodPrice}
                // image={`/images/more/${i + 1}.png`}
                image={prod?.images[0]?.image || prod?.images[0]}
                star={prod.star}
                store={prod.store}
                branch={prod.branch}
                others={{ ...prod }}
              />
            ))
          ) : (
            <Box className="flex flex-col items-center justify-center my-6">
              <CircleLoader />
              <Typography className="!mt-3">{prodsStatus}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </HomeWrapper>
  )
}

export default CategoryPage

// const ProdView = () => {
//   return (
//     <Box className="w-48">
//       <Image
//         src="/images/more/4.png"
//         alt="prod"
//         width={500}
//         height={500}
//         className="w-40 h-44"
//       />
//       <Box className="mt-1 flex items-center justify-between">
//         <Typography
//           variant="body2"
//           noWrap
//           className="!font-bold !text-[15px] !pr-4 !font-sans !w-4/6"
//         >
//           Product name will be here for view
//         </Typography>
//         <Typography
//           variant="body2"
//           noWrap
//           className="!font-bold !text-[12px] !font-sans !w-2/6"
//         >
//           {reshapePrice(4000)}
//         </Typography>
//       </Box>
//     </Box>
//   )
// }
