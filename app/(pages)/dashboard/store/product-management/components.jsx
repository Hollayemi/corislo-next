'use client'
import { Box, Button, MenuItem, Typography } from '@mui/material'
import Icon from '@/app/components/icon'
import { useRouter } from 'next/navigation'
import { DashboardCrumb } from '../components'
import { exportAllProductsHandler } from '@/app/redux/state/slices/shop/products/bulkUpload'
import { useDispatch } from 'react-redux'
import { useStoreData } from '@/app/hooks/useData'
import { SimpleDropDown } from './add-new-product/components'
import useSWR from 'swr'
import IconifyIcon from '@/app/components/icon'
import { useState } from 'react'

export const productBreadCrumb = [
  ...DashboardCrumb,
  {
    text: 'Product',
    link: 'product-management',
    icon: 'shop',
  },
]

export const BreadcrumbRightEle = ({ setModal }) => {
  const router = useRouter()
  const {
    storeInfo: { business },
  } = useStoreData()

  const exportName = `corisio_exports_${business?.store}-products`

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
        // onClick={() => exportAllProductsHandler(exportName, {}, dispatch)}
        onClick={() => setModal('export-setup')}
        className="!bg-black !shadow-none !text-[12px] !rounded-full"
        startIcon={<Icon icon="tabler:download" />}
      >
        <span className="hidden md:block mr-1">Export as </span> CSV
      </Button>
    </Box>
  )
}

export const ExportSetup = ({ close }) => {
  const {
    storeInfo: { business },
  } = useStoreData()
  const dispatch = useDispatch()
  const exportName = `corisio_exports_${business?.store}-products`
  const { data, error, isLoading } = useSWR('/store/filled-categories')
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    productGroup: '',
  })
  const handleChange = (prop) => (event) => {
    setFormData((prev) => ({ ...prev, [prop]: event.target.value }))
  }

  const categories = data?.data || []
  console.log(categories, 'categories')
  const subcategories =
    categories.filter((x) => x._id === formData.category)[0] || {}
  console.log(subcategories, 'subcategories')
  const productGroups =
    subcategories?.subcategory?.filter(
      (x) => x._id === formData.subcategory
    )[0] || {}
  console.log(productGroups, 'productGroup')
  return (
    <Box className="flex items-center justify-center h-screen">
      <Box className="w-[500px]  p-5 py-9 rounded-xl bg-white">
        <Box className="flex items-center justify-between mb-2">
          <Box className="flex items-center">
            <IconifyIcon icon="tabler:download" className="text-[27px]" />
            <Typography variant="body2" className="!text-[15px] !ml-2 !mr-4">
              Export Setup
            </Typography>
          </Box>
          <Box
            onClick={close}
            className="bg-white hover:bg-gray-200 text-gray-600 hover:text-red-500 flex items-center justify-center w-6 h-6 rounded-full cursor-pointer transition-all"
          >
            <IconifyIcon icon="tabler:x" className="text-[16px]" />
          </Box>
        </Box>
        <Typography variant="body2" className="!text-[13px] !ml-9">
          Leave empty to export all products{' '}
        </Typography>

        <div className="bg-white rounded-lg  p-3 md:p-6 ">
          <form onSubmit={() => {}}>
            <Box sx={{ pl: 0.2, mb: 1.5 }}>
              <SimpleDropDown
                render={categories?.map(({ subcategory, ...others }, i) => (
                  <MenuItem key={i} value={others._id}>
                    {others.label}
                  </MenuItem>
                ))}
                defaultValue={
                  categories.filter((x) => x._id === formData.category)[0]?._id
                }
                onChange={handleChange('category')}
                label="Product Category"
                sx={{ mb: 2 }}
              />
              <SimpleDropDown
                render={subcategories?.subcategory?.map((res, i) => (
                  <MenuItem key={i} value={res._id}>
                    {res.label}
                  </MenuItem>
                ))}
                defaultValue={
                  subcategories?.subcategory?.filter(
                    (x) => x._id === formData.subcategory
                  )[0]?._id
                }
                onChange={handleChange('subcategory')}
                label="Product Sub-Category"
                sx={{ mb: 2 }}
              />
              <SimpleDropDown
                render={productGroups?.group?.map((res, i) => (
                  <MenuItem key={i} value={res._id}>
                    {res.label}
                  </MenuItem>
                ))}
                defaultValue={
                  productGroups?.group?.filter(
                    (x) => x._id === formData.productGroup
                  )[0]?._id
                }
                onChange={handleChange('productGroup')}
                label="Product Class"
                sx={{ mb: 2 }}
              />
            </Box>

            <Box className="flex items-center justify-end mt-4">
              <Button
                variant="contained"
                startIcon={<Icon icon="tabler:download" />}
                className="!bg-blue-900 !shadow-none !text-[12px] !rounded-full"
                onClick={() =>
                  exportAllProductsHandler(exportName, formData, dispatch)
                }
              >
                Export
              </Button>
            </Box>
          </form>{' '}
        </div>
      </Box>
    </Box>
  )
}
