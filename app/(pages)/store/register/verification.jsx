"use client";

import IconifyIcon from "@/app/components/icon";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import DocumentUploader from "./dropZone";

const Verification = () => {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("");
  const text =
    "Business profile needs to upload their business documents.----The Business documents will be reviewed within 1 - 2 Minutes.----The Business profile will be notified of the verification status.";
  return (
    <Box className="">
      <Box className="flex items-center flex-col">
        <Image
          src="/images/misc/wallet-verified.png"
          alt="logo"
          width={80}
          height={80}
          className="w-16"
        />
      </Box>
      {!files.length ? (
        <Box>
          <Typography
            variant="body1"
            className="!font-bold !text-xl !text-center !my-3"
          >
            Upload proof of your Business <br /> Registration
          </Typography>
          {text.split("----").map((each, i) => (
            <CheckList text={each} />
          ))}
          <DocumentUploader setFiles={setFiles} files={files} />
        </Box>
      ) : (
        <>
          <Typography
            variant="body1"
            className="!font-bold !text-xl !text-center !my-3"
          >
            Upload Processing
          </Typography>
          <UploadStatus status={status} />
        </>
      )}
    </Box>
  );
};

export default Verification;

const statusObj = {
  uploading: "tabler:dots",
  failed: "tabler:x",
  verified: "tabler:check",
};

const CheckList = ({ text, status, error, uploading, gray }) => (
  <Box className="flex items-center !mb-2 mx-1 cursor-pointer">
    <Box
      className="w-4 h-4 rounded-full flex flex-shrink-0 items-center justify-center !mt-1"
      bgcolor={
        gray ? "gray" : error ? "red" : uploading ? "black" : "custom.pri"
      }
    >
      <IconifyIcon
        icon={statusObj[status]}
        className="!text-[11px] !text-white"
      />
    </Box>
    <Box className="ml-2">
      <Typography
        variant="caption"
        className="!text-[11px]"
        color={
          gray ? "gray" : error ? "red" : uploading ? "black" : "custom.pri"
        }
      >
        {text}
      </Typography>
    </Box>
  </Box>
);

const UploadStatus = ({ status }) => {
  return (
    <Box className="flex flex-col items-center">
      <CheckList text="Document submitted." status="verified" />
      <Box className="w-[1px] h-5 border border-dashed"></Box>
      <CheckList
        text="Document Upload Under review status."
        status={status}
        uploading={status === "uploading"}
      />
      <Box className="w-[1px] h-5 border border-dashed"></Box>
      <CheckList
        text="Verified."
        error={status !== "verified"}
        status={status}
        gray={status === "uploading"}
      />
    </Box>
  );
};
