'use client'
import useSWR from 'swr'
import { Typography, Box, Select, MenuItem } from '@mui/material'
import dynamic from 'next/dynamic'
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
const StoreLeftSideBar = dynamic(
  () => import('@/app/components/view/store/LeftSideBar'),
  {
    ssr: false,
  }
)
import ProductList from '@/app/components/view/store/tables/productList'
import OverViewCard from './overview'
import { prodInnerList } from '@/app/data/store/innerList'
import {
  BreadcrumbRightEle,
  ExportSetup,
  productBreadCrumb,
} from './components'
import { productListingRows } from './rows'
import { StoreSalesApi } from '@/app/redux/state/slices/shop/overview/sales'
import DialogPop, { BasicModal } from '@/app/components/cards/popup'
import { useState } from 'react'

const ProductManagement = ({ params }) => {
  const { data, error, isLoading } = useSWR('/store/get-products')
  const [openModal, setOpenModal] = useState(false)
  const [dialogInfo, updateDialogInfo] = useState((status) => {
    return {
      open: false,
      title: 'Action Confirmation',
      alert: `Are you sure you want to ${
        status?.toLowerCase()?.split('-')[0]
      } the campaign status to?`,
      acceptFunctionText: 'Yes, Delete',
      acceptFunction: () => {},
    }
  })

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(StoreSalesApi({ time: "1_month" }));
  // }, []);

  console.log(data)
  const path = { ...params, sidebar: 'product-management' }
  return (
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      InnerList={prodInnerList}
      breadCrumbRIghtChildren={<BreadcrumbRightEle setModal={setOpenModal} />}
      crumb={[
        ...productBreadCrumb,
        { text: 'Product listing', link: 'product-management' },
      ]}
      dialogInfo={dialogInfo}
      updateDialogInfo={updateDialogInfo}
      popup={
        <BasicModal
          openModal={Boolean(openModal)}
          toggleModal={() => setOpenModal(false)}
          isLoading={isLoading}
          content={
            openModal === 'export-setup' ? (
              <ExportSetup close={() => setOpenModal(false)} />
            ) : (
              <></>
            )
          }
        />
      }
    >
      <Box className="relative">
        <Box className="mb-10 bg-white rounded-md px-3 py-6">
          <OverViewCard />
        </Box>
        <Box className="bg-white rounded-md px-3 py-6">
          <Box className="bg-white rounded-md mt-4 px-3 pt-6 w-full"></Box>
          <Box className="flex justify-between items-center px-">
            <Typography className="text-xs md:text-md font-bold">
              All Products ({data?.data.length})
            </Typography>
          </Box>
          <Box>
            {data && (
              <ProductList
                rows={data?.data}
                updateDialogInfo={updateDialogInfo}
              />
            )}
          </Box>
        </Box>
      </Box>
    </StoreLeftSideBar>
  )
}

export default ProductManagement
