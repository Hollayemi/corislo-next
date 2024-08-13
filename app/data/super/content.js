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

export const navigation = {
  dashboard: "",
  users: "/users",
  businesses: "/businesses",
  order_management: "/order-management",
  pending_products: "/pending-products",
  store_analytics: "/store-analytics",
  marketing: "/marketing",
  settings: "/settings",
  pricing: "/pricing",
};

export const SuperLeftBarContent = [
  {
    name: "Dashboard",
    path: navigation.dashboard,
    icon: <ViewQuiltIcon />,
    key: "ele_1",
  },
  {
    name: "Users",
    path: navigation.users,
    icon: <Diversity1Icon />,
    key: "ele_2",
  },
  {
    name: "Businesses",
    path: navigation.businesses,
    icon: <StorefrontIcon />,
    key: "ele_3",
  },
  {
    name: "Agents",
    path: navigation.order_management,
    icon: <ViewStreamIcon />,
    key: "ele_4",
  },
  {
    name: "Awating Products",
    path: navigation.pending_products,
    icon: <Diversity1Icon />,
    key: "ele_5",
  },
  {
    name: "Corisio Analytics",
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
];
