// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import {Box, Grid} from '@mui/material'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from '@/app/components/chip'
import CustomAvatar from '@/app/components/avatar'
import QuickSearchToolbar from '@/app/components/quickTool/QuickSearchToolbar'

// ** Utils Import
import { getInitials } from '@/app/utils/get-initials'

// ** Data Import
import { rows } from '@/app/data/store/productData'

const statusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const columns = [
  {
    flex: 0.2,
    minWidth: 120,
    headerName: "Date",
    field: "start_date",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.start_date}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: "Order Id",
    field: "age",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.age}
      </Typography>
    ),
  },
  {
    flex: 0.275,
    minWidth: 190,
    field: "post",
    headerName: "Customer Name",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row.full_name}
            </Typography>
            <Typography noWrap variant="caption">
              {row.email}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: "Address",
    field: "city",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.city}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: "Total Price",
    field: "salary",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.salary}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: "Order Status",
    field: "experience",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.experience}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: "status",
    headerName: "Actions",
    renderCell: (params) => {
      const status = statusObj[params.row.status];

      return (
        <CustomChip
          rounded
          size="small"
          skin="light"
          color={status.color}
          label={status.title}
          sx={{ "& .MuiChip-label": { textTransform: "capitalize" } }}
        />
      );
    },
  },
];

const PurchaseHistory = () => {
  // ** States
  const [data] = useState(rows)
  const [pageSize, setPageSize] = useState(7)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
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
    <Grid container spacing={6}>
      <Grid
        item
        xs={12}
        className="!w-[385px] !max-w-[385px] md:!w-full md:!max-w-full overflow-scroll md:overflow-auto border md:border-none shadow md:shadow-none"
      >
        <DataGrid
          autoHeight
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[7, 10, 25, 50]}
          components={{ Toolbar: QuickSearchToolbar }}
          rows={filteredData.length ? filteredData : data}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          componentsProps={{
            baseButton: {
              variant: "outlined",
            },
            toolbar: {
              value: searchText,
              clearSearch: () => handleSearch(""),
              onChange: (event) => handleSearch(event.target.value),
            },
          }}
          sx={{ border: "none" }}
          minWidth={300}
          className="w-[1220px]  md:w-full"
        />
      </Grid>
    </Grid>
  );
}

export default PurchaseHistory
