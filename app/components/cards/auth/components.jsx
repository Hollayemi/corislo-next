"use client";
import IconifyIcon from "../../icon";
import { useState } from "react";
const { Box, Typography } = require("@mui/material");

const inputType = {};

const TextInput = ({ inputProps, id, onChange, multiline }) =>
  !multiline ? (
    <input
      {...inputProps}
      id={id}
      onChange={onChange}
      className="outline-none border-none w-full font-normal h-6 pr-5 !bg-white autofill:-px-4 !autofill:bg-transparent"
    />
  ) : (
    <textarea
      {...inputProps}
      id={id}
      onChange={onChange}
      className="outline-none border-none w-full h-28 pr-5 !bg-white autofill:!px-4"
    ></textarea>
  );

const SelectInput = ({ onChange, id, values }) => {
  return (
    <Box>
      <select
        onChange={onChange}
        id={id}
        className="outline-none border-none selectDefault w-full h-6 !text-gray-400 !text-[14px] pr-5 !bg-white autofill:!px-4"
      >
        {values?.map((res, i) => (
          <option value={res.value} key={i} className="h-10 py-8">
            {res.display}
          </option>
        ))}
      </select>
    </Box>
  );
};
export const CustomInput = ({
  title,
  inputProps,
  hideCheck,
  multiline,
  id,
  error,
  onChange,
}) => {
  const [newType, changeType] = useState(inputProps.type);
  return (
    <Box>
      <Box className="px-4 relative py-px pb-1.5 flex flex-col w-full bg-white rounded-md border-2 border-white focus-within:border-blue-800 overflow-hidden">
        <label htmlFor={id} className="!text-[11px]">
          {title}
        </label>
        {inputProps.type !== "select" ? (
          <TextInput
            multiline={multiline}
            id={id}
            inputProps={{ ...inputProps, type: newType }}
            onChange={onChange}
          />
        ) : (
          <SelectInput onChange={onChange} id={id} values={inputProps.values} />
        )}
        {!hideCheck && (
          <Box
            className="w-4 h-4 rounded-full flex flex-shrink-0 items-center justify-center absolute right-0 mr-4 bottom-0 mb-2"
            bgcolor={!error ? "custom.pri" : "red"}
          >
            <IconifyIcon
              icon={!error ? "tabler:check" : "tabler:x"}
              className="!text-[12px] !text-white"
            />
          </Box>
        )}
        {inputProps.type === "password" && (
          <IconifyIcon
            className="!absolute right-0 mr-5 bottom-0 mb-2 !z-50 !text-gray-400 !text-[20px]"
            onClick={() =>
              changeType(newType === "password" ? "text" : "password")
            }
            icon={newType === "password" ? "tabler:eye" : "tabler:eye-off"}
          />
        )}
      </Box>
      {error && (
        <Typography className="!text-red-500 !text-[11px] !float-right !px-2 !pt-0.5">
          {error}
        </Typography>
      )}
    </Box>
  );
};
