import { CheckList } from "@/app/components/cards/plans";
import { Box, Button, Typography } from "@mui/material";

export const PlansComponents = ({ opportunities, from, price, name }) => {
  return (
    <Box className="w-full sm:w-72 !rounded-xl bg-gradient-to-b from-blue-700 via-blue-500 to-blue-700 py-8 m-1 my-4">
      <Box className="flex flex-col items-center">
        <Typography variant="body2" className="!text-xl !text-white !font-bold">
          {name || '-'}
        </Typography>
        <Typography
          variant="body2"
          className="!text-4xl !py-5 !text-white !font-black"
        >
          ${price || 0}
        </Typography>

        <Button
          variant="contained"
          className="!rounded-full w-48 h-11 !text-[14px] !text-blue-600 !bg-white !shadow-none"
        >
          Choose Plan
        </Button>
      </Box>
      <Box className="mt-10 px-8">
        <Typography variant="body2" className="!text-md !text-white !font-bold">
          What you get
        </Typography>
        <br />
        {opportunities.map((each, i) => (
          <CheckList text={each} key={i} cancel={i > from} />
        ))}
      </Box>
    </Box>
  )
};
