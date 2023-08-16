import Icon from "@/app/components/icon";
import { useTheme } from "@mui/material/styles";
import CustomAvatar from "@/app/components/avatar";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// ** Custom Components Imports
import CustomChip from "@/app/components/chip";


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
      <Box>
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Box bgcolor="custom.bodyLight" className="px-2 py-3 md:!p-3 !rounded-md">
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
                          arrow-narrow-up
                        />
                        {item.increase}%
                      </div>
                    }
                  />
                  <h5 className="ml-1">Since last month.</h5>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
}





const storesSales = [
  {
    progress: 85,
    chipColor: 'success',
    subtitle: 'subscriber'
  },
  {
    progress: 65,
    chipColor: 'success',
    progressColor: 'info',
    subtitle: 'new orders'
  }
]

export const BranchesSales = () => {
  const renderData = storesSales.map((item, index) => (
    <Box key={index} sx={{ ...(index !== storesSales.length - 1 && { mb: 0.5 }) }}>
      <Box sx={{ gap: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography className="text-xs">{item.subtitle}</Typography>
        <Typography variant='body2' sx={{ color: 'text.disabled' }}>
          {`${item.progress}%`}
        </Typography>
      </Box>
      <LinearProgress variant='determinate' className="!rounded-md" value={item.progress} color={item.progressColor} sx={{ height: 8 }} />
    </Box>
  ))

  return (
    <Box
      className="!h-full shadow-sm shadow-gray-400 rounded-md pb-6 px-2"
      bgcolor="custom.bodyLight"
    >
      <Box className="!py-3 !flex !items-center !justify-between">
        <Typography className="text-[13px] font-bold">
          Sales by Stores
        </Typography>

        <FormControl
          variant="standard"
          className="!border-0 !outline-none !ring-0"
        >
          <Select
            label="weekly"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue="7_days"
            className="w-20 !px-1 text-xs !border-none !outline-none !ring-0"
            size="small"
          >
            <MenuItem value="3_days">3 days</MenuItem>
            <MenuItem value="7_days">weekly</MenuItem>
            <MenuItem value="2_weeks">2 weeks</MenuItem>
            <MenuItem value="1_month">monthly</MenuItem>
            <MenuItem value="3_months">3 months</MenuItem>
            <MenuItem value="6_months">6 months</MenuItem>
            <MenuItem value="1_year">yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Typography variant="h5" className="!font-bold ">₦367,000</Typography>
      <Box className="px-1 mt-3">{renderData}</Box>
    </Box>
  );
}
