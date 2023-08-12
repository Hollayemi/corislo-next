import CategoryIcon from "@mui/icons-material/Category";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SettingsIcon from "@mui/icons-material/Settings";
import StoreIcon from "@mui/icons-material/Store";

export const prodInnerList = [
  {
    title: "Product",
    contents: [
      {
        name: "Product Listing",
        path: "",
        icon: <ListAltIcon />,
        short: "Products",
      },
      {
        name: "Category and Tags",
        path: "/category-and-tags",
        icon: <CategoryIcon />,
        short: "Categories",
      },
      {
        name: "Add New Category",
        path: "/add-new-category",
        icon: <CreateNewFolderIcon />,
        short: "escape",
      },
      {
        name: "Add New Product",
        path: "/add-new-product",
        icon: <AddToPhotosIcon />,
        short: "Add Product",
      },
      {
        name: "Out of Stock",
        path: "/out-of-stock",
        icon: <ShowChartIcon />,
        short: "stock",
      },
    ],
  },
];



export const storeInnerList = [
  {
    title: "Store List",
    contents: [
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
    ],
  },
];


export const storeBottomBar = [
  {
    title: "Store List",
    contents: [
      {
        name: "Profile",
        path: "/stores",
        icon: <StoreIcon />,
        short: "Profile",
      },
      {
        name: "Store Settings",
        path: "/settings",
        icon: <SettingsIcon />,
        short: "Settings",
      },
    ],
  },
];
