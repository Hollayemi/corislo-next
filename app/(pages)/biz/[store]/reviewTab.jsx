import OptionsMenu from '@/app/components/option-menu'
import MyPagination from '@/app/components/templates/pagination'
import { RoundedPicWithName } from '@/app/components/view/home/Components/Footer'
import { useState } from 'react'
import useSWR from 'swr'

const { formatDate } = require('@/app/utils/format')
const { Box, Typography, Rating, Button } = require('@mui/material')

const RatingDisplayLength = ({ rate, percentage, freq }) => {
  const getcolor = (color) => {
    if (color >= 85) {
      return 'green'
    }

    if (color >= 70) {
      return 'teal'
    }

    if (color >= 50 && color < 70) {
      return 'blue'
    }

    if (color > 30 && color < 50) {
      return 'gray'
    }

    if (color <= 30) {
      return 'red'
    }
  }
  return (
    <Box className="flex items-center !mt-3 md:!mt-0">
      <Typography variant="body2" className="text-[13px] flex-shrink-0">
        {rate}
      </Typography>
      <Box className="flex-grow relative w-60 md:w-44 !mx-2 bg-gray-50">
        <Box
          bgcolor={getcolor(percentage)}
          className={` h-1 !rounded-md`}
          sx={{ width: `${percentage}%` }}
        ></Box>
      </Box>
      <Typography variant="body2" className="text-[13px] flex-shrink-0">
        {freq} Ratings
      </Typography>
    </Box>
  )
}

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
  )
}

const calcPercentage = (total, numOfOccurences) => {
  if (total === 0) {
    return 0 // Handle division by zero
  }

  const percentage = (numOfOccurences / total) * 100
  return percentage
}

export const ReviewTab = ({ summary, searchParams }) => {
  const [page, setPage] = useState(10)
  const [option, setOption] = useState('March 2023 - October 2023')

  const { review, average, sum, ...others } = summary

  return summary?.reviews?.length ? (
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
              'January 2021 - December 2021',
              'March 2022 - October 2022',
              'March 2023 - October 2023',
            ]}
            setOption={setOption}
            iconButtonProps={{
              size: 'small',
              sx: { color: 'text.disabled', cursor: 'pointer' },
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
            {sum || 0}
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
              {average.toFixed(1) || 4.7}
            </Typography>
            <Rating
              defaultValue={average || 0}
              className=""
              readOnly
              precision={0.1}
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
          {Array(5)
            .fill()
            .map((_, i) => (
              <RatingDisplayLength
                key={i}
                rate={i + 1}
                percentage={calcPercentage(sum, summary[i + 1])}
                freq={summary[i + 1]}
              />
            ))
            .reverse()}
        </Box>
      </Box>

      <Box className="h-[2px] border-gray-300 !my-4 !mb-10"></Box>
      {summary?.reviews?.map((item, i) => (
        <StarsAndReviews
          stars={item.rate}
          key={i}
          review={item.message}
          date={item.date}
          user={{
            name: `${item.username}`,
            country: 'Nigeria',
            image: item.picture || `/images/misc/no-profile.png`,
          }}
        />
      ))}
      <Box className="flex justify-center mt-6">
        <MyPagination
          searchParams={searchParams}
          currentPage={searchParams?.page || 1}
          totalNumber={sum || 0}
          limit={7}
          query="page"
        />
      </Box>
    </Box>
  ) : (
    <Box className="flex items-center justify-center h-80 text-md">
      No Reviews Yet
    </Box>
  )
}
