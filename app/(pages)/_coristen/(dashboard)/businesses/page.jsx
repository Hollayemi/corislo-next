'use client'
import SuperLeftBar from '@/app/components/view/super/SuperLeftBar'
import { Box, Button, Typography } from '@mui/material'
import Table from '@/app/components/view/store/tables/OrderTable'
import { allCustomers, businessColumns } from '../components/columns'
import StorefrontIcon from '@mui/icons-material/Storefront'
import useSWR from 'swr'
import { useState } from 'react'
import { UserCard } from '../components/users'
import IconifyIcon from '@/app/components/icon'
import CustomAvatar from '@/app/components/avatar'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { activator } from '@/app/redux/state/slices/super/actions'

const SuperDashboard = ({ params }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data, error, isLoading } = useSWR('/super/all-stores')
  const [rightOpen, setRightOpen] = useState(false)
  console.log(data)

  const menuOptions = (row, action) => {
    console.log(row, action)
    if (action === 'edit') {
      router.push(
        `/dashboard/store/product-management/add-new-product?edit=${row.prodId}`
      )
    }
    if (action === 'changeStatus') {
      activator(
        { account: 'business', _id: row._id },
        dispatch,
        '/super/all-stores'
      )
    }
    if (action === 'show') {
      productStatusUpdate({ id: row.prodId, status: 'available' }, dispatch)
    }
    if (action === 'delete-permanently') {
      updateDialogInfo((prev) => {
        return {
          ...prev,
          open: true,
          title: 'Action Confirmation',
          alert: (
            <Typography>
              Are you sure you want to delete <b>{row.productName} </b>
              permanently
            </Typography>
          ),
          acceptFunctionText: 'Yes, Delete',
          acceptFunction: () =>
            productStatusUpdate({ id: row.prodId, deleteProd: true }, dispatch),
        }
      })
    }
  }

  return (
    <SuperLeftBar
      setRightOpen={setRightOpen}
      rightOpen={rightOpen}
      path={{ ...params, sidebar: 'businesses' }}
    >
      <Box>
        <Box className="flex items-center justify-between !px-3 py-3 mb-4">
          <Box className="flex items-start mb-5 md:mb-2">
            <CustomAvatar
              skin="light"
              color={'primary'}
              className="!w-19 md:!w-12 !h-19 md:!h-12 mr-1 md:!mr-3"
            >
              <StorefrontIcon />
            </CustomAvatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" className="!font-black !text-[23px]">
                {data?.data?.length}
              </Typography>
              <Typography
                variant="body2"
                className="!font-bold !text-gray-600 !text-[15px]"
              >
                Local Businesses
              </Typography>
            </Box>
          </Box>
          <Box>
            <Button
              className="w-20 md:w-24 !px-0 !bg-white !text-black !rounded-lg !mr-2 md:!mr-5 !text-[12px] md:!text-[13px]"
              variant="contained"
            >
              Export
            </Button>
            <Button
              className="w-24 md:w-32 !px-0  !text-white !rounded-lg !text-[12px] md:!text-[13px]"
              variant="contained"
              onClick={() => setRightOpen(<></>)}
            >
              Create Store
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className="bg-white shadow-md rounded-lg w-full p-2">
        {!error && !isLoading && (
          <Table
            columns={businessColumns(menuOptions)}
            onRowClick={() => { }}
            rows={data.data}
            size={10}
            tableProps={{ rowHeight: 100 }}
          />
        )}
      </Box>
    </SuperLeftBar>
  )
}

export default SuperDashboard
