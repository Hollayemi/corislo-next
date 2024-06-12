"use client";
import { useState } from "react";
import Icon from "@/app/components/icon";
import { useTheme } from "@mui/material/styles";
import CustomAvatar from "@/app/components/avatar";
import { Box, Grid, Typography, LinearProgress, Button } from "@mui/material";

// ** Custom Components Imports
import CustomChip from "@/app/components/chip";
import CustomOption from "@/app/components/option-menu/option";
import {
  calculateDateDiff,
  dateNumericOption,
  formatCurrency,
  formatDate,
} from "@/app/utils/format";
import useSWR from "swr";

export const TopCards = () => {
  const dateFrom = calculateDateDiff("1_month", new Date(), "-", true);
  const query = {
    startDate: formatDate(dateFrom, dateNumericOption),
    endDate: formatDate(new Date(), dateNumericOption),
    interval: "monthly",
  };

  console.log(dateFrom, query);
  const queryString = new URLSearchParams(query).toString();
  const { data: swrData, isLoading } = useSWR(`/dashboard/cards`);
  const result = (swrData && swrData.data) || {};
  console.log(result);
  const data = [
    {
      stats: result.views?.sum?.toLocaleString(),
      title: "Invetory Turnover",
      avatarIcon: "tabler:currency-dollar",
      increase:
        result.views?.growth > 100 ? "100+" : result.views?.growth || "-",
    },
    {
      progress: 59,
      title: "Cart & Wishlist",
      stats: result.cartAndSaved?.sum || 0,
      avatarColor: "info",
      progressColor: "info",
      avatarIcon: "tabler:chart-pie-2",
      increase:
        result.cartAndSaved?.growth > 100
          ? "100+"
          : result.cartAndSaved?.growth || "-",
    },
    {
      progress: 22,
      stats: "$74.19",
      title: "Appearances",
      avatarColor: "error",
      progressColor: "error",
      avatarIcon: "tabler:brand-paypal",
      increase: 63,
    },

    {
      progress: 22,
      stats: result.followers?.sum || 0,
      title: "Followers",
      avatarColor: "error",
      progressColor: "error",
      avatarIcon: "tabler:brand-paypal",
      increase:
        result.followers?.growth > 100
          ? "100+"
          : result.followers?.growth || "-",
    },
  ];
  return (
    <Box className="">
      <Grid container spacing={0.5}>
        {data.map((item, index) => (
          <Grid item xs={6} sm={6} md={3} key={index}>
            <Box className="md:p-1">
              <Box
                bgcolor="custom.bodyLight"
                className="px-2 py-3 md:!p-3 !rounded-md"
              >
                <Box className="border-l-4 border-slate-600 pl-3">
                  <Box
                    sx={{
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    bgcolor="secondary"
                  >
                    <Typography sx={{ fontWeight: 500 }} className="text-[12px]">
                      {item.title}
                    </Typography>
                    <CustomAvatar
                      skin="light"
                      variant="rounded"
                      color={item.avatarColor}
                      sx={{ width: 26, height: 26 }}
                    >
                      <Icon fontSize="1.125rem" icon={item.avatarIcon} />
                    </CustomAvatar>
                  </Box>
                  <Typography variant="h5" className="!font-bold">
                    {item.stats}
                  </Typography>
                </Box>
                <Box className="!flex !items-center !text-xs md:ml-4 !mt-3 !md:mt-1">
                  <CustomChip
                    size="small"
                    skin="light"
                    color={item.increase > 0 ? "success" : "error"}
                    label={
                      <div className="flex items-center">
                        <Icon
                          fontSize="0.8rem"
                          className="mr-px"
                          icon={
                            item.increase > 0
                              ? "tabler:arrow-narrow-up"
                              : "tabler:arrow-narrow-down"
                          }
                        />
                        {item.increase}%
                      </div>
                    }
                  />
                  <h5 className="ml-1">Since last month.</h5>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const storesSales = [
  {
    progress: 85,
    chipColor: "success",
    progressColor: "info",
    subtitle: "Goument Store",
  },
  {
    progress: 65,
    chipColor: "success",
    progressColor: "info",
    subtitle: "Tenxun Store",
  },
];

export const BranchesSales = () => {
  const [interval, selectedInterval] = useState("7 days");
  const renderData = storesSales.map((item, index) => (
    <Box
      key={index}
      sx={{ ...(index !== storesSales.length - 1 && { mb: 1.5 }) }}
    >
      <Box
        sx={{
          gap: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption" className="!text-xs">
          {item.subtitle}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.disabled" }}>
          {`${item.progress}%`}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        className="!rounded-md"
        value={item.progress}
        color={item.progressColor}
        sx={{ height: 10 }}
      />
    </Box>
  ));

  const dayInterval = [
    "3 days",
    "7 days",
    "2 weeks",
    "1 month",
    "3 months",
    "6 months",
    "1 year",
  ];

  return (
    <Box className="!h-full rounded-md pb-6 px-2" bgcolor="custom.bodyLight">
      <Box className="!py-1.5 !flex !items-center !justify-between">
        <Typography variant="caption" className="!text-[13px] !font-medium">
          Sales by Stores
        </Typography>

        <CustomOption
          icon={<Button className="!text-[13px]">{interval}</Button>}
          options={dayInterval}
          clickFunction={(e) => selectedInterval(e)}
        />
      </Box>
      <Typography variant="body2" className="!font-bold !text-[18px]">
        {formatCurrency("367000")}
      </Typography>
      <Box className="px-1 mt-3">{renderData}</Box>
    </Box>
  );
};

export const DashboardCrumb = [
  {
    text: <Icon icon="tabler:home-2" className="!text-[20px]" />,
    link: "/",
    icon: "home",
  },
];
