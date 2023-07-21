import { Box } from '@mui/material'

export const metadata = {
  title: "auth-corislo",
  description: "Showcase your store now",
};

export default function AuthLayout({ children }) {
  return (
    <Box className="flex justify-center items-center h-full min-h-screen overflow-hidden">
        {children}
    </Box>
  );
}
