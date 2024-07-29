import CategoryIcon from "@mui/icons-material/Category";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SettingsIcon from "@mui/icons-material/Settings";
import StoreIcon from "@mui/icons-material/Store";
import { CheckBox, HouseOutlined, SupervisedUserCircle, UpcomingOutlined, VerifiedUserSharp } from "@mui/icons-material";

export const prodInnerList = {
  title: "Product",
  content: [
    {
      name: "Product Listing",
      path: "",
      icon: "tabler:list-details",
      short: "Products",
    },
    {
      name: "Category and Tags",
      path: "/category-and-tags",
      icon: "tabler:category",
      short: "Categories",
    },
    {
      name: "Add New Category",
      path: "/add-new-category",
      icon: "tabler:category-plus",
      short: "escape",
    },
    {
      name: "Add New Product",
      path: "/add-new-product",
      icon: "tabler:package",
      short: "Add Product",
    },
    {
      name: "Out of Stock",
      path: "/out-of-stock",
      icon: "tabler:package-off",
      short: "stock",
    },
  ],
};

export const storeInnerList = [
  {
    name: "Your Branch",
    path: "",
    icon: <ListAltIcon />,
    short: "Products",
  },
  {
    name: "Gourment Delight",
    path: "/gourment-delight",
    icon: <CategoryIcon />,
    short: "Categories",
  },
  {
    name: "Home Essentials",
    path: "/home-essentials",
    icon: <CreateNewFolderIcon />,
    short: "escape",
  },
  {
    name: "Tech Solutions",
    path: "/tech-solutions",
    icon: <AddToPhotosIcon />,
    short: "Add Product",
  },
];

export const storeBottomBar = {
  content: [
    {
      name: "Profile",
      path: "/stores",
      icon: "tabler:building-store",
      short: "Profile",
    },
    {
      name: "Store Settings",
      path: "/settings",
      icon: "tabler:settings",
      short: "Settings",
      permission: "edit_store"
    },
  ],
};

export const settingsInnerList = {
   title: "Settings", content: [
  {
    name: "Account Settings",
    path: "",
    icon: "tabler:user-circle",
    short: "Profile",
  },
  {
    name: "Role and Permission",
    path: "/role",
    icon: "tabler:user-check",
    short: "Permission",
    permission: "view_roles"
  },
   {
    name: "Branches",
    path: "/branches",
    icon: "tabler:building-warehouse",
    short: "Branches",
    permission: "view_stores"
  },
  {
    name: "Staffs",
    path: "/staffs",
    icon: "tabler:users-group",
    short: "Staffs",
    permission: "view_staff"
  },
  {
    name: "Plans",
    path: "/plans",
    icon: "tabler:checklist",
    short: "Plans",
    permission: "view_plan"
  },
  {
    name: "Billing",
    path: "/billing",
    icon: "tabler:receipt-2",
    short: "Billing",
    permission: "view_billing"
  },
 
]};