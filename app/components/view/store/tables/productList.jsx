/* eslint-disable react-hooks/rules-of-hooks */
// ** React Imports
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

// ** MUI Imports
import { Box, Grid, Typography, Button, Menu, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import MoreIcon from '@mui/icons-material/MoreVert'

// ** Custom Components
import CustomChip from '@/app/components/chip'
import CustomAvatar from '@/app/components/avatar'
import QuickSearchToolbar from '@/app/components/quickTool/QuickSearchToolbar'

// ** Utils Import
import { getInitials } from '@/app/utils/get-initials'
import { formatDate } from '@/app/utils/format'

import { reshapePrice } from '@/app/(pages)/dashboard/store/marketing/components'
import { productStatusUpdate } from '@/app/redux/state/slices/shop/products/updateProduct'
import { useDispatch } from 'react-redux'
import { UpdateStock } from '@/app/(pages)/dashboard/store/product-management/out-of-stock/page'

// ** renders client column

const renderClient = (params) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]
  if (row?.image?.image) {
    return (
      <CustomAvatar
        src={row.image.image}
        sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }}
      />
    )
  } else {
    return (
      <CustomAvatar
        skin="light"
        color={color}
        sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(row.productName ? row.productName : 'Product Name')}
      </CustomAvatar>
    )
  }
}

const statusObj = {
  waiting: { title: 'waiting', color: 'warning' },
  available: { title: 'available', color: 'success' },
  approved: { title: 'approved', color: 'success' },
  rejected: { title: 'rejected', color: 'error' },
  resigned: { title: 'resigned', color: 'warning' },
  hidden: { title: 'hidden', color: 'info' },
}

const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const columns = (clickFunc, outofstock) => [
  {
    flex: 0.475,
    minWidth: 250,
    field: 'productName',
    headerName: 'Product Name',
    renderCell: (params) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(params)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: 'text.primary', fontWeight: 600 }}
            >
              {row.productName}
            </Typography>
          </Box>
        </Box>
      )
    },
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Uploaded By',
    field: 'uploadedBy',
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.uploadedBy}
      </Typography>
    ),
  },
  {
    flex: 0.3,
    minWidth: 180,
    headerName: 'Collection',
    field: 'collection',
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.collectionName}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Price',
    field: 'price',
    renderCell: (params) => (
      <Typography
        variant="body2"
        className="!ml-3"
        sx={{ color: 'text.primary' }}
      >
        {reshapePrice(params.row.price)}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Total in stock',
    field: 'date',
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.totInStock}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 120,
    field: 'status',
    headerName: 'Status',
    renderCell: (params) => {
      console.log(params)
      const status = statusObj[params.row.status]

      return (
        <CustomChip
          rounded
          size="small"
          skin="light"
          color={status?.color}
          label={status?.title}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
        />
      )
    },
  },
  {
    flex: 0.5,
    minWidth: 120,
    field: 'actions',
    fixed: 'right',
    headerName: 'Actions',
    renderCell: (params) => {
      const [anchorEl, setAnchorEl] = React.useState(null)
      const open = Boolean(anchorEl)

      const handleButtonClick = (event) => {
        setAnchorEl(event.currentTarget)
      }

      const handleMenuClose = () => {
        setAnchorEl(null)
      }

      const handleMenuItemClick = (action) => () => {
        setAnchorEl(null)
        clickFunc(params.row, action)
      }
      const currStatus = params.row.status
      const st = ['hidden', 'approved']
      return (
        <div>
          <Button
            onClick={
              outofstock
                ? handleMenuItemClick('update-stock')
                : handleButtonClick
            }
            className="w-fit min-w-16 h-16 rounded-full"
          >
            {outofstock ? 'Update stock' : <MoreIcon />}
          </Button>
          {outofstock && (
            <Menu
              anchorEl={anchorEl}
              open={open}
              className="left-0"
              onClose={handleMenuClose}
            >
              <MenuItem
                className="!text-green-500"
                onClick={handleMenuItemClick('view')}
              >
                View
              </MenuItem>
              <MenuItem
                className="!text-green-500"
                onClick={handleMenuItemClick('edit')}
              >
                Edit
              </MenuItem>
              {st.includes(currStatus) && (
                <MenuItem
                  className="!text-blue-500"
                  onClick={handleMenuItemClick(
                    currStatus === 'hidden' ? 'show' : 'hide'
                  )}
                >
                  {currStatus === 'hidden' ? 'Show to' : 'Hide from'} public
                </MenuItem>
              )}
              <MenuItem
                className="!text-red-600"
                onClick={handleMenuItemClick('delete-permanently')}
              >
                Delete Parmanently
              </MenuItem>
            </Menu>
          )}
        </div>
      )
    },
  },
]

const ProductList = ({ rows, updateDialogInfo, outofstock }) => {
  // ** States

  const router = useRouter()
  const dispatch = useDispatch()
  const menuOptions = (row, action) => {
    console.log(row, action)
    if (action === 'edit') {
      router.push(
        `/dashboard/store/product-management/add-new-product?edit=${row.prodId}`
      )
    }
    if (action === 'hide') {
      productStatusUpdate({ id: row.prodId, status: 'hidden' }, dispatch)
    }
    if (action === 'show') {
      productStatusUpdate({ id: row.prodId, status: 'approved' }, dispatch)
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

    if (action === 'update-stock') {
      updateDialogInfo((prev) => {
        return {
          ...prev,
          open: true,
          title: 'Action Confirmation',
          dialogComponent: <UpdateStock row={row} />,
          // acceptFunctionText: 'Update Stock',
          // acceptFunction: () =>
          //   productStatusUpdate({ id: row.prodId, deleteProd: true }, dispatch),
        }
      })
    }
  }

  const myRows = rows.map((e, i) => {
    return { ...e, id: i }
  })
  const [data] = useState(myRows)
  const [pageSize, setPageSize] = useState(7)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const hideFields = outofstock ? ['Status'] : []
  const handleSearch = (searchValue) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }
  return (
    <DataGrid
      autoHeight
      columns={columns(menuOptions, outofstock).filter(
        (x) => !hideFields.includes(x.headerName)
      )}
      rowsPerPageOptions={[7, 10, 25, 50]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: pageSize,
          },
        },
      }}
      components={{ Toolbar: QuickSearchToolbar }}
      rows={filteredData.length ? filteredData : data}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      componentsProps={{
        baseButton: {
          variant: 'outlined',
        },
        toolbar: {
          value: searchText,
          clearSearch: () => handleSearch(''),
          onChange: (event) => handleSearch(event.target.value),
        },
      }}
      sx={{ border: 'none' }}
    />
  )
}

export default ProductList
