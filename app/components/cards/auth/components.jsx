import IconifyIcon from "../../icon";

const { Box, Typography } = require("@mui/material");
   
export const CustomInput = ({ title, inputProps, id, error, onChange }) => (
  <Box className="px-4 relative py-1.5 flex flex-col w-full bg-white rounded-md border-2 border-white focus-within:border-blue-800 overflow-hidden">
    <label htmlFor={id} className="!text-[11px]">
      {title}
    </label>
    <input
      {...inputProps}
      id={id}
      onChange={onChange}
      className="outline-none border-none w-full h-6 pr-5 !bg-white autofill:!px-4"
    />
    <Box
      className="w-4 h-4 rounded-full flex flex-shrink-0 items-center justify-center absolute right-0 mr-4 bottom-0 mb-2"
      bgcolor={!error ? "custom.pri" : "red"}
    >
      <IconifyIcon icon="tabler:check" className="!text-[12px] !text-white" />
    </Box>
  </Box>
);