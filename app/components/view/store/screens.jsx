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
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import CategoryIcon from "@mui/icons-material/Category";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShowChartIcon from "@mui/icons-material/ShowChart";

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
export const searchNavigations = {
  key: "corisio dashboard",
  name: "Corisio Dashboard",
  path: navigation.dashboard,
  children: [
    {
      key: "Store",
      name: "Store",
      path: navigation.store,
      icon: <StorefrontIcon />,
      topLevel: true,
      children: [
        {
          key: "Stores Profile name Photo address landmark about gallery social media instagram facebook twitter tik tok open hours",
          name: "Stores Profile",
          path: navigation.store,
          icon: <StorefrontIcon />,
        },
        {
          key: "Stores Settings",
          name: "Stores Settings",
          path: `${navigation.store}/settings`,
          icon: <StorefrontIcon />,
        },
      ],
    },
    {
      key: "Product Management",
      name: "Product Management",
      path: navigation.product_management,
      icon: <ShoppingBagIcon />,
      topLevel: true,
      children: [
        {
          key: "Product Management product Listing",
          name: "Product Listing",
          path: navigation.product_management,
          icon: <ShoppingBagIcon />,
        },
        {
          key: "Product Management categories ",
          name: "Category and Tags",
          path: `${navigation.product_management}/category-and-tags`,
          icon: <CategoryIcon />,
        },
        {
          key: "Product Management add new category categories collection sub",
          name: "Add New Collection",
          path: `${navigation.product_management}/add-new-category`,
          icon: <CreateNewFolderIcon />,
        },
        {
          key: "Product Management add product Image ",
          name: "Add New Product",
          path: `${navigation.product_management}/add-new-product`,
          icon: <AddToPhotosIcon />,
        },
      ],
    },
    {
      key: "Order Management",
      name: "Order Management",
      path: navigation.order_management,
      icon: <ViewStreamIcon />,
      topLevel: true,
      children: [
        {
          key: "Order Management Details All Orders New Processing Processed Cancelled",
          name: "Order Listing",
          path: navigation.order_management,
          icon: <ViewStreamIcon />,
        },
      ],
    },
    {
      key: "Customer Management",
      name: "Customer Management",
      path: navigation.customer_management,
      icon: <Diversity1Icon />,
      topLevel: true,
      children: [
        {
          key: "Customer list email phone number spent amount segmentation purchase All",
          name: "Customer Listing",
          path: navigation.customer_management,
          icon: <Diversity1Icon />,
        },
      ],
    },
    {
      key: "Store Analytics",
      name: "Store Analytics",
      path: navigation.store_analytics,
      icon: <AccountTreeIcon />,
      topLevel: true,
      children: [
        {
          key: "sale count conversion rate branches categories analytics",
          name: "Categories and Branch(es) growth",
          path: navigation.store_analytics,
          icon: <AccountTreeIcon />,
        },
      ],
    },
    {
      key: "Marketing",
      name: "Marketing",
      path: navigation.marketing,
      icon: <AutoGraphIcon />,
      topLevel: true,
      children: [
        {
          key: "Marketing redemption growth discount flash sale ",
          name: "Marketing Growth",
          path: navigation.marketing,
          icon: <AutoGraphIcon />,
        },
        {
          key: "Marketing campaign announcement banner radius deal",
          name: "Create Marketing Campaign",
          path: `${navigation.marketing}/create`,
          icon: <AutoGraphIcon />,
        },
      ],
    },
    {
      key: "Settings",
      name: "Settings",
      path: navigation.settings,
      topLevel: true,
      icon: <SettingsApplicationsIcon />,
    },
    {
      key: "Pricing",
      name: "Pricing",
      path: navigation.pricing,
      topLevel: true,
      icon: <CreditCardIcon />,
    },
  ],
};
