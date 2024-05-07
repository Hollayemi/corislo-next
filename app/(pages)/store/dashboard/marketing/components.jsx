import { Box, Typography } from "@mui/material";
import { DashboardCrumb } from "../components";

export const marketingBreadCrumb = [
  ...DashboardCrumb,
  {
    text: "Marketing",
    link: "store-analytics",
    icon: "shop",
  },
];

export const CampaignTab = ({ title, caption, screen, setScreen }) => {
  const genCampReg = title.toLowerCase().split(" ").join("_");
  return (
    <Box
      className={`w-32 flex-shrink-0 h-24 m-2 flex shadow flex-col items-center justify-center cursor-pointer translation-all duration-300 bg-gray-100 rounded-md border ${
        screen !== genCampReg ? "border-gray-100" : "border-blue-800"
      } hover:border-blue-800`}
      onClick={() => setScreen(genCampReg)}
    >
      <Typography variant="body2" className="!text-[14px] !font-bold">
        {title}
      </Typography>
      <Typography variant="caption" className="!text-[11px]">
        {caption}
      </Typography>
      <Box
        className={`h-5 w-5 mt-4 rounded-full border-4 ${
          screen !== genCampReg ? "border-gray-200" : "border-blue-800"
        } flex items-center justify-center focus`}
      >
        <Box className="h-2 w-2 rounded-full bg-gray-200"></Box>
      </Box>
    </Box>
  );
};
