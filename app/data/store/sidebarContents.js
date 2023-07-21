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
    path: "/store/dashboard",
    icon: <ViewQuiltIcon />,
  },
  {
    name: "Store",
    path: "/store/dashboard/stores",
    icon: <StorefrontIcon />,
  },
  {
    name: "Product Management",
    path: "/store/dashboard/product-management",
    icon: <ShoppingBagIcon />,
  },
  {
    name: "Order Management",
    path: "/store/dashboard/order-management",
    icon: <ViewStreamIcon />,
  },
  {
    name: "Customer Management",
    path: "/store/dashboard/customer-management",
    icon: <Diversity1Icon />,
  },
  {
    name: "Store Analytics",
    path: "/store/dashboard/store-analytics",
    icon: <AccountTreeIcon />,
  },
  {
    name: "Marketing",
    path: "/store/dashboard/marketing",
    icon: <AutoGraphIcon />,
  },
  {
    name: "Settings",
    path: "/store/dashboard/settings",
    icon: <SettingsApplicationsIcon />,
  },
  {
    name: "Pricing",
    path: "/store/dashboard/pricing",
    icon: <CreditCardIcon />,
  },
];