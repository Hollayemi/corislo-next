"use client";
import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";

const OnlyContents = ({ each, path }) => {
  const onSubList = !path.sublist ? "" : `/${path.sublist}`;
  const listPath = `/store/dashboard/${path.sidebar}${each.path}`;
  return (
    <BottomNavigationAction
      label={each.name}
      value={listPath}
      icon={<LocationOnIcon />}
    />
  );
};

export default function BottomBar({ content, path, InnerList }) {
  const [value, setValue] = React.useState("recents");
  const router = useRouter();
  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    router.push(newValue);
  };

  return (
    <BottomNavigation className="w-full border-t" value={value} onChange={handleChange}>
      {InnerList?.content?.map((each, index) => {
        const listPath = `/store/dashboard/${path.sidebar}${each.path}`;
        return (
          each.short !== "escape" && (
            <BottomNavigationAction
              key={index}
              label={<h5 className="text-[10px]">{each.short}</h5>}
              value={listPath}
              icon={each.icon}
            />
          )
        );
      })}
    </BottomNavigation>
  );
}
