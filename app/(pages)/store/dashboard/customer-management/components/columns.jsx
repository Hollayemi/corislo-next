import * as React from "react";
import { changeTime } from "@/app/utils/format";
import { statusObj } from ".";
import { Typography, Button, Box, Menu, MenuItem } from "@mui/material";
import {
  formatShippingAddress,
  formatSegmentation,
  formatDate,
} from "@/app/utils/format";

export const customerColumns = [
  {
    flex: 0.4,
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
    headerName: "Total Amount (₦)",
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
    field: "deliveryMedium",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.deliveryMedium}
      </Typography>
    ),
  },

  {
    flex: 0.5,
    field: "S",
    headerName: "status",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.status}
      </Typography>
    ),
  },
];




export const listingColumns = [
  {
    flex: 1,
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
    headerName: "Phone Number",
    field: "phone",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.phone}
      </Typography>
    ),
  },
  {
    flex: 1.2,
    headerName: "Address",
    field: "address",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {formatShippingAddress(params.value)}
      </Typography>
    ),
  },
  {
    flex: 0.6,
    headerName: "Segmentation",
    field: "totalAmount",
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
    headerName: "Last Purchase",
    field: "lastPurchase",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {formatDate(params.row.lastPurchase)}
      </Typography>
    ),
  },
];
