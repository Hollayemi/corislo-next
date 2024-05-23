import * as React from "react";
import { changeTime, formatDate } from "@/app/utils/format";
import { statusObj } from ".";
import { Typography, Button, Box, Menu, MenuItem } from "@mui/material";
import CustomChip from "@/app/components/chip";
import MoreIcon from "@mui/icons-material/MoreVert";

export const ordersColumns = (handleActionClick) => {
  return [
    {
      flex: 0.6,

      minWidth: 120,
      headerName: "Order ID",
      field: "_id",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row._id}
        </Typography>
      ),
    },
    {
      flex: 1.5,

      minWidth: 120,
      headerName: "Customer",
      field: "customer",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.customerName}
        </Typography>
      ),
    },
    {
      flex: 1,

      minWidth: 120,
      headerName: "Order Date",
      field: "dateAdded",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {formatDate(params.row.dateAdded)}
        </Typography>
      ),
    },
    {
      flex: 1,

      minWidth: 120,
      headerName: "Est. Delivery Date",
      field: "deliveryDate",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {formatDate(params.row.deliveryDate)}
        </Typography>
      ),
    },
    {
      flex: 0.8,

      minWidth: 120,
      headerName: "Total Order Price",
      field: "toatalPrice",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.totalPrice}
        </Typography>
      ),
    },
    {
      flex: 0.8,

      minWidth: 120,
      headerName: "Delivery Medium",
      field: "deliveryMedium",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.deliveryMedium}
        </Typography>
      ),
    },

    {
      flex: 0.5,
      minWidth: 120,
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        const handleMenuClose = () => {
          setAnchorEl(null);
        };

        const handleMenuItemClick = (action) => () => {
          handleActionClick(params.row, action);
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
};

const statusColumn = {
  flex: 1,
  minWidth: 120,
  field: "status",
  headerName: "Satus",
  renderCell: (params) => {
    const status = statusObj.filter((e) => e.title === params.row.status)[0];

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
};

export const allOrderColumns = (handleActionClick) => {
  const getCols = ordersColumns(handleActionClick);
  return [...getCols, statusColumn];
};
