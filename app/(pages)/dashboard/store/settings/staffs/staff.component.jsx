import IconifyIcon from "@/app/components/icon";
import OptionsMenu from "@/app/components/option-menu";
import { useStoreData } from "@/app/hooks/useData";
import { updateStaff } from "@/app/redux/state/slices/shop/branches/staffs";
import { Colors } from "@/app/utils/Colors";
import { formatDate } from "@/app/utils/format";
import { hexToRGBA } from "@/app/utils/hex-to-rgba";
import { rgbaToHex } from "@/app/utils/rgba-to-hex";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const StaffCard = ({ image, name, role, joinDate, status, id }) => {
  const { showSnackbar } = useStoreData();
  const dispatch = useDispatch()

  const FlexContent = ({ tag, info }) => (
    <Box className="flex items-center justify-between">
      <Typography variant="body2" className="w-20 !text-[11px]">
        {tag}
      </Typography>
      <Typography variant="body2" className="!text-[11px] !text-center">
        {info}
      </Typography>
    </Box>
  );

  const IconBtn = ({ icon, middle }) => {
    const randomIndex = Math.floor(Math.random() * Colors.length);
    let bgColor = rgbaToHex(hexToRGBA(Colors[randomIndex], 0.1));
    return (
      <Box
        className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 hover:-mt-3"
        bgcolor={middle && bgColor}
      >
        <IconifyIcon icon={icon} className="text-[17px]" />
      </Box>
    );
  };
  return (
    <Box className="w-1/2 sm:w-48 !px-1 py-2 ">
      <Box className="w-full relative bg-gray-50 border rounded-xl flex-shrink-0 transition-all duration-300 hover:shadow">
        <Box className="absolute top-0 right-0 mr-2 mt-2">
          <OptionsMenu
            icon={<IconifyIcon icon="tabler:dots" className="!text-[17px]" />}
            options={[
              "Edit info",
              { text: "Revoke Access", rest: "deactivated" },
              { text: "Give Access", rest: "activated" },
            ]}
            setOption={(e) =>
              updateStaff(
                dispatch,
                { staffId: id, staffStatus: e },
                showSnackbar
              )
            }
            iconButtonProps={{
              size: "small",
              sx: { color: "text.disabled", cursor: "pointer" },
            }}
          />
        </Box>
        <Box className="flex flex-col justify-center items-center mt-5 mb-2">
          <Image
            src={image}
            alt="img"
            width={100}
            height={100}
            className="w-16 h-16 rounded-full !mb-3"
          />
          <Typography
            variant="body2"
            className="!font-bold !text-[14px] !h-7 text-center !mb-1 !mx-1"
          >
            {name}
          </Typography>
          <Box className="flex items-center jusify-center bg-gray-100 rounded-full !px-2">
            <Typography variant="caption" className="!text-[11px]">
              {role}
            </Typography>
          </Box>

          <Box className="mt-3">
            <FlexContent tag="Status" info={status} />
            <FlexContent tag="Joined Date" info={formatDate(joinDate)} />
          </Box>
          <Box className="flex items-center justify-evenly w-full mt-4">
            <IconBtn icon="tabler:phone" />
            <IconBtn icon="tabler:message-circle" middle />
            <IconBtn icon="tabler:user-circle" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
