import Icon from "@/app/components/icon";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import CustomAvatar from "@/app/components/avatar";
import {
  Box,
  Grid,
  Typography,
  LinearProgress,
  Button,
} from "@mui/material";

// ** Custom Components Imports
import CustomChip from "@/app/components/chip";
import CustomOption from "@/app/components/option-menu/option";
import { formatCurrency } from "@/app/utils/format";

const data = [
  {
    progress: 64,
    stats: "₦1,245,000",
    title: "Earnings",
    avatarIcon: "tabler:currency-dollar",
    increase: 23,
  },
  {
    progress: 59,
    title: "Profit",
    stats: "$256.34",
    avatarColor: "info",
    progressColor: "info",
    avatarIcon: "tabler:chart-pie-2",
    increase: 43,
  },
  {
    progress: 22,
    stats: "$74.19",
    title: "Expense",
    avatarColor: "error",
    progressColor: "error",
    avatarIcon: "tabler:brand-paypal",
    increase: 63,
  },

  {
    progress: 22,
    stats: "$74.19",
    title: "Expense",
    avatarColor: "error",
    progressColor: "error",
    avatarIcon: "tabler:brand-paypal",
    increase: -53,
  },
];

export const TopCards = () => {
  const theme = useTheme();
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
                    <Typography sx={{ fontWeight: 500 }}>
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
        <Typography variant="caption" className="!text-xs">{item.subtitle}</Typography>
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
    <Box
      className="!h-full rounded-md pb-6 px-2"
      bgcolor="custom.bodyLight"
    >
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
