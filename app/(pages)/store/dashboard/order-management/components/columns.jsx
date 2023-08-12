import * as React from "react";
import { changeTime } from "@/app/utils/format";
import { statusObj } from ".";
import { Typography, Button, Box, Menu, MenuItem } from "@mui/material";
import CustomChip from "@/app/components/chip";
import MoreIcon from "@mui/icons-material/MoreVert";

export const ordersColumns = (handleActionClick) => {
  return [
    {
      flex: 0.6,
      headerName: "Order ID",
      field: "discount",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.discount}
        </Typography>
      ),
    },
    {
      flex: 1.5,
      headerName: "Customer",
      field: "picker.name",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.picker.name}
        </Typography>
      ),
    },
    {
      flex: 1,
      headerName: "Order Date",
      field: "createdAt",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {changeTime(params.row.createdAt)}
        </Typography>
      ),
    },
    {
      flex: 1,
      headerName: "Delivery Date",
      field: "updatedAt",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {changeTime(params.row.updatedAt)}
        </Typography>
      ),
    },
    {
      flex: 0.8,
      headerName: "Total Order Price",
      field: "totalAmount",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.totalAmount}
        </Typography>
      ),
    },
    {
      flex: 0.8,
      headerName: "Delivery Medium",
      field: "medium",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.medium}
        </Typography>
      ),
    },

    {
      flex: 0.5,
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
    field: "status",
    headerName: "Satus",
    renderCell: (params) => {
      const status = statusObj.filter(e => e.title === params.row.status)[0];

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
  }

  
  export const allOrderColumns = (handleActionClick) => {
  const getCols = ordersColumns(handleActionClick);
  return [...getCols, statusColumn];
}