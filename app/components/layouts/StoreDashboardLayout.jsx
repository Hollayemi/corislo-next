// import "@/styles/globals.css";
// import StoreDashboardAppBar from "@/app/components/store/AppBar";
// import dynamic from "next/dynamic";
// import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
// const StoreLeftSideBar = dynamic(
//   () => import('@/app/components/view/store/LeftSideBar'),
//   {
//     ssr: false,
//   }
// )
// import { usePathname } from "next/navigation";
// import { Box } from "@mui/material";
// import { useTheme } from "@emotion/react";

// export const metadata = {
//   title: "admin-corislo",
//   description: "Showcase your store now",
// };

// export default function StoreDashboardLayout({ children }) {
//   const theme = useTheme();
//   const pathName = usePathname()
//   const name = pathName.split('/')
//   const pageName = name[name.length - 1]

//   return (
//     <Box className="h-screen" color="custom.body">
//         <StoreLeftSideBar showing={pageName}>
//           {children}
//         </StoreLeftSideBar>
//     </Box>
//   );
// }
