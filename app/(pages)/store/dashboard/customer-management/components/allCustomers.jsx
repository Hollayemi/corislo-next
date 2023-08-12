import { Typography, Box, Select, MenuItem } from "@mui/material";
import Table from "@/app/components/view/store/tables/OrderTable";
import { listingColumns } from "./columns";
import { allCustomers } from "./rows";

export const AllCustomers = () => {
  return (
    <Box>
      <Typography variant="caption" className="!text-[12px] !mt-3">
        The Customer List is a powerful tool that offers a holistic overview of
        all registered customers across our brand's stores. Serving as a
        centralized database, it houses vital information about the valued
        client, allowing store administrators to efficiently manage and gain
        deeper insights into their interactions. By harnessing this centralized
        resource,it can provide personalized experiences, anticipate customer
        needs, and forge lasting connections, ultimately elevating the overall
        shopping experience and building strong customer loyalty. With the
        Customer List at your disposal, you are better equipped to exceed
        expectations and deliver exceptional service tailored to each customer's
        unique preferences and preferences.
      </Typography>

      {/* <br /> */}
      <Typography variant="h5" className="!font-bold !text-sm pt-6">
        All Customers (1,394)
      </Typography>
      {/* <Box> */}
      <Table columns={listingColumns} rows={allCustomers.data} />
      {/* </Box> */}
    </Box>
  );
};
