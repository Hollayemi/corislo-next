import { Typography, Box, Grid } from "@mui/material";

export const Summarize = ({ info }) => {
  return (
    <Box>
      {info.map((each, i) => {
        return (
          <Box
            className={`flex items-cente !text-xs mt-2 text-gray-500 mb-3 `}
            key={i}
          >
            <Typography className={`!mr-4 shrink-0 !text-xs !font-extrabold `}>
              {each.key}:
            </Typography>
            <Box
              className={`!text-xs !whitespace-break-spaces flex items-center `}
              color={each?.color}
            >
              {each.color && (
                <Box
                  bgcolor={each.color}
                  className="w-4 h-4 rounded-full mr-2"
                ></Box>
              )}
              {each.value}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

