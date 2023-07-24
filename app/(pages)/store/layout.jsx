'use client';
import { Box } from "@mui/material"

// export const metadata = {
//   title: "Store - corislo",
//   description: "Showcase your store now",
// };

export default function MyStoreDashboardLayout({ children }) {
    
    return (
        <Box className="h-screen" color="custom.body">
            {children}
        </Box>
    )
}
