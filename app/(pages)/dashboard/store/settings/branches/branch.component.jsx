import IconifyIcon from "@/app/components/icon";
import OptionsMenu from "@/app/components/option-menu";
import { Colors } from "@/app/utils/Colors";
import { formatDate } from "@/app/utils/format";
import { hexToRGBA } from "@/app/utils/hex-to-rgba";
import { rgbaToHex } from "@/app/utils/rgba-to-hex";
import { Box, Rating, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export const BranchCard = ({
  image,
  coverImage,
  branchName,
  followers,
  feedback,
  branch,
}) => {
  const [interval, setInterval] = useState("");
  return (
    <Box className="w-full md:w-1/2 p-2">
      <Box className="w-full relative p-1 bg-gray-50 border rounded-xl flex-shrink-0 transition-all duration-300 hover:shadow">
        <Image
          src={coverImage}
          alt="images"
          width={300}
          height={200}
          className="w-full h-40 md:h-44 rounded-t-xl"
        />
        <Box className="flex items-center mb-2 !px-2 relative">
          <Box className="absolute top-0 right-0 mr-2 mt-2">
            <OptionsMenu
              icon={<IconifyIcon icon="tabler:dots" className="!text-[18px]" />}
              options={["Edit info", "Revoke Access"]}
              setOption={setInterval}
              iconButtonProps={{
                size: "small",
                sx: { color: "text.disabled", cursor: "pointer" },
              }}
            />
          </Box>
          <Box className="w-16 md:w-20 h-16 md:h-20 rounded-full -mt-8 md:-mt-10 bg-gray-50 p-2">
            <Image
              src={image}
              alt="img"
              width={100}
              height={100}
              className="w-full h-full rounded-full"
            />
          </Box>
          <Box className="ml-3 mt-2">
            <Typography
              variant="body2"
              className="!font-bold !text-[16px] !mb-1"
            >
              {branchName}
            </Typography>
            <Box className="flex items-center mb-1">
              <Box className="flex items-center w-fit jusify-center bg-gray-100 rounded-full !px-2 mr-2">
                <Typography variant="caption" className="!text-[11px]">
                  {branch}
                </Typography>
              </Box>
              <Typography variant="body2" className="!text-[13px] !font-bold">
                {followers || 0} Followers
              </Typography>
            </Box>
            <Box className="flex items-center">
              <Rating
                defaultValue={feedback?.averageRating}
                readOnly
                size="small"
                precision={0.1}
              />
              <Typography
                variant="body2"
                className="!text-[13px] !font-bold !mt-1 !ml-1"
              >
                ({feedback?.totalReviews || 0}) Ratings
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
