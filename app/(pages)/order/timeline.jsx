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
import useSWR from "swr";
import { nextSteps, orderStatusMessages } from "./[detail]/components";

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

const TimelineLeft = ({ orderSlug, currentStatus }) => {
  const { data: steps } = useSWR(`/user/order-track?order=${orderSlug}`);
  const allSteps = steps?.data?.status || [];

  console.log(allSteps);
  console.log(currentStatus);

  return (
    <Timeline>
      {allSteps.map((item, i) => {
        const { title, note } =
          orderStatusMessages[item.state.replaceAll(" ", "_").toLowerCase()] || {};
        console.log(item.status);
        return (
          <TimelineItem key={i}>
            <TimelineSeparator>
              <TimelineDot color="success" />
              <TimelineConnector color="success" />
            </TimelineSeparator>
            <TimelineContent
              sx={{ "& svg": { verticalAlign: "bottom", mx: 4 } }}
            >
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
                  {title}
                </Typography>
                <Typography variant="caption">
                  {formatDate(item.date)}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{ color: "text.primary" }}
                className="!text-[12px] !mb-3"
              >
                {note}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        );
      })}
      {currentStatus &&
        nextSteps[currentStatus?.replaceAll(" ", "_").toLowerCase()]?.map(
          (item, i) => {
            const { title } =
              orderStatusMessages[item.replaceAll(" ", "_").toLowerCase()] ||
              {};
            return (
              <TimelineItem key={i}>
                <TimelineSeparator>
                  <TimelineDot color={i > 0 ? "text" : "warning"} />
                  <TimelineConnector color={i > 0 ? "text" : "warning"} />
                </TimelineSeparator>
                <TimelineContent
                  sx={{ "& svg": { verticalAlign: "bottom", mx: 4 } }}
                >
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
                      {title}
                    </Typography>
                    <Typography variant="caption">...</Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.primary" }}
                    className="!text-[12px] !mb-3"
                  >
                    ...
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            );
          }
        )}
    </Timeline>
  );
};

export default TimelineLeft;

export const OrderStages = ({ at, orderSlug, delivery }) => {
  console.log(at);
  const Stage = ({ at = 0 }) => {
    const pickIcon = {
      1: { icon: "tabler:currency-dollar", name: "Paid" },
      2: { icon: "tabler:box", name: "Packaged" },
      3:
        delivery === "pickup"
          ? { icon: "tabler:truck-delivery", name: "Pickable" }
          : { icon: "tabler:truck-delivery", name: "Shipped" },
      4: { icon: "tabler:box-seam", name: "Received" },
      5: { icon: "tabler:star-filled", name: "Review" },
    };
    const state = {
      1: "!text-white  !bg-black",
      2: "!text-white  !bg-blue-700",
      3: " !text-black !bg-gray-100",
    };

    return (
      <Box className="flex items-center">
        <Box className={`!w-52 min-w-fit !h-1 flex-grow ${state[1]}`}></Box>
        {Array(5)
          .fill()
          .map((_, ind) => {
            const index = ind + 1
            return (
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
                {index !== 5 && (
                  <Box
                    className={`!w-8 min-w-fit !h-1 flex-grow ${
                      at === index ? state[2] : at > index ? state[1] : state[3]
                    }`}
                  ></Box>
                )}
              </Box>
            );
          })}
      </Box>
    );
  };
  return (
    <Box>
      <br />
      <Stage at={at} />
    </Box>
  );
};
