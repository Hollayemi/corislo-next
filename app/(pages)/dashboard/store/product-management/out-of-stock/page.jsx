'use client'
import { useState } from 'react'
import { prodInnerList } from '@/app/data/store/innerList'
import dynamic from 'next/dynamic'
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
)
import { Box, Button, TextField, Typography } from '@mui/material'
import ProductList from '@/app/components/view/store/tables/productList'
import useSWR from 'swr'
import Image from 'next/image'
import { GridLayout } from '../add-new-category/components'
import { productStatusUpdate } from '@/app/redux/state/slices/shop/products/updateProduct'
import { useDispatch } from 'react-redux'

const OutOfStock = ({ params }) => {
  const { data, error, isLoading } = useSWR(
    '/store/get-products?outofstock=true'
  )
  const [dialogInfo, updateDialogInfo] = useState((status) => {
    return {
      open: false,
      title: 'Update Stock',
      // acceptFunctionText: 'Yes, Delete',
      // acceptFunction: () => {},
    }
  })

  const path = {
    ...params,
    sidebar: 'product-management',
    sublist: 'out-of-stock',
  }

  return (
    <StoreLeftSideBar
      path={path}
      subListBar={true}
      InnerList={prodInnerList}
      dialogInfo={dialogInfo}
      updateDialogInfo={updateDialogInfo}
    >
      <Box className="bg-white rounded-md px-3 md:px-5 pt-6 pb-8 w-full grow">
        <Box>
          {data && (
            <ProductList
              rows={data?.data}
              updateDialogInfo={updateDialogInfo}
              outofstock
            />
          )}
        </Box>
      </Box>
    </StoreLeftSideBar>
  )
}

export default OutOfStock

export const UpdateStock = ({ row }) => {
  const [newStock, setNewStock] = useState(1)
  const dispatch = useDispatch()
  return (
    <Box>
      <Box className="flex flex-col items-center">
        <Image src="/images/more/1.png" alt="img" width={150} height={150} />
        <Box className="w-full mt-4">
          <GridLayout
            alignStart
            className="mb-2.5"
            title="Product name"
            comp={<Typography>{row.productName}</Typography>}
          />
          <GridLayout
            alignStart
            className="mb-2.5"
            title="Collection"
            comp={<Typography>{row.collectionName}</Typography>}
          />
          <GridLayout
            alignStart
            className="mb-2.5"
            title="Current stock"
            comp={<Typography>{row.totInStock}</Typography>}
          />
          <GridLayout
            alignStart
            className="mb-2.5"
            title="New stock"
            comp={
              <TextField
                className="w-5/6 bg-gray-50"
                onChange={(e) => setNewStock(e.target.value)}
                value={newStock}
                type="number"
                fullWidth
                id="outlined-basic"
                inputProps={{ className: '!h-2' }}
                placeholder="New Stock"
              />
            }
          />

          <GridLayout
            alignStart
            className="mb-2.5"
            title="Update stock to"
            comp={
              <Typography>
                {parseInt(row.totInStock || 0) + parseInt(newStock)}
              </Typography>
            }
          />
          <GridLayout
            alignStart
            className="mb-4.5"
            comp={
              <Button
                variant="contained"
                className="!shadow-none !w-full"
                onClick={() => {
                  productStatusUpdate(
                    {
                      id: row.prodId,
                      totInStock: newStock + parseInt(row.totInStock || 0),
                    },
                    dispatch,
                    '/store/get-products?outofstock=true'
                  )
                  setNewStock(1)
                }}
              >
                Update Stock
              </Button>
            }
          />
        </Box>
      </Box>
    </Box>
  )
}
