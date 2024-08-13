import { reshapePrice } from "@/app/(pages)/store/dashboard/marketing/components";
import { CustomizeStatus } from "@/app/(pages)/store/dashboard/order-management/review/components";
import CustomAvatar from "@/app/components/avatar";
import IconifyIcon from "@/app/components/icon";
import OptionsMenu from "@/app/components/option-menu";
import { formatDate, formatSegmentation } from "@/app/utils/format";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Rating,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const allCustomers = [
  {
    flex: 1,
    minWidth: 200,
    headerName: "User",
    field: "user",
    renderCell: (params) => (
      <Box className="flex items-center">
        <CustomAvatar src={params.row?.picture} className="!w-7 !h-7 mr-2" />
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.fullname}
        </Typography>
      </Box>
    ),
  },
  {
    flex: 0.9,
    minWidth: 150,
    headerName: "Email",
    field: "email",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.email}
      </Typography>
    ),
  },
  {
    flex: 0.5,
    minWidth: 150,
    headerName: "Items bought",
    field: "quantity",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.order?.quantity?.toString() || "0"}
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
          params.row?.order?.quantity,
          params.row?.order?.totalSpent,
          params.row?.order?.lastDate
        )}
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
        {formatDate(params.row.order?.lastDate)}
      </Typography>
    ),
  },
];

export const businessColumns = (clickFunc) => [
  {
    flex: 1.2,
    minWidth: 300,
    headerName: "Business Name",
    field: "user",
    renderCell: (params) => (
      <Box className="flex items-center !p-3">
        <CustomAvatar
          src={
            (params.row.branches &&
              params.row.branches.branches[0].profile_image) ||
            "/images/misc/storeImage.png"
          }
          className="!w-16 !h-16 mr-2 relative !rounded-md"
        />
        <Box className="flex flex-col items-start ml-4">
          <Typography
            variant="body2"
            className="!text-[16px] !mb-2 !text-gray-500"
          >
            {params.row.businessName}
          </Typography>
          <AvatarGroup>
            {params.row.branches &&
              params.row.branches.branches.map((branch, i) => (
                <Avatar
                  alt="Remy Sharp"
                  src={branch.profile_image || `/images/misc/shop/${i}.png`}
                  sx={{ width: 24, height: 24 }}
                />
              ))}
          </AvatarGroup>
        </Box>
      </Box>
    ),
  },
  {
    flex: 0.4,
    minWidth: 150,
    headerName: "Status",
    field: "email",
    renderCell: (params) => (
      <CustomizeStatus
        text={params.row.isActive ? "Active" : "Inactive"}
        size="large"
      />
    ),
  },
  {
    flex: 0.6,
    minWidth: 100,
    headerName: "Date Joined",
    field: "medium",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {formatDate(params.row.createdAt)}
      </Typography>
    ),
  },
  {
    flex: 1.5,
    minWidth: 450,
    headerName: "Stats",
    field: "type",
    renderCell: (params) => (
      <Box className="flex items-center">
        <Box className="flex flex-col">
          <Rating
            size="large"
            value={params.row.feedback?.averageRating || 0}
            readOnly
            max={5}
            precision={0.1}
            className="!text-[20px] mb-2"
          />
          <Typography variant="body2">
            {params.row.feedback?.totalReviews || 0} Reviews
          </Typography>
        </Box>

        <Box className="ml-3 border-l pl-3">
          <Typography variant="body2" className="!mb-1">
            Total Products
          </Typography>
          <Typography variant="caption">
            {params.row.products?.total || 0} Products
          </Typography>
        </Box>

        <Box className="ml-3 border-l pl-3 w-28">
          <Typography variant="body2" className="!mb-1">
            Total Order
          </Typography>
          <Typography variant="caption">
            {params.row.order?.quantity || 0} Products for
          </Typography>
          <br />
          <Typography variant="caption">
            {reshapePrice(params.row.order?.totalSpent)}
          </Typography>
        </Box>

        <Box className="ml-3 border-l pl-3">
          <Typography variant="body2" className="!mb-1">
            Branches
          </Typography>
          <Typography variant="caption">
            {params.row.branches?.total || 0} Branches
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    flex: 0.5,
    minWidth: 120,
    field: "actions",
    fixed: "right",
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
        clickFunc(params.row, action);
      };
      const currStatus = params.row.status;

      const active = params.row.isActive;

      return (
        <div>
          <Button
            onClick={handleButtonClick}
            className="w-12 h-12 rounded-full"
          >
            <IconifyIcon icon="tabler:dots" className="!text-[17px]" />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            className="!-left-28 !-top-6"
            onClose={handleMenuClose}
          >
            <MenuItem
              className="!text-gray-500 !text-[15px]"
              onClick={handleMenuItemClick("view")}
            >
              <IconifyIcon
                icon="tabler:library-photo"
                className="!text-[17px] mr-4"
              />
              Photos/Videos
            </MenuItem>
            <MenuItem
              className="!text-gray-500 !text-[15px]"
              onClick={handleMenuItemClick("edit")}
            >
              <IconifyIcon
                icon="tabler:package"
                className="!text-[17px] mr-4"
              />
              Products
            </MenuItem>

            <MenuItem
              className="!text-gray-500 !text-[15px]"
              onClick={handleMenuItemClick()}
            >
              <IconifyIcon icon="tabler:tools" className="!text-[17px] mr-4" />
              Services
            </MenuItem>
            <MenuItem
              className="!text-gray-500 !text-[15px]"
              onClick={handleMenuItemClick()}
            >
              <IconifyIcon
                icon="tabler:message"
                className="!text-[17px] mr-4"
              />
              User Reviews
            </MenuItem>
            <Divider className="!my-2" />
            <MenuItem
              className="!text-gray-500 !text-[15px]"
              onClick={handleMenuItemClick()}
            >
              <IconifyIcon
                icon="tabler:currency-naira"
                className="!text-[17px] mr-4"
              />
              Subscription
            </MenuItem>
            <MenuItem
              className="!text-gray-500 !text-[15px]"
              onClick={handleMenuItemClick()}
            >
              <IconifyIcon
                icon="tabler:chart-line"
                className="!text-[17px] mr-4"
              />
              Stats
            </MenuItem>
            <Divider className="!my-2" />
            <MenuItem
              className={active ? "!text-red-600" : "!text-green-600"}
              onClick={handleMenuItemClick("changeStatus")}
            >
              <IconifyIcon
                icon={active ? "tabler:square-x" : "tabler:check"}
                className="!text-[17px] mr-4"
              />
              {active ? "Deactivate" : "Activate"} Business
            </MenuItem>
            <MenuItem
              className="!text-red-600"
              onClick={handleMenuItemClick("delete-permanently")}
            >
              <IconifyIcon icon="tabler:trash" className="!text-[17px] mr-4" />
              Delete Business
            </MenuItem>
          </Menu>
        </div>
      );
    },
  },
];
