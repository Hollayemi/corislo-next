// ** React Imports
import { useState, forwardRef } from "react";

// ** MUI Imports
import { Box } from "@mui/material";
import { PopularAds } from "@/app/components/cards/homeCards";
import { useStoreData } from "@/app/hooks/useData";
import useSWR from "swr";

const Announcements = ({ formData, setFormData, formHandler }) => {
  const { data, isLoading } = useSWR("/branch/announcement");
  const { storeInfo } = useStoreData();

  const ads = data?.data || [];

  const staticData = [
    {
      title: "New Product Arrival",
      brief: "Get up to 80% discount",
      notification: "push-notification",
      url: "http://localhost:4001/store/dashboard/marketing",
      startDate: "2024-05-07T22:33:59.000Z",
      endDate: "2024-05-23T22:37:50.000Z",
      status: "scheduled",
    },
    {
      title: "New Product Arrival",
      brief: "Get up to 80% discount",
      notification: "push-notification",
      url: "http://localhost:4001/store/dashboard/marketing",
      startDate: "2024-05-07T22:33:59.000Z",
      endDate: "2024-05-23T22:37:50.000Z",
      status: "scheduled",
    },
    {
      title: "New Product Arrival",
      brief: "Get up to 80% discount",
      notification: "push-notification",
      url: "https://dribbble.com/search/discount-dashboard",
      startDate: "2024-05-07T22:33:59.000Z",
      endDate: "2024-05-23T22:37:50.000Z",
      status: "scheduled",
    },
  ];

  return (
    <Box className="flex flex-wrap">
      {ads.map((ad, i) => (
        <Box className="m-1">
          <PopularAds
            store={storeInfo?.profile?.store}
            key={i}
            image={"/images/misc/popular-ads1.png"}
            title={ad.title}
            brief={ad.brief}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Announcements;
