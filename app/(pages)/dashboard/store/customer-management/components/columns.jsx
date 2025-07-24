import * as React from "react";
import { changeTime } from "@/app/utils/format";
import { statusObj } from ".";
import { Typography, Button, Box, Menu, MenuItem } from "@mui/material";
import {
  formatShippingAddress,
  formatSegmentation,
  formatDate,
} from "@/app/utils/format";
import { DashboardCrumb } from "../../components";

export const customerColumns = [
  {
    flex: 0.4,
    minWidth: 150,
    headerName: "Order ID",
    field: "orderId",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.id}
      </Typography>
    ),
  },
  {
    flex: 0.8,
    minWidth: 150,
    headerName: "Order Date",
    field: "orderDate",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {formatDate(params.row.orderDate)}
      </Typography>
    ),
  },
  {
    flex: 1.5,
    minWidth: 150,
    headerName: "Product Name",
    field: "productName",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.productName}
      </Typography>
    ),
  },
  {
    flex: 1,
    minWidth: 150,
    headerName: "Product Category",
    field: "productCategory",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.productCategory}
      </Typography>
    ),
  },
  {
    flex: 0.8,
    minWidth: 150,
    headerName: "Total Amount (₦)",
    field: "totalAmount",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        ₦ {parseInt(params.row.totalAmount).toLocaleString()}
      </Typography>
    ),
  },
  {
    flex: 0.8,
    minWidth: 150,
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
    minWidth: 150,
    field: "S",
    headerName: "status",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.status[params.row.status.length - 1].state}
      </Typography>
    ),
  },
];




export const listingColumns = [
  {
    flex: 1,
    minWidth: 150,
    headerName: "Customer",
    field: "customer",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.customer}
      </Typography>
    ),
  },
  {
    flex: 0.9,
    minWidth: 150,
    headerName: "Customer Email",
    field: "email",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.email}
      </Typography>
    ),
  },
  {
    flex: 0.6,
    minWidth: 150,
    headerName: "Phone Number",
    field: "phone",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.phone}
      </Typography>
    ),
  },
  {
    flex: 0.5,
    minWidth: 150,
    headerName: "Amount Spent",
    field: "totalAmountSpent",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        ₦ {parseInt(params.row.totalAmountSpent).toLocaleString()}
      </Typography>
    ),
  },
  {
    flex: 0.6,
    minWidth: 150,
    headerName: "Segmentation",
    field: "Segmentation",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {formatSegmentation(
          params.row.no_of_orders,
          params.row.totalAmountSpent,
          params.row.lastPurchase
        )}
      </Typography>
    ),
  },
  {
    flex: 0.6,
    minWidth: 150,
    headerName: "First Purchase",
    field: "medium",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {formatDate(params.row.firstPurchase)}
      </Typography>
    ),
  },
  {
    flex: 0.6,
    minWidth: 150,
    headerName: "Last Purchase",
    field: "lastPurchase",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {formatDate(params.row.lastPurchase)}
      </Typography>
    ),
  },
];


export const customerBreadCrumb = [
  ...DashboardCrumb,
  {
    text: "Customer",
    link: "customer-management",
    icon: "user",
  },
];