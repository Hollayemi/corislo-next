"use client";
import useSWR from "swr";
import { Typography, Box, Select, MenuItem } from "@mui/material";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import ProductList from "@/app/components/view/store/tables/productList";
import OverViewCard from "./overview";
import { prodInnerList } from "@/app/data/store/innerList";
import { BreadcrumbRightEle, productBreadCrumb } from "./components";
import { productListingRows } from "./rows";
import { StoreSalesApi } from "@/app/redux/state/slices/shop/overview/sales";

const ProductManagement = ({ params }) => {
  const { data, error, isLoading } = useSWR("/store/get-products");
  console.log(data);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(StoreSalesApi({ time: "1_month" }));
  // }, []);

  console.log(data);
  const path = { ...params, sidebar: "product-management" };
  return (
    <StoreLeftSideBar
      path={path}
      subListBar={false}
      InnerList={prodInnerList}
      breadCrumbRIghtChildren={<BreadcrumbRightEle />}
      crumb={[
        ...productBreadCrumb,
        { text: "Product listing", link: "product-management" },
      ]}
    >
      <Box className="relative">
        <Box className="mb-10 bg-white rounded-md px-3 py-6">
          <OverViewCard />
        </Box>
        <Box className="bg-white rounded-md px-3 py-6">
          <Box className="bg-white rounded-md mt-4 px-3 pt-6 w-full"></Box>
          <Box className="flex justify-between items-center px-">
            <Typography className="text-xs md:text-md font-bold">
              All Products ({data?.data.length})
            </Typography>
          </Box>
          <Box>{data && <ProductList rows={data?.data} />}</Box>
        </Box>
      </Box>
    </StoreLeftSideBar>
  );
};

export default ProductManagement;
