"use client";
import IconifyIcon from "@/app/components/icon";
import UserWrapper from "@/app/components/view/home";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { EmojiRating } from "../[detail]/page";
import { feedbackHandler } from "@/app/redux/state/slices/home/feedback";
import { useDispatch } from "react-redux";

const PendingReviews = () => {
  const { data, isLoading } = useSWR("/user/pending-reviews");
  const products = data ? data.data : [];
  console.log(products);
  return (
    <UserWrapper>
      <Box className="!px-2 my-5 sm:!px-16 md:!px-24 lg:!px-32 md:!py-7 relative">
        <Box className="flex justify-center">
          <Box className="bg-white md:shadow-md !px-2 py-3 h-auto md:h-[500px] overflowStyle overflow-auto rounded-md w-full md:w-4/5 md:!px-5">
            {products.map((each, i) => (
              <OrderProductPrev
                key={i}
                _id={each._id}
                prodName={each.storeProducts.prodName || "Product bane Nua"}
                image={`/images/more/${i + 1}.png`}
                prodPrice={each.storeProducts.prodPrice}
                quantity={each.storeProducts.quantity}
                others={each.storeProducts}
                store={each.store}
                branch={each.branch}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </UserWrapper>
  );
};

export default PendingReviews;

export const OrderProductPrev = ({
  _id,
  image,
  quantity,
  prodName,
  prodPrice,
  branch,
  store,
  others,
}) => {
  const [open, setOpen] = useState(false);
  const payload = {
    productId: others.prodId,
    orderItemId: _id,
    store,
    branch,
  };
  return (
    <Box
      className={`${!open ? "h-24" : "h-[480px]"
        } transition-all  overflow-hidden`}
    >
      <Box
        className="flex items-start py-3 w-full relative"
        onClick={() => setOpen(!open)}
      >
        <Box className={`flex items-center w-full pr-6`}>
          <Box className="flex items-start w-full">
            <img
              src={image || "/images/more/2.png"}
              alt="prod_image"
              width={150}
              height={150}
              className="w-20 h-20 flex-shrink-0 !rounded-xl"
            />
            <Box className={`!px-3 w-10/12 relative`}>
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
                NGN {prodPrice.toFixed(2).toLocaleString()}
              </Typography>
              <Box className="flex items-center">
                <Typography
                  variant="body2"
                  className="!text-gray-500 !text-[12px]"
                >
                  quantity: {quantity}
                </Typography>
                {others.discount && (
                  <Typography
                    variant="body2"
                    className="!text-red-500 !ml-2 !text-[12px]"
                  >
                    {others.discount}% discount
                  </Typography>
                )}
              </Box>
              <Box className="flex items-center">
                <Typography
                  variant="body2"
                  className="!text-[11px] !text-blue-800"
                >
                  {store}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <IconifyIcon
          icon="tabler:chevron-down"
          className="!mt-[20px] !flex-shrink-0 absolute top-6 right-2"
        />
      </Box>
      {<ReviewInput payload={payload} />}
    </Box>
  );
};

const ReviewInput = ({ bgcolor, payload }) => {
  const dispatch = useDispatch();
  const [mouseOn, setMouseOn] = useState(-1);
  const [review, setReview] = useState("");
  const emojis = ["Bad", "Poor", "Average", "Good", "Best"];
  return (
    <Box
      className="w-full rounded-md py-5 !px-2 md:!px-4 mt-2 mb-10"
      bgcolor={bgcolor || "custom.bodyGray"}
    >
      <Typography variant="caption" className="!text-black !text-[13px]">
        How was your experience with this product?
      </Typography>
      <Box className="flex items-center mt-3">
        {emojis.map((tag, i) => (
          <EmojiRating
            name={tag}
            index={i}
            key={i}
            mouseOn={mouseOn}
            setMouseOn={setMouseOn}
          />
        ))}
      </Box>

      <Box className="mt-5">
        <textarea
          onChange={(e) => setReview(e.target.value)}
          value={review}
          placeholder="Write about your experience in this section"
          className="w-full h-32 rounded !px-5 py-3 resize-none outline-none border  focus:border-blue-800 focus:border-2"
        ></textarea>

        <Button
          variant="contained"
          fullWidth
          className="!rounded-md !text-[14px] !h-10 !shadow-none !mt-3"
          onClick={() =>
            feedbackHandler(
              {
                ...payload,
                review,
                rate: mouseOn,
              },
              dispatch
            )
          }
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};
