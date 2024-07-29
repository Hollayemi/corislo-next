"use client";
import { useEffect, useState } from "react";
import { prodInnerList } from "@/app/data/store/innerList";
import { useSearchParams, useRouter } from "next/navigation";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import {
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  SizeComponent,
  QuantityComponent,
  ColorComponent,
} from "../add-new-product/components";
import useSWR from "swr";
import { removeOrAddToArray } from "@/app/utils/arrayFunctions";
import { useDispatch } from "react-redux";
import { productBreadCrumb } from "../components";
import IconifyIcon from "@/app/components/icon";
import { mySubstring } from "@/app/utils/format";
// no allow (),+,
const AddNewProduct = ({ params }) => {
  const theme = useTheme();
  const router = useRouter()
  const searchParams = useSearchParams();
  const viewID = searchParams.get("id");
  const brk = theme.breakpoints.down;
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [newSpec, setNewSpec] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [specId, setspecId] = useState(null);
  const [files, setFiles] = useState([]);
  const [delivery, selectDelivery] = useState(["pickup"]);
  const { data: getData, error } = useSWR("/store/collections/thread");
  const { data: toView } = useSWR(viewID && `/products?productId=${viewID}`);
  const { data: specData } = useSWR(
    specId && `/corisio/get-spec?specId=${specId}`
  );
  let specInfo = specData && specData?.data;
  const collections = getData ? getData?.data : [{}];
  const prodToView = toView ? toView.data?.result : [];
  const specWithSize = ["cloth_spec", "shoe_spec"];
  const [formData, setFormData] = useState({
    prodName: "",
    prodPrice: "",
    prodKey: "",
    prodInfo: "",
    specifications: {},
    images: [],
    totInStock: "",
    collectionId: "",
    subCollection: "",
    subCollectionName: "",
    collectionName: "",
    category: "",
    subcategory: { sizes: selectedSizes },
    productGroup: "",
    delivery,
  });
  let fromCollection = collections.filter(
    (x) => x.collectionId === formData.collectionId
  )[0];

  useEffect(() => {
    if (toView) {
      const toViewData = prodToView[0] || {};
      setFormData(() => {
        return {
          prodName: toViewData.prodName,
          prodPrice: toViewData.prodPrice,
          video: toViewData.video,
          prodKey: toViewData.prodKey,
          prodInfo: toViewData.prodInfo,
          images: toViewData.images,
          totInStock: toViewData.totInStock,
          collectionId: toViewData.collectionId,
          subCollection: toViewData.subCollection,
          subCollectionName: toViewData.subCollectionName,
          collectionName: toViewData.collectionName,
          subcategory: toViewData.subcategory,
          productGroup: toViewData.productGroup,
          delivery: toViewData.delivery,
          specifications: toViewData.specifications?.variations || {},
          category: toViewData.categoryId,
          _id: toViewData._id,
        };
      });
      selectDelivery(toViewData.delivery);
      fromCollection = collections.filter(
        (x) => x.collectionId === toViewData.collectionId
      )[0];
    }
  }, [toView]);

  

  const path = {
    ...params,
    sidebar: "product-management",
    sublist: "add-new-product",
  };

  const TextDisplay = ({ title, info }) => (
    <Box className="mb-3">
      <Typography variant="caption" className="!mb-1">
        {title}
      </Typography>
      <Typography className="!mt-1 !mb-6">{info || "--------"}</Typography>
    </Box>
  );

  return (
    <StoreLeftSideBar
      path={path}
      subListBar={true}
      InnerList={prodInnerList}
      crumb={[
        ...productBreadCrumb,
        {
          text: "View Product",
          link: "add-new-product",
        },
      ]}
      breadCrumbRIghtChildren={
        <Button
          onClick={() =>
            router.push(
              `/store/dashboard/product-management/add-new-product?edit=${viewID}`
            )
          }
          variant="contained"
          className="!h-6 !shadow-none"
        >
          Edit
        </Button>
      }
    >
      <Box className="bg-white rounded-md md:px-5 pt-6 pb-8 !text-[13px]">
        <Grid container spacing={4} className="!px-3">
          <Grid item xs={12} md={5}>
            <Typography sx={{ fontWeight: "bold", mb: 2.5 }}>
              Description
            </Typography>
            <Box sx={{ pl: 0.2, pl: brk("md") && "0.5", mb: 0.5 }}>
              <TextDisplay title="Product Name" info={formData.prodName} />
              <TextDisplay
                title="Product Description"
                info={mySubstring(formData.prodInfo, 400)}
              />
            </Box>

            <Typography sx={{ fontWeight: "bold", my: 2.5 }}>
              Category
            </Typography>
            <Box sx={{ pl: 0.2, pl: brk("md") && "0.5", mb: 1.5 }}>
              <TextDisplay title="Category" info={formData.collectionName} />
              <TextDisplay
                title="Product Sub-Category"
                info={formData.subCollectionName}
              />
              <TextDisplay title="Product Class" info={formData.productGroup} />
            </Box>

            <Typography sx={{ fontWeight: "bold", mb: 1.5 }}>
              Pricing
            </Typography>
            <Box sx={{ pl: 0.2, pl: brk("md") && "0.5", mb: 2.5 }}>
              <TextDisplay info={formData.prodPrice} />
            </Box>

            <Typography sx={{ fontWeight: "bold", mb: 1.5 }}>
              Total In Stock
            </Typography>
            <Box sx={{ pl: 0.2, pl: brk("md") && "0.5", mb: 2.5 }}>
              <TextDisplay info={formData.totInStock} />
            </Box>

            <Typography sx={{ fontWeight: "bold", mb: 1.5 }}>
              Product Preference
            </Typography>
            <Box sx={{ pl: 0.2, pl: brk("md") && "0.5" }}>
              <TextDisplay
                title="Delivery"
                info={formData.delivery.join(", ")}
              />
            </Box>
          </Grid>
          {/* 




*/}
          <Grid item xs={12} md={7}>
            <Typography sx={{ fontWeight: "bold", mb: 1.5 }}>
              Product Media
            </Typography>
            <Box className="pl-2 md:pl-4 mb-5">
              <Box className="flex flex-col md:flex-row items-start mb-5 p-3 bg-gray-50 border rounded">
                {formData.video && (
                  <video className=" w-full md:w-52 md:h-40 relative" controls>
                    <source
                      // src="https://www.w3schools.com/html/mov_bbb.mp4"
                      src={formData.video}
                      type="video/mp4"
                    />
                    <div
                      onClick={() => {}}
                      className="text-[6px] flex items-center z-50 justify-center text-white absolute -mt-2 -mr-2 top-0 right-0 w-4 h-4 rounded-full bg-red-500"
                    >
                      <IconifyIcon icon="tabler:trash" fontSize={16} />
                    </div>
                  </video>
                )}
                <Box className="flex items-center flex-wrap">
                  {formData.images.map((each, i) => (
                    <Box className="relative w-24 h-24 m-3" key={i}>
                      <img
                        className="w-full h-full rounded-md"
                        alt={each.name}
                        src={each.image}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {specWithSize?.includes(specInfo?.label) && (
              <>
                <Typography className="font-black mb-5">Select Size</Typography>
                <Box className="pl-2 md:pl-4 mb-4">
                  <SizeComponent
                    selectedSizes={selectedSizes}
                    setSelectedSizes={setSelectedSizes}
                  />
                </Box>

                {selectedSizes.length > 0 && (
                  <Typography className="font-black mb-5">
                    Select Quantity
                  </Typography>
                )}
                <Box className="pl-2 md:pl-4 mb-4">
                  <QuantityComponent
                    selectedSizes={selectedSizes}
                    setSelectedSizes={setSelectedSizes}
                  />
                </Box>

                {selectedSizes.length > 0 && (
                  <Typography className="font-black mb-5">
                    Select Color
                  </Typography>
                )}
                <Box className="pl-2 md:pl-4 mb-4">
                  <ColorComponent
                    selectedSizes={selectedSizes}
                    setSelectedSizes={setSelectedSizes}
                  />
                </Box>
              </>
            )}
            {formData.specifications && (
              <Box className="mt-4">
                <Box className="px-4 !mb-14">
                  {Object.keys(formData.specifications).map((val) => {
                    return (
                      <Box>
                        {val.replace("_", " ")} : {formData.specifications[val]}{" "}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Grid>
          {/* 



*/}
        </Grid>
      </Box>
    </StoreLeftSideBar>
  );
};

export default AddNewProduct;
