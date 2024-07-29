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
import { WorkspacesSharp } from "@mui/icons-material";


export const navigation = {
  dashboard: "",
  store: "/stores",
  product_management: "/product-management",
  order_management: "/order-management",
  customer_management: "/customer-management",
  store_analytics: "/store-analytics",
  marketing: "/marketing",
  settings: "/settings",
  pricing: "/pricing",
};
export const SidebarContent = [
  {
    name: "Dashboard",
    path: navigation.dashboard,
    icon: <ViewQuiltIcon />,
    key: "ele_1",
  },
  {
    name: "Store",
    path: navigation.store,
    icon: <StorefrontIcon />,
    key: "ele_2",
  },
  {
    name: "Product Management",
    path: navigation.product_management,
    icon: <ShoppingBagIcon />,
    key: "ele_3",
  },
  {
    name: "Order Management",
    path: navigation.order_management,
    icon: <ViewStreamIcon />,
    key: "ele_4",
  },
  {
    name: "Customer Management",
    path: navigation.customer_management,
    icon: <Diversity1Icon />,
    key: "ele_5",
  },
  {
    name: "Store Analytics",
    path: navigation.store_analytics,
    icon: <AccountTreeIcon />,
    key: "ele_6",
  },
  {
    name: "Marketing",
    path: navigation.marketing,
    icon: <AutoGraphIcon />,
    key: "ele_7",
  },
  {
    name: "Settings",
    path: navigation.settings,
    icon: <SettingsApplicationsIcon />,
    key: "ele_8",
  },
  {
    name: "Pricing",
    path: navigation.pricing,
    icon: <CreditCardIcon />,
    key: "ele_8",
  },
];

export const ServicesSidebarContent = [
  {
    name: "Dashboard",
    path: navigation.dashboard,
    icon: <ViewQuiltIcon />,
    key: "ele_1",
  },
  {
    name: "Workshop",
    path: navigation.store,
    icon: <WorkspacesSharp />,
    key: "ele_2",
  },
  {
    name: "Settings",
    path: navigation.settings,
    icon: <SettingsApplicationsIcon />,
    key: "ele_8",
  },
  {
    name: "Pricing",
    path: navigation.pricing,
    icon: <CreditCardIcon />,
    key: "ele_8",
  },
];
