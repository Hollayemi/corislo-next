"use client"
import { Box, Button } from '@mui/material'
import Icon from '@/app/components/icon'
import { useRouter } from 'next/navigation'
import { DashboardCrumb } from '../components'

export const BreadcrumbRightEle = () => {
  const router = useRouter()
  return (
    <Box className="flex items-center -mr-2 md:mr-0">
      <Button
        variant="contained"
        className="!mr-1 md:!mr-4 !bg-blue-900 !shadow-none !text-[12px] !rounded-full"
        startIcon={<Icon icon="tabler:plus" />}
        onClick={() =>
          router.push('/dashboard/store/product-management/add-new-product')
        }
      >
        <span className="hidden md:block mr-1">Add New </span>Product
      </Button>

      <Button
        variant="contained"
        className="!bg-black !shadow-none !text-[12px] !rounded-full"
        startIcon={<Icon icon="tabler:download" />}
      >
        <span className="hidden md:block mr-1">Export as </span> CSV
      </Button>
    </Box>
  )
}

export const productBreadCrumb = [
  ...DashboardCrumb,
  {
    text: 'Product',
    link: 'product-management',
    icon: 'shop',
  },
]
