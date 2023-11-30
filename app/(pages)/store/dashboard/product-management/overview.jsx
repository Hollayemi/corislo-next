// ** MUI Imports
import useSWR from "swr";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import tokens from "@/app/configs/tokens";

// ** Icon Imports
import Icon from '@/app/components/icon'

// ** Custom Components Imports
import CustomAvatar from '@/app/components/avatar'

const data = [
  {
    stats: '12,400',
    title: 'Overall Products',
    more: 'Total Products that has everbeen available in all stores',
    color: 'primary',
    icon: 'tabler:chart-pie-2'
  },
  {
    color: 'info',
    stats: '5,300',
    title: 'Available Products',
    more: 'Total Products that are available for purchase in all stores',
    icon: 'tabler:users'
  },
  {
    color: 'error',
    stats: '7,943',
    title: 'Sold Products',
    more: 'Total Products that has ever been sold in all stores',
    icon: 'tabler:shopping-cart'
  },
  {
    stats: '400',
    color: 'success',
    title: 'Out Of Stock',
    more: 'Total amount of products that are no longer in stock in all the stores.',
    icon: 'tabler:currency-dollar'
  }
]

const renderStats = (data) => {
  console.log(data);
  return data.map((sale, index) => (
    <Grid item xs={6} md={3} key={index}>
      <Box className="flex items-start mb-5 md:mb-2">
        <CustomAvatar
          skin="light"
          color={sale.color}
          className="!w-19 md:!w-12 !h-19 md:!h-12 mr-1 md:!mr-3"
        >
          <Icon icon={sale.icon} />
        </CustomAvatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2" className="!font-black !text-[23px]">
            {sale.stats}
          </Typography>
          <Typography
            variant="body2"
            className="!font-bold !text-[15px]"
          >
            {sale.title}
          </Typography>
          <Typography
            variant="caption"
            className="!text-[9px] md:!text-[10px] !mt-1 !text-gray-500"
          >
            {sale.more}
          </Typography>
        </Box>
      </Box>
    </Grid>
  ));
}

const OverViewCard = () => {
  const { data, error, isLoading } = useSWR("/store/files-count");
  console.log(data, error, isLoading);
  return (
    !error &&
    !isLoading && (
      <Box className="py-3 px-10.5md:px-5">
        <Grid container spacing={1}>
          {renderStats(data.data.topBar)}
        </Grid>
      </Box>
    )
  );
}

export default OverViewCard
