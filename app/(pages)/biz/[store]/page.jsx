"use client";
import IconifyIcon from "@/app/components/icon";
import HomeWrapper from "@/app/components/view/home";
// ** MUI Imports
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import StoreProducts from "./products";
import Review from "./review";
import { mySubstring, summarizeFollowers } from "../../../utils/format";
import Policies from "./policies";
import { followStore } from "@/app/redux/state/slices/users/following";
import { useDispatch } from "react-redux";
import { useUserData } from "@/app/hooks/useData";
import { Fragment, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import StoreTabs from "./tabs";

const BusinessPage = ({ params, searchParams }) => {
  const router = useRouter();
  const { following, socket, isOffline } = useUserData();
  const getStore = params.store.split("-");
  const { data, error } = useSWR(
    `/branch/info?store=${getStore[0]}&branch=${getStore[1]}`
  );
  const branchInfo = data ? data?.data : {};
  // ** State
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const isIncluded = following.includes(branchInfo?.branchId);

  const page = {
    0: (
      <StoreProducts
        store={getStore[0]}
        branch={getStore[1]}
        searchParams={searchParams}
      />
    ),
    1: <Review store={getStore[0]} branch={getStore[1]} />,
    2: <Policies />,
  };
  const followers = 12432000;
  const dispatch = useDispatch();
  return (
    <HomeWrapper customersReview={false}>
      <Box className="relative">
        <Image
          src="/images/misc/biz-header.png"
          alt="header"
          width={1900}
          height={1400}
          className="w-full"
        />

        <Image
          src="/images/misc/shop/1.png"
          alt="flyer"
          width={400}
          height={400}
          className=" w-14 h-14  md:w-36 md:h-36 absolute -bottom-6 left-6 md:-bottom-12 md:left-28 !rounded-full md:-m-8 border border-blue-800 float-right mr-10"
        />
      </Box>
      <Box className="flex justify-center sticky top-0">
        <Box className="w-full mt-3 md:mt-0">
          <Box className="w-full flex justify-end relative">
            <Box className="flex items-start justify-between mt-5 px-4 md:px-5 w-full md:w-9/12">
              <Box className="w-6/12">
                <Typography
                  variant="body2"
                  noWrap
                  className=" !text-lg md:!text-2xl !font-bold !-mb-2"
                  color="custom.pri"
                >
                  {branchInfo?.businessName}
                </Typography>
                <Typography
                  variant="caption"
                  className="!font-bold !text[11px]"
                  color="custom.sec"
                >
                  @{getStore[0]} @{getStore[1]}
                </Typography>

                <Box className="flex items-center mt-1">
                  <IconifyIcon
                    icon="tabler:link"
                    className="!mr-2 !text-[14px]"
                  />

                  <Link
                    href={`www.corisio.com/biz/${params.store}`}
                    className="!text-[12px]"
                    color="custom.pri"
                  >
                    {mySubstring(`www.corisio.com/biz/${params.store}`, 25)}
                  </Link>
                </Box>
                <Box className="flex items-center">
                  <Typography noWrap className="!font-bold !text-[13px]">
                    {summarizeFollowers(followers)} Followers
                  </Typography>
                </Box>
              </Box>
              <Box className="flex items-center">
                <Box
                  onClick={() =>
                    router.push(`/chat?new=${branchInfo?.branchId}`)
                  }
                  variant="outlined"
                  className="!rounded-full h-8 cursor-pointer !w-9 border border-blue-900 !bg-white mr-2 flex items-center justify-center"
                >
                  <IconifyIcon
                    icon="tabler:message-2-plus"
                    className="!text-blue-800 text-[16px]"
                  />
                </Box>
                <Button
                  onClick={() =>
                    followStore(branchInfo, dispatch, socket, isIncluded)
                  }
                  variant="outlined"
                  className="!rounded-full h-8 !w-28 !bg-white"
                  startIcon={
                    <IconifyIcon
                      icon={
                        isIncluded ? "tabler:user-minus" : "tabler:user-plus"
                      }
                      className="!text-blue-800 !text-[16px]"
                    />
                  }
                >
                  {isIncluded ? "Following" : "Follow"}
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className="h-full mt-2 flex flex-col md:flex-row relative">
            <Box className="px-1 md:px-4 md:w-3/12 mt-10 sticky top-20">
              <Box className="bg-white md:py-4 rounded-md">
                <StoreTabs currTab={searchParams.tab} />
              </Box>
            </Box>
            <Box className="w-full md:w-9/12 relative">
              <Box className="w-full">{page[searchParams.tab || 0]}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default BusinessPage;
