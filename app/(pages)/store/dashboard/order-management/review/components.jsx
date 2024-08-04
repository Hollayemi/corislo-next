import IconifyIcon from "@/app/components/icon";
import { formatCurrency } from "@/app/utils/format";
import { Box, Typography } from "@mui/material";

export const ProductPrev = ({
  _id,
  image,
  quantity,
  prodName,
  prodPrice,
  branch,
  store,
  others,
}) => {
  return (
    <Box className="h-28 border- ">
      <Box className="flex items-start pb-4 py-3 w-full relative">
        <Box className={`flex items-center w-full pr-6`}>
          <Box className="flex items-start w-full">
            <img
              src={image || "/images/more/2.png"}
              alt="prod_image"
              width={150}
              height={150}
              className="w-20 h-20 flex-shrink-0 !rounded-xl"
            />
            <Box className={`px-3 w-1/2 md:w-10/12 min-w-40 relative`}>
              <Typography
                variant="body2"
                noWrap
                className="!font-semibold !text-[14px]"
              >
                {prodName}
              </Typography>
              <Typography
                variant="body2"
                className="!font-extrabold !text-black !text-[16px] !-mb-px !p-0"
              >
                NGN {prodPrice?.toFixed(2)?.toLocaleString()}
              </Typography>
              <Box className="flex items-center mt-3">
                <Typography
                  variant="body2"
                  className="!text-gray-500 !text-[12px]"
                >
                  quantity: {quantity}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {others?.discount ? (
          <Typography
            variant="body2"
            className="!text-red-500 !ml-2 !text-[12px]"
          >
            {others.discount}% discount
          </Typography>
        ) : (
          <Typography
            variant="body2"
            className="text-center !ml-2 !text-[12px]"
          >
            No discount Applied
          </Typography>
        )}
      </Box>
    </Box>
  );
};


export const OrderSummary = ({ title, info, price, bold }) => {
  return (
    <Box className="flex items-center justify-between">
      <Typography className={`${bold && "!font-bold !mt-2"} !text-[14px] !mb-2`}>{title}</Typography>

      <Box className="flex items-center justify-between w-1/2">
        <Typography className=" !text-[14px] !mb-2 ">{info}</Typography>
        <Typography className={`${bold && "!font-bold !mt-2"} !text-[14px] !mb-2`}>
          {formatCurrency(price)}
        </Typography>
      </Box>
    </Box>
  );
};

export const IconValue = ({ icon, value }) => {
    return (
      <Box className="flex items-center !text-gray-400 mb-2">
        <IconifyIcon icon={icon} className="!text-inherit !mr-3" />
        <Typography className={`!text-[14px] !text-inherit`}>
          {value}
        </Typography>
      </Box>
    );
}