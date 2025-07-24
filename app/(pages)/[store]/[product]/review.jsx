import OptionsMenu from "@/app/components/option-menu";
import { RoundedPicWithName } from "@/app/components/view/home/Components/Footer";
import { useState } from "react";
import useSWR from "swr";
import { ReviewTab } from "../reviewTab";

const { formatDate } = require("@/app/utils/format");
const { Box, Typography, Rating, Button } = require("@mui/material");

const RatingDisplayLength = ({ rate, percentage, freq }) => {
  const getcolor = (color) => {
    if (color >= 85) {
      return "green";
    }

    if (color >= 70) {
      return "erd";
    }

    if (color >= 50 && color < 70) {
      return "slate";
    }

    if (color > 30 && color < 50) {
      return "gray";
    }

    if (color <= 30) {
      return "red";
    }
  };
  return (
    <Box className="flex items-center !mt-3 md:!mt-0">
      <Typography variant="body2" className="text-[13px] flex-shrink-0">
        {rate}
      </Typography>
      <Box className="flex-grow relative w-60 md:w-44 !mx-2 bg-gray-50">
        <Box
          className={`bg-${getcolor(percentage)}-500 h-1 !rounded-md`}
          sx={{ width: `${percentage}%` }}
        ></Box>
      </Box>
      <Typography variant="body2" className="text-[13px] flex-shrink-0">
        {freq} Ratings
      </Typography>
    </Box>
  );
};

const StarsAndReviews = ({ stars, review, date, user }) => {
  return (
    <Box className="flex flex-col md:flex-row items-start !mb-8 md:px-6">
      <Box className="mb-2 md:mb-0 md:!w-60 overflow-hidden flex-shrink-0">
        <RoundedPicWithName
          className="!text-[10px]"
          name={user.name}
          caption={user.country}
          pic={user.image}
        />
      </Box>
      <Box className="md:w-full">
        <Box className="flex items-center !mb-3">
          <Rating
            defaultValue={stars}
            className=""
            readOnly
            name="size-small"
            size="small"
          />
          <Typography variant="caption" className="!text-sm !ml-4">
            {formatDate(date)}
          </Typography>
        </Box>
        <Typography variant="caption" className="!text-[12px] ">
          {review}
        </Typography>
      </Box>
    </Box>
  );
};

const calcPercentage = (total, numOfOccurences) => {
  if (total === 0) {
    return 0; // Handle division by zero
  }

  const percentage = (numOfOccurences / total) * 100;
  return percentage;
};

export const Review = ({ productId, searchParams }) => {
  const [page, setPage] = useState(10);
  const [option, setOption] = useState("March 2023 - October 2023");

  const { data, isLoading } = useSWR(
    `/product/feedback/${productId}?page=${searchParams?.page || 1}`
  );
  const summary = data && !isLoading ? data?.data[0] : {};

  return <ReviewTab summary={summary} />;
};
