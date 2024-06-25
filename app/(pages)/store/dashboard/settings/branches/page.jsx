"use client";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import { settingsInnerList } from "@/app/data/store/innerList";
import { useRouter } from "next/navigation";
import { Box, Button } from "@mui/material";
import { settingsBreadCrumb } from "../components";
import { TitleSubtitle } from "@/app/(pages)/user/components";
import { OrderBoxes } from "@/app/components/cards/homeCards";
import IconifyIcon from "@/app/components/icon";
import { BranchCard } from "./branch.component";
import useSWR from "swr";

const Branches = ({ params }) => {
  const router = useRouter();
  const {data,  isLoading} = useSWR("/branch/all");
  const myBranches = data && data.data || []
  const path = {
    ...params,
    sidebar: "settings",
    sublist: "branches",
  };

  return (
    <StoreLeftSideBar
      path={path}
      permission="view_stores"
      subListBar={false}
      InnerList={settingsInnerList}
      crumb={[...settingsBreadCrumb, { text: "Branches", link: "staff" }]}
    >
      <Box className="h-ful w-full bg-white px-1 md:px-5 py-8 rounded-md">
        <Box className="flex items-start justify-between w-full">
          <TitleSubtitle
            title="Branches"
            titleClass="!text-[18px]"
            subtitle="View and upgrade plans for your Corisio Store"
            subtitleClass="!text-[13px] !mt-2"
            className=""
          />
          <Button
            variant="contained"
            className="!text-[13px] !w-auto !h-10 !rounded-md !shadow-none"
            onClick={() => router.push("/store/dashboard/stores/sub-store")}
            startIcon={<IconifyIcon icon="tabler:plus" />}
          >
            <span className="hidden md:block mr-1">Create New</span> Branch
          </Button>
        </Box>

        <Box className="w-full py-6 px-2  rounded-xl">
          <Box className="flex items-center flex-wrap">
            <OrderBoxes
              image="/images/misc/all-orders.png"
              title="All Employees"
              value={100}
              color="#D65C48"
            />
            <OrderBoxes
              image="/images/misc/cancel-orders.png"
              title="New Employee"
              value={23}
              color="#9736BE"
            />
            <OrderBoxes
              image="/images/misc/ongoing-orders.png"
              title="Male"
              value={60}
              color="#2FA794"
            />
            <OrderBoxes
              image="/images/misc/completed-orders.png"
              title="Female"
              value={40}
              color="#3B47AF"
            />
          </Box>
        </Box>
        <Box className=" flex flex-wrap">
          {myBranches.map((each, i) => (
            <BranchCard
              branchName={each.more.branchName}
              branch={each.branch}
              image={`/images/misc/shop/${i + 1}.png`}
              followers={each.followers}
              feedback={each.feedback}
              coverImage={`/images/more/store-gallery${i + 1}.png`}
            />
          ))}
        </Box>
      </Box>
    </StoreLeftSideBar>
  );
};

export default Branches;
