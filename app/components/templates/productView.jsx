import {
  Box,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
} from "@mui/material";
import Image from "next/image";
import IconifyIcon from "../icon";
import { useDispatch } from "react-redux";
import {
  addCartHandler,
  changeQuantity,
} from "@/app/redux/state/slices/home/cart";
import {
  getCommonValuesInArrays,
  removeOrAddToArray,
} from "@/app/utils/arrayFunctions";
import OptionsMenu from "../option-menu";
import { formatDateToMonthShort } from "@/app/utils/format";
import Link from "next/link";
import { copyToClipboard } from "@/app/utils/clipboard";
import { deleteOrder } from "@/app/redux/state/slices/home/order";

export const CartProductView = ({
  image,
  quantity,
  prodName,
  prodPrice,
  branch,
  store,
  cartId,
  productId,
  hideCheckbox,
  hideQtyFunc,
  selected,
  selectCart,
}) => {
  const colorArray = [
    "#eefabb",
    "#aecabb",
    "#eabdbb",
    "#beea45",
    "#afedda",
    "#34ee",
    "#000",
  ];
  const dispatch = useDispatch();
  const payload = {
    productId: productId,
    store,
    branch,
  };
  return (
    <Box className="flex items-start py-3 w-full relative">
      <Box
        className={`flex items-center w-full ${hideQtyFunc ? "pr-4" : "pr-20"}`}
      >
        {!hideCheckbox && (
          <FormControlLabel
            className="!mt-2 md:w-8"
            onChange={(e) =>
              removeOrAddToArray(productId, selected, selectCart)
            }
            control={
              <Checkbox
                checked={selected.includes(productId)}
                disabled={false}
                name="basic-checked"
              />
            }
          />
        )}
        <Box className="flex items-start w-full">
          <Image
            src={image || "/images/more/2.png"}
            alt="prod_image"
            width={150}
            height={150}
            className="w-20 h-20 flex-shrink-0 !rounded-xl"
          />
          <Box
            className={`px-3 ${hideQtyFunc ? "w-10/12" : "w-8/12"} relative`}
          >
            <Typography
              variant="body2"
              noWrap
              className="!font-semibold !text-[14px]"
            >
              {prodName}
            </Typography>
            <Box className="flex items-center">
              <Typography
                variant="body2"
                className="!text-[10px] !text-gray-300"
              >
                colors
              </Typography>
              <Box className="flex items-center ml-2 relative">
                {colorArray.map((col, i) => (
                  <Box
                    bgcolor={col}
                    key={i}
                    className={`w-3 h-3 rounded-full border border-white`}
                  ></Box>
                ))}
              </Box>
            </Box>
            <Typography
              variant="body2"
              className="!font-extrabold !text-black !text-[16px] !my-px !p-0"
            >
              NGN {(prodPrice * (quantity || 1)).toFixed(2).toLocaleString()}
            </Typography>
            <Typography variant="body2" className="!text-[11px] !text-blue-800">
              {store}
            </Typography>
          </Box>
        </Box>
      </Box>
      {!hideQtyFunc && (
        <Box className="w-20 absolute top-2 right-0 mr-2">
          <Box
            className="float-right mb-10 md:mb-6"
            onClick={() => addCartHandler(payload, dispatch)}
          >
            <IconifyIcon
              icon="tabler:trash"
              className="!text-[18px] !text-red-600"
            />
          </Box>
          <Box className="flex justify-between w-full my-2.5 md:my-0.5">
            <Box
              onClick={() =>
                changeQuantity({ id: cartId, operator: "+" }, dispatch)
              }
              className="h-6 w-6 rounded-full cursor-pointer !text-[14px] border border-blue-800 !font-black flex items-center justify-center"
            >
              +
            </Box>
            <Typography
              variant="caption"
              className="!text-[15px] !text-blue-800"
            >
              {quantity}
            </Typography>
            <Box
              onClick={() =>
                changeQuantity({ id: cartId, operator: "-" }, dispatch)
              }
              className="h-6 w-6 rounded-full cursor-pointer !text-[14px] border border-blue-800 !font-black flex items-center justify-center"
            >
              -
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export const GroupCartProducts = ({
  store,
  branch,
  branchPrice,
  updatePayload,
  payload,
  pickers,
}) => {
  const getCommonDeliveryMethods = getCommonValuesInArrays(
    ...branch.map((x) => x.product.delivery || ["pickup"])
  );
  const deliveryType = payload.delivery[store];
  const picker = payload.picker[store];
  return (
    <Box>
      <Box className="w-full flex justify-between items-center !mt-5">
        <Typography
          variant="body2"
          className="!text-[15px] !font-bold !text-blue-800"
        >
          {store}
        </Typography>
        {deliveryType === "waybilling" ? (
          <Typography variant="body2" className="!text-[13px] !font-bold">
            {`${deliveryType} fee: ${branchPrice}` || "Pickup"}
          </Typography>
        ) : (
          <OptionsMenu
            icon={
              <Button
                variant="outlined"
                className="!text-xs !rounded-full !text-blue-600"
                endIcon={
                  <IconifyIcon
                    icon="tabler:chevron-down"
                    className="!ml-3 !text-[14px]"
                  />
                }
              >
                {picker || "You"}
              </Button>
            }
            options={pickers?.map((x) => x?.fullname)}
            setOption={(x) =>
              updatePayload((prev) => {
                return { ...prev, picker: { ...prev.picker, [store]: x } };
              })
            }
            iconButtonProps={{
              size: "small",
              sx: { color: "text.disabled", cursor: "pointer" },
              disableRipple: true,
            }}
          />
        )}
      </Box>

      <Box className="px-2 !mt-4">
        {branch.map((each, i) => (
          <CartProductView
            key={i}
            prodName={each.product.prodName}
            image={`/images/more/${i + 1}.png`}
            prodPrice={each.product.prodPrice}
            quantity={each.quantity}
            hideCheckbox
            hideQtyFunc
          />
        ))}

        <OptionsMenu
          icon={
            <Box className="flex items-center justify-between py-4 w-full cursor-pointer">
              <Box className="text-left">
                <Typography variant="body2" className="!text-[13px]">
                  <span className="!font-bold !text-gray-600 mr-3">
                    Shipping Method:
                  </span>{" "}
                  {deliveryType || "Pickup"}
                </Typography>
                <Typography
                  variant="body2"
                  className="!text-[11px] !text-gray-400"
                >
                  Delivery is between July 26 and August 1 (7 - 13 Days).
                </Typography>
              </Box>
              <IconifyIcon
                icon="tabler:chevron-right"
                className="text-[14px]"
              />
            </Box>
          }
          options={getCommonDeliveryMethods}
          setOption={(x) =>
            updatePayload((prev) => {
              return { ...prev, delivery: { ...prev.delivery, [store]: x } };
            })
          }
          iconButtonProps={{
            size: "small",
            sx: { color: "text.disabled", cursor: "pointer" },
            disableRipple: true,
            className: "!w-full",
          }}
        />
      </Box>
    </Box>
  );
};

export const OrderProductView = ({
  clipboard,
  setIsCopied,
  image,
  product,
  orderSlug,
  orderId,
  createdAt,
  store,
  status,
}) => {
  const dispatch = useDispatch()
  const TitleValue = ({ title, value, allowCopy }) => (
    <Box className="flex items-center">
      <Typography variant="body2" className="!text-xs">
        {title} <span className="ml-2 !text-black">{value}</span>
      </Typography>
      {allowCopy && (
        <IconifyIcon
          icon={clipboard === value ? "tabler:clipboard-check" : "tabler:copy"}
          className="ml-2"
          onClick={() => copyToClipboard(value, setIsCopied)}
        />
      )}
    </Box>
  );
  return (
    <Box className="px-1.5 md:px-6 pb-2 rounded-md bg-white mb-5">
      <Box className="flex justify-between px-3 items-center py-5 border-b-2">
        <Typography
          variant="body2"
          className="!text-[13px] !font-semibold !text-gray-900"
        >
          {status}
        </Typography>
        <Box className="flex justify-evenly items-center">
          <Link href={`/order/${orderId}`}>
            <Box className="flex items-center cursor-pointer">
              <Typography
                variant="body2"
                className="!text-[11px] !text-gray-600"
              >
                Order Details
              </Typography>
              <IconifyIcon
                icon="tabler:chevron-right"
                className="text-[14px] !ml-3"
              />
            </Box>
          </Link>
          <Box className="h-5 border mx-2 md:mx-4"></Box>
          <Box
            className="flex items-center cursor-pointer"
            onClick={() => deleteOrder(orderId, dispatch)}
          >
            <IconifyIcon
              icon="tabler:trash"
              className="text-[14px] !mx-1 !text-red-500"
            />
            <Typography
              variant="body2"
              className="!text-[11px] !text-red-500 hidden md:block"
            >
              Delete
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="flex flex-col md:flex-row items-start w-full my-3 relative">
        <Box className="flex items-start">
          <Image
            src={image || "/images/more/2.png"}
            alt="prod_img"
            width={150}
            height={150}
            className="w-20 h-20 md:w-24 md:h-28 flex-shrink-0 !rounded-xl"
          />
          <Box className={`px-3  md:w-8/12 relative`}>
            <Typography
              variant="body2"
              className="!text-[11px] !text-blue-900 !mb-2"
            >
              {store}
            </Typography>
            <Typography
              variant="body2"
              className="!font-semibold !text-black !text-[12px] md:!text-[16px] !mb-1 md:!mb-2"
            >
              {product.prodName}
            </Typography>

            <TitleValue
              title="Order date:"
              value={formatDateToMonthShort(createdAt)}
            />
            <Box className="md:flex items-center">
              <TitleValue title="Order ID:" value={orderSlug} allowCopy />
              <span className="hidden md:block px-5"></span>
              <TitleValue
                title="No of Products:"
                value={product.quantity || 0}
              />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className="flex md:justify-end">
            <Typography
              variant="body2"
              className="!font-extrabold !text-black md:!text-[16px] !-mt-1 md:!my-px !p-0 absolute md:relative !pr-2 md:!pr-0 top-0 right-0"
            >
              NGN{product.prodPrice?.toLocaleString()}
            </Typography>
          </Box>
          <Box className="flex items-center flex-nowrap !mt-3 md:!mt-6">
            <Button
              variant="outlined"
              className="w-32 h-9 md:h-10 !rounded-full !text-[14px] !shadow-none"
            >
              Track items
            </Button>
            <Button
              variant="contained"
              className="w-32 h-9 md:h-10 !rounded-full !text-[14px] !shadow-none !ml-4"
            >
              Re - order
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
