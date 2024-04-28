import IconifyIcon from "@/app/components/icon";
import {
  TextField,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { useState } from "react";
export const MyTextField = ({
  onChange,
  title,
  placeholder,
  value,
  PClassName,
  type = "text",
}) => {
  const [newType, changeType] = useState(type);
  return (
    <div className={`flex flex-col items-start mb-6 ${PClassName}`}>
      <h5 className="text-[13px] mb-2">{title}</h5>
      <div className="relative w-full">
        <TextField
          type={newType}
          className="h-8 w-full px-3 rounded-md bg-gray-50 border-1"
          style={{ height: 40 }}
          size="small"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          aria-label="Product title"
        />
        {type === "password" && (
          <IconifyIcon
            className="!absolute !top-2 right-2 !text-gray-400"
            onClick={() =>
              changeType(newType === "password" ? "text" : "password")
            }
            icon={newType === "password" ? "tabler:eye" : "tabler:eye-off"}
          />
        )}
      </div>
    </div>
  );
};

export const TitleSubtitle = ({
  title,
  subtitle,
  titleClass,
  subtitleClass,
  className,
}) => (
  <Box className={className}>
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

export const MyCheckBox = ({ onChange, label, disabled, checked }) => (
  <FormControlLabel
    className="!mt-0.5"
    onChange={onChange}
    label={
      <Box>
        <Typography variant="caption" className="">
          {label}
        </Typography>
      </Box>
    }
    control={
      <Checkbox
        size="small"
        checked={checked}
        disabled={disabled}
        name="basic-checked"
      />
    }
  />
);

export const TextCheck = ({ checked, text }) => {
  return (
    <Box className="flex items-center mb-1">
      <IconifyIcon
        icon={checked ? "tabler:circle-check-filled" : "tabler:circle-check"}
        className={`${checked && "!text-blue-600"} !text-[15px]`}
      />
      <Typography className="!ml-5" variant="caption">
        {text}
      </Typography>
    </Box>
  );
};

export const devicesColumn = [
  { id: "deviceName", label: "Device Name", minWidth: 170 },
  { id: "location", label: "Location", minWidth: 100 },
  {
    id: "Sign in Via",
    label: "Sign in Via",
    minWidth: 170,
  },
  {
    id: "Date and Time",
    label: "Date and Time",
    minWidth: 170,
  },
  {
    id: "",
    label: "Action",
    minWidth: 170,
  },
];

export const rowSample = [
  {
    deviceName: "Samsung A20s",
    deviceType: "phone",
    location: "Okeigbo, Ondo State",
    via: "website",
    date: new Date(),
  },
  {
    deviceName: "Hp Elitebok 9074",
    deviceType: "laptop",
    location: "Adebowale, Akure, Ondo State.",
    via: "website",
    date: new Date(),
  },
];
