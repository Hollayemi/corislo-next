// import AppsIcon from '@mui/icons-material/Apps';
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import CreditCardIcon from "@mui/icons-material/CreditCard";

export const SidebarContent = [
  {
    name: "Dashboard",
    path: "",
    icon: <ViewQuiltIcon />,
    key: "ele_1",
  },
  {
    name: "Store",
    path: "/stores",
    icon: <StorefrontIcon />,
    key: "ele_2",
  },
  {
    name: "Product Management",
    path: "/product-management",
    icon: <ShoppingBagIcon />,
    key: "ele_3",
  },
  {
    name: "Order Management",
    path: "/order-management",
    icon: <ViewStreamIcon />,
    key: "ele_4",
  },
  {
    name: "Customer Management",
    path: "/customer-management",
    icon: <Diversity1Icon />,
    key: "ele_5",
  },
  {
    name: "Store Analytics",
    path: "/store-analytics",
    icon: <AccountTreeIcon />,
    key: "ele_6",
  },
  {
    name: "Marketing",
    path: "/marketing",
    icon: <AutoGraphIcon />,
    key: "ele_7",
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <SettingsApplicationsIcon />,
    key: "ele_8",
  },
  {
    name: "Pricing",
    path: "/pricing",
    icon: <CreditCardIcon />,
    key: "ele_8",
  },
];
