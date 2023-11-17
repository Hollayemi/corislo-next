"use client";
import IconifyIcon from "@/app/components/icon";
import HomeWrapper from "@/app/components/view/home";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import StoreProducts from "./products";
import Review from "./review";
import { summarizeFollowers } from "../../../utils/format";
import Policies from "./policies";
import { TreeItem, TreeView } from "@mui/lab";

const BusinessPage = ({ params, searchParams }) => {
  console.log(params);
  const page = {
    0: <StoreProducts />,
    1: <Review />,
    2: <Policies />,
  };
  const followers = 12432000;
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
            <Box className="mt-48">
              <TreeView
                sx={{ minHeight: 240 }}
                defaultExpandIcon={<IconifyIcon icon="tabler:chevron-down" />}
                defaultCollapseIcon={<IconifyIcon icon="tabler:chevron-down" />}
              >
                <TreeItem nodeId="1" label="Applications">
                  <TreeItem nodeId="2" label="Calendar" />
                  <TreeItem nodeId="3" label="Chrome" />
                  <TreeItem nodeId="4" label="Webstorm" />
                </TreeItem>
                <TreeItem nodeId="5" label="Documents">
                  <TreeItem nodeId="10" label="OSS" />
                  <TreeItem nodeId="6" label="MUI">
                    <TreeItem nodeId="7" label="src">
                      <TreeItem nodeId="8" label="index.js" />
                      <TreeItem nodeId="9" label="tree-view.js" />
                    </TreeItem>
                  </TreeItem>
                </TreeItem>
              </TreeView>
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
                  {params.store}
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
                    startIcon={<IconifyIcon icon="tabler:user-plus" />}
                  >
                    Follow
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
            <Box className="w-full">{page[searchParams.R || 0]}</Box>
          </Box>
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default BusinessPage;
