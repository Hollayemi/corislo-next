import { Box, Typography, TextField, Button } from "@mui/material";
import IconifyIcon from "@/app/components/icon";
import { StoreDetails1 } from "./components";

const Direction = ({ setStage }) => {
  return (
    <Box>
      <Box className="flex items-center justify-between py-3">
        <Box className="flex items-center">
          <IconifyIcon
            icon="tabler:map-pin-filled"
            className="!text-[16px] mr-2.5"
          />
          <Typography variant="body2" className="!font-bold !text-black">
            Your Location
          </Typography>
        </Box>
        <Box
          className="flex items-center justify-center bg-gray-200 rounded-full w-5 h-5 p-px cursor-pointer"
          onClick={() => setStage("")}
        >
          <IconifyIcon
            icon="tabler:x"
            className="!text-gray-500 !text-[15px]"
          />
        </Box>
      </Box>
      <Typography
        variant="body2"
        className="!text-[12px] !font-medium !px-8 !text-gray-400"
      >
        40 Balogun St., PMB 1122, Ikeja, Lagos, Nigeria, 105102.
      </Typography>

      <Box className="flex items-center h-28 mt-4">
        <Box className="w-10 h-full flex flex-col items-center flex-shrink-0 pt-3 pb-5">
          <Box className="w-5 h-5 flex-shrink-0 rounded-full bg-slate-200 flex justify-center items-center">
            <Box className="w-3 h-3 rounded-full bg-blue-700 border-2 border-white"></Box>
          </Box>
          <Box className="border-2 border-gray-300 flex-grow border-dashed my-1"></Box>
          <IconifyIcon
            icon="tabler:map-pin-filled"
            className="!text-blue-900 flex-shrink-0 !text-[15px]"
          />
        </Box>
        <Box className="flex-grow w-full">
          <TextField
            size="small"
            className="!mb-2 !w-full !px-5"
            placeholder="Your Location"
          />
          <TextField
            size="small"
            className="!mb-2 !w-full !px-5"
            placeholder="Your Destination"
          />
        </Box>
        <Box className="w-10 flex-shrink-0 flex justify-center ">
          <IconifyIcon
            icon="tabler:arrows-exchange"
            className="!text-gray-500 flex-shrink-0 !text-[30px] rotate-90"
          />
        </Box>
      </Box>

      <Box className="flex items-center justify-center my-3">
        <Button
          className="!h-7 !shadow-none !mx-1 !rounded-full !text-white !font-bold !text-[10px]"
          variant="contained"
          startIcon={
            // <Box className="flex items-center justify-center bg-white rounded-full w-3 h-3 p-px">
            <IconifyIcon icon="tabler:car" className="!text-[20px]" />
            // </Box>
          }
        >
          1 hr 32 min
        </Button>
        <Button
          className="!h-7 !shadow-none !mx-1 !rounded-full !font-bold !text-[10px]"
          variant="text"
          startIcon={
            <IconifyIcon icon="tabler:motorbike" className="!text-[20px]" />
          }
        >
          3 hrs 26 min
        </Button>
        <Button
          className="!h-7 !shadow-none !mx-1 !rounded-full !font-bold !text-[10px]"
          variant="text"
          startIcon={
            <IconifyIcon icon="tabler:walk" className="!text-[20px]" />
          }
        >
          2 days
        </Button>
      </Box>

      <Box>
        <Typography
          variant="body2"
          className="!font-bold !text-[11px] !text-black !py-3"
        >
          Destination Store information
        </Typography>

        <StoreDetails1 />
      </Box>
    </Box>
  );
};

export default Direction;
