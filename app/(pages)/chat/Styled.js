import { Box } from "@mui/material";
import { styled, useTheme, alpha } from "@mui/material/styles";

export const StyleList = styled(Box)(({ theme }) => ({
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "5px", // Width of the scrollbar
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#BDBDBD", // Color of the scrollbar thumb
      borderRadius: "6px", // Rounded corners of the thumb
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#42496b", // Color of the scrollbar thumb on hover
    },
    cursor: "pointer",
    transition: "all 1.5s",
    // Firefox
    scrollbarWidth: "thin", // Width of the scrollbar
    scrollbarColor: "#888 #f1f1f1",
  }));