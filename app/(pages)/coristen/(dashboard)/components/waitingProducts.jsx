import { OrderActionBtn } from "@/app/(pages)/order/[detail]/components";
import IconifyIcon from "@/app/components/icon";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

export const OrderProductView = ({
  image,
  product,
  totalAmount,
  productName,
  orderSlug,
  orderId,
  createdAt,
  store,
  status,
  mutateStatus,
}) => {
  const dispatch = useDispatch();
  const TitleValue = ({ title, value, allowCopy }) => (
    <Box className="flex items-center">
      <Typography variant="body2" className="!text-xs">
        {title} <span className="ml-2 !text-black">{value}</span>
      </Typography>
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
                View Product
              </Typography>
              <IconifyIcon
                icon="tabler:chevron-right"
                className="text-[14px] !ml-3"
              />
            </Box>
          </Link>
          <Box className="h-5 border mx-2 md:mx-4"></Box>
          <Box className="flex items-center cursor-pointer" onClick={() => {}}>
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
        <Box className="flex items-start w-full">
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
            <Box className="flex items-center">
              <Typography
                variant="body2"
                className="!font-semibold !text-black !text-[12px] md:!text-[16px] !mb-1 md:!mb-2"
              >
                {productName}
              </Typography>
            </Box>
            <TitleValue
              title="Order date:"
              value={formatDateToMonthShort(createdAt)}
            />
            <Box className="md:flex items-center">
              <TitleValue title="Order ID:" value={orderSlug} allowCopy />
              <span className="hidden md:block px-5"></span>
              <TitleValue
                title="No of Images:"
                value={product?.length || 0}
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
              NGN{totalAmount}
            </Typography>
          </Box>
          <Box className="flex items-center flex-nowrap !mt-3 md:!mt-6 !ml-20">
            <Button
              variant="outlined"
              className="w-32 h-9 md:h-10 !mr-4 !rounded-full !text-[14px] !shadow-none"
            >
              Track items
            </Button>

            <OrderActionBtn
              action={status?.toLowerCase()}
              orderId={orderId}
              variant="contained"
              mutateStatus={mutateStatus}
            />
          </Box>
        </Box>
      </Box>
      {/* <OrderStages
        at={trackMainSteps[status?.toLowerCase()?.replaceAll(" ", "_")] || 0}
        price={totalAmount}
        delivery={deliveryMedium}
      /> */}
    </Box>
  );
};
