"use client";
import { Box, Button, Rating, Typography } from "@mui/material";
import React, { useState } from "react";
import { ReviewTab } from "./reviewTab";
import IconifyIcon from "@/app/components/icon";
import { useUserData } from "@/app/hooks/useData";
import { shopFeedbackHandler } from "@/app/redux/state/slices/home/feedback";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const Review = ({ store, branch, searchParams }) => {
  const { isOffline } = useUserData();
  const dispatch = useDispatch();
  const { data, isLoading } = useSWR(`/store/feedback/${store}/${branch}?page=${searchParams?.page || 1}`);
  const summary = data && !isLoading ? data?.data[0] : {};

  const [review, setReview] = useState("");
  const [star, setStar] = useState(0);
  const feedbackPayload = {
    review,
    rate: star,
    store,
    branch,
  };
  return (
    <Box>
      <Box className="!bg-white rounded-xl px-3 py-5 mt-10">
        <ReviewTab
          store={store}
          branch={branch}
          summary={summary}
          searchParams={searchParams}
        />
      </Box>
      {!isOffline && (
        <Box className="!bg-white rounded-xl px-3 md:px-10 py-8 mt-6">
          <Typography variant="body2" className="!font-bold !text-xl">
            Rate this store
          </Typography>
          <Typography variant="body2" className="!text-[12px]">
            Tell others what you think
          </Typography>
          <Rating
            defaultValue={0}
            onChange={(e, t) => setStar(t)}
            className="py-6"
            name="large"
            size="large"
          />

          <textarea
            type="text"
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your own review"
            className="border border-gray-100 w-full h-24 !rounded-md p-4"
          ></textarea>
          <Box className="flex justify-end">
            <Button
              variant="contained"
              className="!w-full md:!w-32 !shadow-none !rounded-md"
              onClick={() => shopFeedbackHandler(feedbackPayload, dispatch)}
            >
              Send
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Review;
