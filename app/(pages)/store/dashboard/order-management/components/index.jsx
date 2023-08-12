import {
  Tab,
  Typography,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import OrderTable from "@/app/components/view/store/tables/OrderTable";
import { allOrderColumns, ordersColumns } from "./columns";
import Icon from "@/app/components/icon";
import { rows } from "../row";


export const OrderListComponents = ({ value, setValue, selectRow }) => {
  // ** Hook
  const router = useRouter();
  // ** State
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const sortBy = (by) => {
    if (!by || by === "all") {
      return rows.data;
    } else {
      return rows.data.filter((e) => e.status === by);
    }
  };

  const actionFunctions = (row, action) =>{
      if(action === "modify"){
        // selectRow(row);
        router.push(`/store/dashboard/order-management?order=${row._id}`);
      }
  }

  return (
    <TabContext value={value} className="w-5/6">
      <TabList
        onChange={handleChange}
        orientation={isSmallScreen ? "vertical" : "horizontal"}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="simple tabs example"
      >
        <Tab value="all" label="All Orders (3,049)" />
        <Tab value="new" label="New Orders (10)" />
        <Tab value="processing" label="Processing Orders (23)" />
        <Tab value="Processed" label="Processed Orders (2,869)" />
        <Tab value="Cancelled" label="Cancelled Orders (97)" />
      </TabList>
      <TabPanel value="all">
        <Box
          className={`w-auto !relative !px-1 !md:px-0 !pb-5 !rounded-md`}
          bgcolor="custom.bodyLight"
        >
          <OrderTable
            columns={allOrderColumns(actionFunctions)}
            rows={sortBy()}
          />
        </Box>
      </TabPanel>
      <TabPanel value="new">
        <OrderTable
          columns={ordersColumns(actionFunctions)}
          rows={sortBy("pending")}
        />
      </TabPanel>
      <TabPanel value="processing">
        <OrderTable
          columns={ordersColumns(actionFunctions)}
          rows={sortBy("processing")}
        />
      </TabPanel>
      <TabPanel value="Processed">
        <OrderTable
          columns={ordersColumns(actionFunctions)}
          rows={sortBy("processed")}
        />
      </TabPanel>
      <TabPanel value="Cancelled">
        <OrderTable
          columns={ordersColumns(actionFunctions)}
          rows={sortBy("cancelled")}
        />
      </TabPanel>
    </TabContext>
  );
};

export const statusObj = [
  { title: "current", color: "primary" },
  { title: "processed", color: "success" },
  { title: "cancelled", color: "error" },
  { title: "waiting", color: "warning" },
  { title: "pending", color: "info" },
];

export const DetailsDesign = ({ icon, title, info, btnFunc, btnText }) => {
  return (
    <Box className="flex w-full md:w-64 md:max-w-300px mt-6">
      <Box
        className="w-10 h-10 mr-2 shrink-0 rounded-full flex items-center justify-center"
        bgcolor="custom.bodyGray"
      >
        <Icon icon={icon} fontSize={0.8} />
      </Box>
      <Box>
        <Typography className="!font-bold !text-sm !mb-3">{title}</Typography>
        <Box>
          {info.map((each, i) => {
            return (
              <Box
                className="flex items-cente !text-xs text-gray-500 mb-2"
                key={i}
              >
                <Typography className="!mr-2 shrink-0 !text-xs">{each.key}: </Typography>
                <Typography className="!text-xs !whitespace-break-spaces">{each.value}</Typography>
              </Box>
            );
          })}
        </Box>

        {btnText && (
          <Button className="!text-xs !border bg-slate-100" onClick={btnFunc}>
            {btnText}
          </Button>
        )}
      </Box>
    </Box>
  );
};


export const Summarize = ({ info }) => {
  return (
    <Box>
      {info.map((each, i) => {
        return (
          <Box
            className={`flex items-cente !text-xs mt-2 text-gray-500 mb-8 md:mb-6 `}
            key={i}
          >
            <Typography
              className={`mr-2 shrink-0 !w-36 md:!w-44 !text-xs ${
                each.bold && "!font-bold"
              } `}
            >
              {each.key}
            </Typography>
            <Box
              className={`!text-xs !whitespace-break-spaces ${
                each.bold && "!font-bold"
              }`}
            >
              {each.value}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}