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
import { useGetDashboardCardsQuery } from "@/app/redux/business/slices/campaignSlice";
import { BoxIcon, Currency, EyeIcon, ShoppingBagIcon, Truck, UserPlus } from "lucide-react";

export const TopCards = () => {
  const dateFrom = calculateDateDiff("1_month", new Date(), "-", true);
  const query = {
    startDate: formatDate(dateFrom, dateNumericOption),
    endDate: formatDate(new Date(), dateNumericOption),
    interval: "monthly",
  };
  const { data: cards, refetch: refetchCards } = useGetDashboardCardsQuery()
  const result = cards?.data || {};

  const CardIcons = {
    total_sales: Currency,
    total_views: EyeIcon,
    total_orders: Truck,
    total_products: BoxIcon,
    followers: UserPlus,
    cart_and_saved: ShoppingBagIcon
  }
  const avatarColors = ['info', 'primary', 'success', 'warning', 'error', 'secondary']
  const data = Object.keys(result).map((each, i) => {
    const data = result[each]
    const Icon = CardIcons[each]
    console.log(data)
    return (
      {
        stats: data?.price ? formatCurrency(data?.countNow || 0) : data?.countNow || 0,
        title: each.split("_").join(" "),
        avatarIcon: <Icon size={14} />,
        avatarColor: avatarColors[i],
        increase:
          parseInt(data?.growth || 0) > 100 ? "100+" : data?.growth || 0,
      })
  })
  // {
  //   progress: 59,
  //   title: "Cart & Wishlist",
  //   stats: result.cartAndSaved?.sum || 0,
  //   avatarColor: "info",
  //   progressColor: "info",
  //   avatarIcon: "tabler:chart-pie-2",
  //   increase:
  //     result.cartAndSaved?.growth > 100
  //       ? "100+"
  //       : result.cartAndSaved?.growth || 0,
  // },
  // {
  //   progress: 22,
  //   stats: "$74.19",
  //   title: "Appearances",
  //   avatarColor: "error",
  //   progressColor: "error",
  //   avatarIcon: "tabler:brand-paypal",
  //   increase: 63,
  // },

  // {
  //   progress: 22,
  //   stats: result.followers?.sum || 0,
  //   title: "Followers",
  //   avatarColor: "error",
  //   progressColor: "error",
  //   avatarIcon: "tabler:brand-paypal",
  //   increase:
  //     result.followers?.growth > 100
  //       ? "100+"
  //       : result.followers?.growth || "-",
  // },

  return (
    <Box className="">
      <Box className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <Box className="md:p-1" key={index}>
            <Box
              bgcolor="custom.bodyLight"
              className="!px-2 py-3 md:!p-3 !rounded-md h-32"
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
                  <Typography
                    sx={{ fontWeight: 500 }}
                    className="text-[12px] capitalize"
                  >
                    {item.title}
                  </Typography>
                  <CustomAvatar
                    skin="light"
                    variant="rounded"
                    color={item.avatarColor}
                    sx={{ width: 26, height: 26 }}
                  >
                    {item.avatarIcon}
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
                        fontSize="0.6rem"
                        className=""
                        icon={
                          item.increase > 0
                            ? "tabler:arrow-narrow-up"
                            : "tabler:arrow-narrow-down"
                        }
                      />
                      {parseFloat(item?.increase || 0).toFixed(0)}%
                    </div>
                  }
                />
                <h5 className="ml-1">Since last month.</h5>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
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
    <Box className="!h-full rounded-md pb-6 !px-2" bgcolor="custom.bodyLight">
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
      <Box className="!px-1 mt-3">{renderData}</Box>
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
