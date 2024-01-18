/* eslint-disable @next/next/no-img-element */
// ** MUI Imports
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MuiTimeline from "@mui/lab/Timeline";
import IconifyIcon from "@/app/components/icon";
import { formatCurrency, formatDate } from "@/app/utils/format";
import { Box, Typography } from "@mui/material";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
// ** Icon Imports
import Icon from "@/app/components/icon";
import { timelineData } from "@/app/data/home/homepage";

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  "& .MuiTimelineItem-root": {
    width: "100%",
    "&:before": {
      display: "none",
    },
  },
});

// Styled component for the image of a shoe
const ImgShoe = styled("img")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

const TimelineLeft = () => {
  const getStatus = {
    completed: "success",
    waiting: "text",
    processing: "warning",
  };

  return (
    <Timeline>
      {timelineData.map((item, i) => (
        <TimelineItem key={i}>
          <TimelineSeparator>
            <TimelineDot color={getStatus[item.status]} />
            <TimelineConnector color={getStatus[item.status]} />
          </TimelineSeparator>
          <TimelineContent sx={{ "& svg": { verticalAlign: "bottom", mx: 4 } }}>
            <Box
              sx={{
                mb: 2,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body2"
                sx={{ mr: 2, fontWeight: 600, color: "text.primary" }}
              >
                {item.action}
              </Typography>
              <Typography variant="caption">{formatDate(item.date)}</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              {item.info}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default TimelineLeft;



export const OrderStages = ({ date, price, at, status }) => {
  const Stage = ({ at = 0 }) => {
    const pickIcon = {
      0: { icon: "tabler:currency-dollar", name: "Paid" },
      1: { icon: "tabler:box", name: "Packaged" },
      2: { icon: "tabler:truck-delivery", name: "Shipped" },
      3: { icon: "tabler:box-seam", name: "Received" },
      4: { icon: "tabler:star-filled", name: "Review" },
    };
    const state = {
      1: "!text-white  !bg-black",
      2: "!text-white  !bg-blue-700",
      3: " !text-black !bg-gray-100",
    };

    return (
      <Box className="flex items-center">
        {Array(5)
          .fill()
          .map((_, index) => (
            <Box key={index} className="flex items-center w-full">
              <Box className="relative">
                <Box
                  className={`!w-8 !h-8 flex items-center justify-center !rounded-full ${
                    at === index ? state[2] : at > index ? state[1] : state[3]
                  }`}
                >
                  <IconifyIcon icon={pickIcon[index].icon} />
                </Box>
                <Typography
                  variant="body2"
                  className="!text-[13px] absolute text-center !mt-3"
                >
                  {pickIcon[index].name}
                </Typography>
              </Box>
              {index !== 4 && (
                <Box
                  className={`!w-8 min-w-fit !h-1 flex-grow ${
                    at === index ? state[2] : at > index ? state[1] : state[3]
                  }`}
                ></Box>
              )}
            </Box>
          ))}
      </Box>
    );
  };
  return (
    <Box>
      {/* <Box className="flex items-center mt-4">
        <Box className="!mx-8 !text-center">
          <Typography variant="caption" className="!font-normal !text-[13px]">
            Order
          </Typography>
          <br />
          <Typography
            variant="caption"
            className="!font-normal !text-[13px] !mt-3"
          >
            {status}
          </Typography>
        </Box>
        <Box className="!mx-8 !text-center">
          <Typography variant="caption" className="!font-normal !text-[13px]">
            Amount
          </Typography>
          <br />
          <Typography
            variant="caption"
            className="!font-normal !text-[14px] !mt-3"
          >
            USD {formatCurrency(price, "USD", "US")}
          </Typography>
        </Box>
        <Box className="!mx-8 !text-center">
          <Typography variant="caption" className="!font-normal !text-[13px]">
            Order
          </Typography>
          <br />
          <Typography
            variant="caption"
            className="!font-normal !text-[13px] !mt-3"
          >
            {formatDate(date)}
          </Typography>
        </Box>
      </Box> */}
      <br />
      <Stage at={at} />
    </Box>
  );
};