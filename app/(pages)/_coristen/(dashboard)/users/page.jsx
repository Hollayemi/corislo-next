"use client";
import SuperLeftBar from "@/app/components/view/super/SuperLeftBar";
import { Box, Button, Typography } from "@mui/material";
import Table from "@/app/components/view/store/tables/OrderTable";
import { allCustomers } from "../components/columns";
import useSWR from "swr";
import { useState } from "react";
import { UserCard } from "../components/users";
import RegisterAccount from "@/app/(pages)/(users)/auth/register/page";

const SuperDashboard = ({ params }) => {
  const { data, error, isLoading } = useSWR("/super/all-users");
  const [rightOpen, setRightOpen] = useState(false);
  console.log(data);
  return (
    <SuperLeftBar
      setRightOpen={setRightOpen}
      rightOpen={rightOpen}
      path={{ ...params, sidebar: "users" }}
    >
      <Box>
        <Box className="flex items-center justify-between !px-3 py-3 mb-4">
          <Typography variant="h5" className="!font-bold !text-sm md:!text-2xl">
            Corisio Users
          </Typography>
          <Box>
            <Button
              className="w-20 md:w-24 !px-0 !bg-white !text-black !rounded-lg !mr-2 md:!mr-5 !text-[12px] md:!text-[13px]"
              variant="contained"
            >
              Export
            </Button>
            <Button
              className="w-24 md:w-32 !px-0  !text-white !rounded-lg !text-[12px] md:!text-[13px]"
              variant="contained"
              onClick={() =>
                setRightOpen(
                  <Box className="!px-4 bg-gray-50 h-full">
                    <Typography
                      variant="h5"
                      className="!font-bold !text-[16px] !mb-3 !py-3"
                    >
                      Create New User
                    </Typography>
                    <RegisterAccount fromSuper />
                  </Box>
                )
              }
            >
              Add New User
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className="bg-white shadow-md rounded-lg w-full p-2">
        {!error && !isLoading && (
          <Table
            columns={allCustomers}
            onRowClick={(info) =>
              setRightOpen(
                <UserCard {...info} setRightOpen={() => setRightOpen(false)} />
              )
            }
            rows={data.data[0].all}
            size={10}
          />
        )}
      </Box>
    </SuperLeftBar>
  );
};

export default SuperDashboard;
