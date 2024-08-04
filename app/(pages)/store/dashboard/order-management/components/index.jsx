"use client";
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
// import { rows } from "../row";

export const OrderListComponents = ({ value, setValue, rows, isLoading }) => {
  // ** Hook
  const router = useRouter();
  // ** State
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const sortBy = (by = "all") => {
    if (!by || by === "all") {
      return rows || [];
    } else {
      console.log(rows);
      return rows ? rows.filter((e) => e.status.toLowerCase() === by) : [];
    }
  };

  const actionFunctions = (row, action) => {
    if (action === "modify") {
      // selectRow(row);
      router.push(`/store/dashboard/order-management?order=${row._id}`);
    }

    if (action === "message") {
      router.push(`/store/chat?customer=${row.customerUsername}`);
    }
  };
  const onRowClick = (row, id) => {
    router.push(
      `/store/dashboard/order-management?order=${row._id}&tableId=${id}`
    );
  };
  const tabs = ["All", "New", "Unpaid", "Pickable", "Completed", "Cancelled"];

  return (
    <TabContext value={value} className="w-full md:w-5/6">
      <TabList
        onChange={handleChange}
        orientation="horizontal"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="simple tabs example"
      >
        {tabs.map((each, i) => (
          <Tab
            value={each.toLowerCase()}
            key={i}
            disableRipple
            label={
              <Typography
                variant="body2"
                className="!text-xs md:!w-full !font-bold !text-center"
              >
                {each}
              </Typography>
            }
            className="!text-[11px] !w-18 !px-0"
          />
        ))}
      </TabList>

      <TabPanel value="all" className="!px-px">
        <Box className={`w-full !pb-1 !rounded-md`} bgcolor="custom.bodyLight">
          <OrderTable
            loading={isLoading}
            columns={allOrderColumns(actionFunctions)}
            rows={sortBy()}
            // onRowClick={onRowClick}
          />
        </Box>
      </TabPanel>
      <TabPanel value="new" className="!px-px">
        <Box className={`w-full !pb-1 !rounded-md`} bgcolor="custom.bodyLight">
          <OrderTable
            loading={isLoading}
            columns={ordersColumns(actionFunctions)}
            rows={sortBy("paid")}
          />
        </Box>
      </TabPanel>
      <TabPanel value="unpaid" className="!px-px">
        <Box className={`w-full !pb-1 !rounded-md`} bgcolor="custom.bodyLight">
          <OrderTable
            loading={isLoading}
            columns={ordersColumns(actionFunctions)}
            rows={sortBy("unpaid")}
          />
        </Box>
      </TabPanel>
      <TabPanel value="pickable" className="!px-px">
        <Box className={`w-full !pb-1 !rounded-md`} bgcolor="custom.bodyLight">
          <OrderTable
            loading={isLoading}
            columns={ordersColumns(actionFunctions)}
            rows={sortBy("ongoing")}
          />
        </Box>
      </TabPanel>
      <TabPanel value="cancelled" className="!px-px">
        <Box className={`w-full !pb-1 !rounded-md`} bgcolor="custom.bodyLight">
          <OrderTable
            loading={isLoading}
            columns={ordersColumns(actionFunctions)}
            rows={sortBy("cancelled")}
          />
        </Box>
      </TabPanel>
      <TabPanel value="completed" className="!px-px">
        <Box className={`w-full !pb-1 !rounded-md`} bgcolor="custom.bodyLight">
          <OrderTable
            loading={isLoading}
            columns={ordersColumns(actionFunctions)}
            rows={sortBy("completed")}
          />
        </Box>
      </TabPanel>
    </TabContext>
  );
};

export const statusObj = [
  { title: "unpaid", color: "warning" },
  { title: "paid", color: "warning" },
  { title: "processing", color: "success" },
  { title: "out_for_delivery", color: "primary" },
  { title: "pickable", color: "primary" },
  { title: "completed", color: "success" },
  { title: "pending", color: "info" },
  { title: "refunded", color: "secondary" },
  { title: "cancelled", color: "error" },
];

export const DetailsDesign = ({
  icon,
  title,
  info,
  btnFunc,
  btnText,
  color,
}) => {
  return (
    <Box className="flex w-full md:w-64 md:max-w-300px mt-6">
      <Box
        className="w-10 h-10 mr-2 shrink-0 rounded-full flex items-center justify-center"
        bgcolor="custom.bodyGray"
        color={color}
      >
        <Icon icon={icon} />
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
                <Typography className="!mr-2 shrink-0 !text-xs">
                  {each.key}:{" "}
                </Typography>
                <Typography className="!text-xs !whitespace-break-spaces">
                  {each.value}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {btnText && (
          <Button className="!text-xs !border !bg-blue-100" onClick={btnFunc}>
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
};
