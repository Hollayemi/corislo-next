import CategoryIcon from "@mui/icons-material/Category";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShowChartIcon from "@mui/icons-material/ShowChart";

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
