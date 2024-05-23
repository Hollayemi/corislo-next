// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { Box, Grid, Typography, Button, Menu, MenuItem } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid'
import MoreIcon from "@mui/icons-material/MoreVert";

// ** Custom Components
import CustomChip from '@/app/components/chip'
import CustomAvatar from '@/app/components/avatar'
import QuickSearchToolbar from '@/app/components/quickTool/QuickSearchToolbar'

// ** Utils Import
import { getInitials } from '@/app/utils/get-initials'
import { formatDate } from "@/app/utils/format"

// ** Data Import
import { rows } from '@/app/data/store/productData'

// ** renders client column


const renderClient = params => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]
  if (row?.image?.image) {
    return (
      <CustomAvatar
        src={row.image.image}
        sx={{ mr: 3, width: "1.875rem", height: "1.875rem" }}
      />
    );
  } else {
    return (
      <CustomAvatar
        skin="light"
        color={color}
        sx={{ mr: 3, fontSize: ".8rem", width: "1.875rem", height: "1.875rem" }}
      >
        {getInitials(row.productName ? row.productName : "Product Name")}
      </CustomAvatar>
    );
  }
}

const statusObj = {
  waiting: { title: "waiting", color: "warning" },
  approved: { title: "approved", color: "success" },
  rejected: { title: "rejected", color: "error" },
  resigned: { title: "resigned", color: "warning" },
  applied: { title: "applied", color: "info" },
};

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const columns = [
  {
    flex: 0.275,
    minWidth: 190,
    field: "productName",
    headerName: "Product Name",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(params)}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row.productName}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: "Uploaded By",
    field: "uploadedBy",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.uploadedBy}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: "Category",
    field: "category",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.category}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: "Price",
    field: "price",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.price}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: "Date",
    field: "date",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {formatDate(params.row.date)}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: "status",
    headerName: "Status",
    renderCell: (params) => {
      const status = statusObj[params.row.status];

      return (
        <CustomChip
          rounded
          size="small"
          skin="light"
          color={status?.color}
          label={status?.title}
          sx={{ "& .MuiChip-label": { textTransform: "capitalize" } }}
        />
      );
    },
  },
  {
    flex: 0.5,
    field: "actions",
    headerName: "Actions",
    renderCell: (params) => {
      const [anchorEl, setAnchorEl] = useState(null);
      const open = Boolean(anchorEl);

      const handleButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleMenuClose = () => {
        setAnchorEl(null);
      };

      const handleMenuItemClick = (action) => () => {
        setAnchorEl(null);
      };

      return (
        <div>
          <Button
            onClick={handleButtonClick}
            className="w-16 h-16 rounded-full"
          >
            <MoreIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            className="left-0"
            onClose={handleMenuClose}
          >
            <MenuItem
              className="!text-orange-500"
              onClick={handleMenuItemClick("refund")}
            >
              Refund Order
            </MenuItem>
            {params.row.status !== "cancelled" && (
              <MenuItem
                className="!text-red-500"
                onClick={handleMenuItemClick("cancel")}
              >
                Cancel Order
              </MenuItem>
            )}
            <MenuItem onClick={handleMenuItemClick("modify")}>
              Modify Order
            </MenuItem>
            <MenuItem onClick={handleMenuItemClick("message")}>
              Message
            </MenuItem>
          </Menu>
        </div>
      );
    },
  },
];

const ProductList = ({ rows }) => {
  // ** States
  const myRows = rows.map((e, i) => {
    return { ...e, id: i };
  });
  const [data] = useState(myRows);
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
    // <Grid container>
    //   <Grid
    //     item
    //     xs={12}
    //     // className="!w-[385px] !max-w-[385px] md:!w-full md:!max-w-full overflow-scroll md:overflow-auto border md:border-none shadow md:shadow-none"
      // >
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
          // className="w-[1220px] md:w-full"
        />
    //   </Grid>
    // </Grid>
  );
}

export default ProductList
