'use client'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { Typography, Box } from '@mui/material'
import Table from '@/app/components/view/store/tables/OrderTable'
import { listingColumns } from './columns'
import OverViewCard from './overview'

export const AllCustomers = () => {
  const router = useRouter()
  const { data, error, isLoading } = useSWR('/branch/customers')

  const onRowClick = (row) => {
    router.push(`/dashboard/store/customer-management/${row.customerId}`)
  }

  return (
    <Box>
   

      {!error && !isLoading && (
        <>
          <Typography variant="h5" className="!font-bold !text-sm py-6">
            All Customers ({data.data.length})
          </Typography>
          <Table
            columns={listingColumns}
            onRowClick={onRowClick}
            rows={data.data}
          />
        </>
      )}
    </Box>
  )
}
