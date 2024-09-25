"use client";
import { StoreDataProvider } from "@/app/context/storeContext";
import { jsonHeader } from "@/app/redux/state/slices/api/setAuthHeaders";
import { Box } from "@mui/material";
import { SWRConfig } from "swr";
import martApi from "@/app/redux/state/slices/api/baseApi";
import { store } from "@/app/redux/state/store";
import { Provider } from "react-redux";

// export const metadata = {
//   title: "Store - corislo",
//   description: "Showcase your store now",
// };


export default function MyStoreDashboardLayout({ children }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: false,
        revalidateOnFocus: false,

        fetcher: async (resource, init) => {
          const getToken = jsonHeader("store");
          const res = await martApi.get(resource, getToken);
          return res.data;
        },
      }}
    >
      <Provider store={store}>
        <StoreDataProvider>
          <Box
            className="h-full !w-full absolute min-h-scren !overflow-x-hidden"
            bgcolor="custom.bodyGray"
          >
            {children}
          </Box>
        </StoreDataProvider>
      </Provider>
    </SWRConfig>
  );
}
