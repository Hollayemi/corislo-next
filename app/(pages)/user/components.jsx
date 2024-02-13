import { TextField, Box, Typography } from "@mui/material";
export const MyTextField = ({
  onChange,
  title,
  placeholder,
  value,
  PClassName,
  type = "text",
}) => (
  <div className={`flex flex-col items-start mb-6 ${PClassName}`}>
    <h5 className="text-[13px] mb-2">{title}</h5>
    <TextField
      type={type}
      className="h-8 w-full px-3 rounded-md bg-gray-50 border-1"
      style={{ height: 40 }}
      size="small"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      aria-label="Product title"
    />
  </div>
);

export const TitleSubtitle = ({ title, subtitle, titleClass, subtitleClass }) => (
  <Box className="">
    <Typography
      variant="body2"
      className={`!font-bold !text-black ${titleClass || " !text-[16px] "} `}
    >
      {title}
    </Typography>
    <Typography
      variant="body2"
      className={`!text-gray-500 ${subtitleClass || "!text-[11px]"}`}
    >
      {subtitle}
    </Typography>
  </Box>
);
