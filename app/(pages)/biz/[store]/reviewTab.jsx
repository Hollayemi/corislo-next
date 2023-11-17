import OptionsMenu from "@/app/components/option-menu";
import { RoundedPicWithName } from "@/app/components/view/home/Components/Footer";
import { useState } from "react";
import useSWR from "swr";

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

export const ReviewTab = ({ productId }) => {
  const [page, setPage] = useState(10);
  const [option, setOption] = useState("March 2023 - October 2023");
  const { data, loading, error } = useSWR(
    `/user/brief-feedback?prodId=${productId}`
  );

  const { data: review, loading: reviewLoading } = useSWR(
    `/user/feedback?prodId=${productId}&limit=${page}&offset=${0}`
  );

  console.log(data, loading, error);
  const brief = data && !loading ? data.data[0] : {};
  const reviews = review && !reviewLoading ? review.data : [];

  console.log(reviews);
  return brief ? (
    <Box className="w-full">
      <Box className="flex items-center justify-between px-2 py-4 md:!px-8 md:py-6">
        <Typography variant="body2" className="!font-bold !text-[14px]">
          Review
        </Typography>
        <Box>
          <OptionsMenu
            icon={
              <Button
                variant="outlined"
                className="!text-xs !rounded-full !text-blue-600"
              >
                {option}
              </Button>
            }
            options={[
              "January 2021 - December 2021",
              "March 2022 - October 2022",
              "March 2023 - October 2023",
            ]}
            setOption={setOption}
            iconButtonProps={{
              size: "small",
              sx: { color: "text.disabled", cursor: "pointer" },
              disableRipple: true,
            }}
          />
        </Box>
      </Box>
      <Box className="flex flex-wrap md:flex-nowrap justify-evenly border-b py-6 pl-6 md:px-10">
        {/* <Box className="flex justify-between w-full"> */}
        <Box className="flex flex-col w-1/2 md:w-1/3 items-start">
          <Typography variant="caption" className="!font-bold !text-xs">
            Total Reviews
          </Typography>
          <Typography variant="body2" className="!font-bold !text-3xl !mt-3">
            {brief?.totalReviews || 524}
          </Typography>
          <Typography variant="caption" className="!text-xs">
            Growth on reviews this year
          </Typography>
        </Box>
        <Box className="flex flex-col w-1/2 md:w-1/3 items-start">
          <Typography variant="caption" className="!font-bold !text-xs">
            Average Rating
          </Typography>
          <Box className="!flex items-center !mt-3">
            <Typography variant="body2" className="!font-bold !text-3xl !mr-3">
              {brief?.averageRating?.toFixed(1) || 4.7}
            </Typography>
            <Rating
              defaultValue={brief?.averageRating || 1}
              className=""
              name="size-small"
              size="small"
            />
          </Box>
          <Typography variant="caption" className="!text-xs">
            Average rating this year
          </Typography>
        </Box>
        {/* </Box> */}
        <Box className="flex flex-col w-full md:w-1/3 items-start">
          <RatingDisplayLength
            rate={5}
            percentage={calcPercentage(brief?.totalReviews, brief[5])}
            freq={brief[5]}
          />
          
          <RatingDisplayLength
            rate={4}
            percentage={calcPercentage(brief?.totalReviews, brief[4])}
            freq={brief[4]}
          />
          <RatingDisplayLength
            rate={3}
            percentage={calcPercentage(brief?.totalReviews, brief[3])}
            freq={brief[3]}
          />
          <RatingDisplayLength
            rate={2}
            percentage={calcPercentage(brief?.totalReviews, brief[2])}
            freq={brief[2]}
          />
          <RatingDisplayLength
            rate={1}
            percentage={calcPercentage(brief?.totalReviews, brief[1])}
            freq={brief[1]}
          />
        </Box>
      </Box>

      <Box className="h-[2px] border-gray-300 !my-4 !mb-10"></Box>
      {reviews.map((item, i) => (
        <StarsAndReviews
          stars={item.rate}
          key={i}
          review={item.review}
          date={item.createdAt}
          user={{
            name: `${item.lastname} ${item.firstname}`,
            country: item.country,
            image: "/images/avatar/2.png",
          }}
        />
      ))}
      <StarsAndReviews
        stars={4}
        review="I bought this adorable set for my son's birthday, and it's even cuter in person! The fabric is soft and comfortable, and the colors haven't faded after multiple washes. It fits true to size, and my little one loves wearing it. Will definitely be purchasing more from MamaFeeds!"
        date={new Date()}
        user={{
          name: "Amuroko Joy",
          country: "United State",
          image: "/images/avatar/3.png",
        }}
      />
      <StarsAndReviews
        stars={4}
        review="I bought this adorable set for my son's birthday, and it's even cuter in person! The fabric is soft and comfortable, and the colors haven't faded after multiple washes. It fits true to size, and my little one loves wearing it. Will definitely be purchasing more from MamaFeeds!"
        date={new Date()}
        user={{
          name: "Stephen Olayemi",
          country: "Canada",
          image: "/images/avatar/5.png",
        }}
      />
      <StarsAndReviews
        stars={4}
        review="I bought this adorable set for my son's birthday, and it's even cuter in person! The fabric is soft and comfortable, and the colors haven't faded after multiple washes. It fits true to size, and my little one loves wearing it. Will definitely be purchasing more from MamaFeeds!"
        date={new Date()}
        user={{
          name: "Tolulope Gbenga",
          country: "India",
          image: "/images/avatar/4.png",
        }}
      />
      {brief?.totalReviews > page && (
        <Box className="flex justify-center !mt-10">
          <Button
            variant="contained"
            size="large"
            className="!rounded-full !h-98 !w-40 !text-xs"
            onClick={() => setPage((prev) => prev + 10)}
          >
            See More
          </Button>
        </Box>
      )}
    </Box>
  ) : (
    <Box className="flex items-center justify-center h-80 text-md">
      No Reviews Yet
    </Box>
  );
};
