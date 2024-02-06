import { Box } from "@mui/material";

export const Dot = ({ color }) => (
  <Box className={`w-1.5 h-1.5 flex-shrink-0 !rounded-full ${color}`}></Box>
);
