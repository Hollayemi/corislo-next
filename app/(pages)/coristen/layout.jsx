"use client";
import { superHeader } from "@/app/redux/state/slices/api/setAuthHeaders";
import { Box } from "@mui/material";
import { SWRConfig } from "swr";
import martApi from "@/app/redux/state/slices/api/baseApi";
import { SuperDataProvider } from "@/app/context/superContex";
import { Provider } from "react-redux";
import { store } from '@/app/redux/state/store'

// export const metadata = {
//   title: "Store - corislo",
//   description: "Showcase your store now",
// };

export default function MySuperDashboardLayout({ children }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: false,
        revalidateOnFocus: false,

        fetcher: async (resource, init) => {
          const getToken = superHeader()
          const res = await martApi.get(resource, getToken)
          return res.data
        },
      }}
    >
      <Provider store={store}>
        <SuperDataProvider>
          <Box
            className="h-full !w-full absolute min-h-scren !overflow-x-hidden"
            bgcolor="custom.bodyGray"
          >
            {children}
          </Box>
        </SuperDataProvider>
      </Provider>
    </SWRConfig>
  )
}
