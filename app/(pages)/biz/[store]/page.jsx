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
import { summarizeFollowers } from "../../../utils/format";
import Policies from "./policies";
import { TreeItem, TreeView } from "@mui/lab";
import { followStore } from "@/app/redux/state/slices/users/following";
import { useDispatch } from "react-redux";
import { useUserData } from "@/app/hooks/useData";
import { Fragment, useState } from "react";
import useSWR from "swr";

const BusinessPage = ({ params, searchParams }) => {
  const { following } = useUserData();
  const getStore = params.store.split("-");
  const { data, error } = useSWR(
    `/branch/info?store=${getStore[0]}&branch=${getStore[1]}`
  );
  const branchInfo = data ? data?.data : {}
  // ** State
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const isIncluded = following.includes(branchInfo?.branchId);

  const page = {
    0: <StoreProducts />,
    1: <Review />,
    2: <Policies />,
  };
  const followers = 12432000;
  const dispatch = useDispatch();
  return (
    <HomeWrapper customersReview={false}>
      <Box className="">
        <Image
          src="/images/misc/biz-header.png"
          alt="header"
          width={1900}
          height={1400}
          className="w-full"
        />
      </Box>
      <Box className="flex justify-center sticky top-0">
        <Box className="w-full px-2 md:w-10/12 flex items-start">
          <Box className="w-80 hidden md:block min-w-80">
            <Image
              src="/images/misc/shop/1.png"
              alt="flyer"
              width={400}
              height={400}
              className="!w-36 h-36 !rounded-full -m-8 border border-blue-800 float-right mr-10"
            />
            <Box className="mt-48 px-3">
              <Box className="bg-white">
                <List component="nav" aria-label="main mailbox">
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleClick}>
                      <ListItemIcon>
                        <IconifyIcon icon="tabler:mail" fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary="Inbox" />
                      <IconifyIcon
                        icon={
                          open ? "tabler:chevron-up" : "tabler:chevron-down"
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem disablePadding>
                        <ListItemButton sx={{ pl: 2 }}>
                          <ListItemIcon sx={{ mr: 4 }}>
                            <IconifyIcon
                              icon="tabler:clock-play"
                              fontSize={20}
                            />
                          </ListItemIcon>
                          <ListItemText primary="Scheduled" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Collapse>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <IconifyIcon icon="tabler:copy" fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary="Draft" />
                    </ListItemButton>
                  </ListItem>
                </List>
                <Divider sx={{ m: "0 !important" }} />
                <List component="nav" aria-label="secondary mailbox">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <IconifyIcon icon="tabler:copy" fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary="Snoozed" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <IconifyIcon icon="tabler:alert-circle" fontSize={20} />
                      </ListItemIcon>
                      <ListItemText primary="Spam" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Box>
          <Box className="w-full">
            <Box className="flex items-start justify-between mt-5 md:px-5 w-full">
              <Box>
                <Typography
                  variant="body2"
                  className="!text-2xl !font-bold"
                  color="custom.pri"
                >
                  {getStore[0]}
                </Typography>

                <Box className="flex items-center my-3">
                  <IconifyIcon
                    icon="tabler:link"
                    className="!mr-2 !text-[14px]"
                  />
                  <Link
                    href={`www.corisio.com/biz/${params.store}`}
                    className="!text-xs"
                    color="custom.pri"
                  >
                    www.corisio.com/biz/{params.store}
                  </Link>
                </Box>
                <Box className="flex items-center">
                  <Typography noWrap className="!font-bold !text-[11px]">
                    {summarizeFollowers(followers)} Followers
                  </Typography>
                  <Button
                    variant="contained"
                    className="!ml-1 md:!ml-5 w-32 md:w-36 h-10 !rounded-full !text-xs shadow-none"
                    startIcon={
                      <IconifyIcon
                        icon={
                          isIncluded ? "tabler:user-minus" : "tabler:user-plus"
                        }
                      />
                    }
                    onClick={() =>
                      followStore(branchInfo?.branchId, dispatch, isIncluded)
                    }
                  >
                    {isIncluded ? "Unfollow" : "Follow"}
                  </Button>
                </Box>
              </Box>
              <Button
                variant="outlined"
                className="!rounded-full h-10 w-40 !bg-white"
                startIcon={
                  <IconifyIcon
                    icon="tabler:message-2-plus"
                    className="!text-blue-800"
                  />
                }
              >
                Message
              </Button>
            </Box>
            <Box className="w-full">{page[searchParams.tab || 0]}</Box>
          </Box>
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default BusinessPage;
