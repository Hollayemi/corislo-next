"use client";
import StoreLeftSideBar from "@/app/components/view/store/LeftSideBar";
import { settingsInnerList } from "@/app/data/store/innerList";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { settingsBreadCrumb } from "../components";
import { TitleSubtitle } from "@/app/(pages)/user/components";
import { OrderBoxes } from "@/app/components/cards/homeCards";
import { SimpleDropDown } from "../../product-management/add-new-product/components";
import { StaffCard } from "./staff.component";
import IconifyIcon from "@/app/components/icon";
import { useEffect, useState } from "react";
import { InputBoxWithSideLabel } from "../../stores/component";
import useSWR from "swr";
import { addStaff } from "@/app/redux/state/slices/shop/branches/staffs";
import { useDispatch } from "react-redux";
import { useStoreData } from "@/app/hooks/useData";

const Staffs = ({ params }) => {
  const path = {
    ...params,
    sidebar: "settings",
    sublist: "staffs",
  };
  const { showSnackbar, staffInfo: { permissions } } = useStoreData();
  const dispatch = useDispatch();
  const { data, isLoading } = useSWR("/branch/staffs");
  const myStaffs = (data && data.data) || [];
  const [dialogInfo, updateDialogInfo] = useState({
    open: false,
    title: "Add Employee",
    acceptFunctionText: "Go ahead, create",
    acceptFunction: () => {
      addStaff(adminValues, dispatch, showSnackbar);
    },
  });
  const [adminValues, setAdminValues] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    username: "",
  });
  const handleAdminChange = (prop) => (event) => {
    setAdminValues((prevValues) => ({
      ...prevValues,
      [prop]: event.target.value,
    }));
  };

    useEffect(() => {
      updateDialogInfo((prevDialogInfo) => ({
        ...prevDialogInfo,
        acceptFunction: () => {
          addStaff(adminValues, dispatch, showSnackbar);
        },
      }));
    }, [adminValues, addStaff, dispatch, showSnackbar]);

  return (
    <StoreLeftSideBar
      path={path}
      permission="view_staff"
      subListBar={false}
      InnerList={settingsInnerList}
      crumb={[...settingsBreadCrumb, { text: "Staffs", link: "staff" }]}
      dialogInfo={dialogInfo}
      updateDialogInfo={updateDialogInfo}
      dialogComponent={
        <NewStaff
          adminValues={adminValues}
          handleAdminChange={handleAdminChange}
        />
      }
    >
      <Box className="h-ful w-full bg-white px-1 md:px-5 py-8 rounded-md">
        <Box className="flex items-start justify-between w-full">
          <TitleSubtitle
            title="Employee"
            titleClass="!text-[18px]"
            subtitle="View and upgrade plans for your Corisio Store"
            subtitleClass="!text-[13px] !mt-2"
            className=""
          />
          <Button
            variant="contained"
            className="!text-[13px] !w-auto !h-10 !rounded-md !shadow-none"
            onClick={() => updateDialogInfo({ ...dialogInfo, open: true })}
            startIcon={<IconifyIcon icon="tabler:plus" />}
          >
            <span className="hidden md:block mr-1">New</span> Employee
          </Button>
        </Box>

        <Box className="w-full py-6 px-1 rounded-xl">
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

          <Box className="flex flex-col md:flex-row items-center justify-center mt-4">
            <Box className="w-full md:w-3/5 mb-2 md:mb-0 md:px-2">
              <TextField
                placeholder="Employee Name"
                size="small"
                className="w-full !mx-1 !mt-1"
                label="Employee Name"
              />
            </Box>
            <Box className="flex items-center w-full md:w-2/5">
              <Box className="w-1/2 !mx-1">
                <SimpleDropDown
                  inputProps={{ defaultValue: "All " }}
                  render={["All", "Active", "Inactive"].map((res, i) => (
                    <MenuItem key={i} value={res}>
                      {res}
                    </MenuItem>
                  ))}
                />
              </Box>
              <Box className="w-1/2 !mx-1">
                <SimpleDropDown
                  inputProps={{ defaultValue: "All" }}
                  render={["All", "Aaua branch"].map((res, i) => (
                    <MenuItem key={i} value={res} selected={i == 1}>
                      {res}
                    </MenuItem>
                  ))}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="">
          {myStaffs.map((branch, i) => (
            <Box key={i}>
              <Typography
                variant="body2"
                className="!text-[15px] !font-bold !ml-2 mb-1"
              >
                {branch._id} Staffs
              </Typography>
              <Box className="flex flex-wrap mb-5">
                {branch.details.map((staff, j) => (
                  <StaffCard
                    key={j}
                    name={staff.fullname}
                    role={staff.role}
                    status={staff.staffStatus}
                    id={staff._id}
                    image={`/images/avatar/${i + 1}.png`}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </StoreLeftSideBar>
  );
};

export default Staffs;

const NewStaff = ({ adminValues, handleAdminChange }) => (
  <Box>
    <InputBoxWithSideLabel
      value={adminValues.fullname}
      onChange={handleAdminChange("fullname", adminValues)}
      label="Fullname"
    />
    <InputBoxWithSideLabel
      value={adminValues.username}
      onChange={handleAdminChange("username", adminValues)}
      label="Username"
    />
    <InputBoxWithSideLabel
      value={adminValues.email}
      onChange={handleAdminChange("email", adminValues)}
      label="Email"
    />
    <InputBoxWithSideLabel
      value={adminValues.phoneNumber}
      onChange={handleAdminChange("phoneNumber", adminValues)}
      label="Phone Number"
    />
  </Box>
);
