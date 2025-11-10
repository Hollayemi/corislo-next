import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  MyTextField,
  TitleSubtitle,
  devicesColumn,
  rowSample,
} from "@/app/(pages)/(users)/user/components";
import IconifyIcon from "@/app/components/icon";
import OtpInput from "@/app/(pages)/(users)/auth/otp-verification/component";
import { resendOtp } from "@/app/redux/state/slices/auth/otp";
import { formatDate } from "@/app/utils/format";
import CustomOption from "@/app/components/option-menu/option";
import CheckPassword from "@/app/(pages)/(users)/user/checkPassword";
import useSWR, { mutate } from "swr";
import { changeStaffEmail } from "@/app/redux/state/slices/shop/auth/storeLogin";
import { changeStorePassword } from "@/app/redux/state/slices/shop/auth/resetPassword";
import OtpVerification from "@/app/(pages)/(users)/auth/otp-verification/page";

const Index = () => {
  const [display, setDisplay] = useState("all");
  const { data } = useSWR(`branch/staff`);
  const myAccount = data?.data || {};

  const pages = {
    all: <SecuritySettings setDisplay={setDisplay} myAccount={myAccount} />,
    password: <ChangePassword setDisplay={setDisplay} />,
    email: <EmailAddress setDisplay={setDisplay} myAccount={myAccount} />,
    activities: <AccountActivities setDisplay={setDisplay} />,
    verify: (
      <OtpVerification
        email={myAccount.email}
        account="staff"
        callback={() => {
          mutate("branch/staff");
          setDisplay("all");
        }}
      />
    ),
  };
  return pages[display];
};

export default Index;

const AccountActivities = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      <TitleSubtitle title="Account Activities" />
      <TitleSubtitle
        title="Device and Sessions"
        titleClass="!text-[14px]"
        subtitle="You are currently logged into these device(s):"
        subtitleClass="!text-[13px] !mt-2"
        className="mt-5 mb-5"
      />

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {devicesColumn.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowSample
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      <TableCell>
                        <Box className="flex items-center">
                          <Image
                            src={`/images/misc/${row.deviceType}.png`}
                            alt="imgs"
                            width={200}
                            height={200}
                            className="w-7 mr-2"
                          />
                          <Typography>{row.deviceName}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{row.via}</TableCell>
                      <TableCell>{formatDate(row.date)}</TableCell>
                      <TableCell>
                        <CustomOption
                          addBtn={
                            <Typography
                              variant="body2"
                              className="!text-[15px] !text-red-500 !font-bold mt-5"
                            >
                              Log out of this device
                            </Typography>
                          }
                          icon={
                            <Button
                              variant="outlined"
                              className="w-20 h-7 !rounded-full !border !border-blue-500 !text-[13px] !text-blue-600"
                            >
                              Option
                            </Button>
                          }
                          options={[]}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rowSample.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

const SecuritySettings = ({ setDisplay, myAccount }) => {
  const dispatch = useDispatch()
  console.log(myAccount);
  return (
    <Box>
      <TitleSubtitle title="Security Settings" />
      {/* Email Address */}
      <Box className="flex justify-between items-start mt-8">
        <TitleSubtitle
          title="Email Address"
          subtitle="The email address associated with your account"
          titleClass="!text-[14px]"
          subtitleClass="!text-[13px] !mt-2"
          className="w-5/6 md:w-10/12"
        />
        <Box className="flex items-center ">
          <Box className="flex flex-col items-end">
            <Typography
              variant="body2"
              className="!font-bold !w-24 md:!w-full "
              noWrap
            >
              {myAccount.email}
            </Typography>
            {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */}
            <Typography
              variant="body2"
              className={`${
                myAccount.isVerified ? "!text-green-500" : "!text-red-500"
              } !text-[12px]`}
            >
              {myAccount.isVerified ? "Verified" : "Verify email"}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            startIcon={
              <IconifyIcon
                icon="tabler:edit-circle"
                className="!text-gray-500"
              />
            }
            className="!rounded-full !border-gray-400 !text-gray-500 !ml-2 md:!ml-5"
            onClick={() =>
              myAccount.isVerified
                ? setDisplay("email")
                : resendOtp(
                    {
                      email: myAccount.email,
                      action: { to: "email-verification", account: "staff" },
                    },
                    dispatch,
                    () => setDisplay("verify")
                  )
            }
          >
            {myAccount.isVerified ? "Edit" : "Verify"}
          </Button>
        </Box>
      </Box>
      {/* Phone Number */}
      <Box className="flex justify-between items-center mt-8">
        <TitleSubtitle
          title="Phone Number"
          subtitle="The phone number associated with your account"
          titleClass="!text-[14px]"
          subtitleClass="!text-[13px] !mt-2"
          className="w-5/6 md:w-10/12"
        />
        <Box className="flex items-center">
          <Box className="flex flex-col items-end">
            <Typography
              variant="body2"
              className="!font-bold !w-24 md:!w-full"
              noWrap
            >
              +234{myAccount.phone}
            </Typography>
            <Typography variant="body2" className="!text-red-600 !text-[12px]">
              Not Verified
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            startIcon={
              <IconifyIcon
                icon="tabler:edit-circle"
                className="!text-gray-500"
              />
            }
            className="!rounded-full !border-gray-400 !text-gray-500 !ml-2 md:!ml-5"
            onClick={() => setDisplay("phone")}
          >
            Edit
          </Button>
        </Box>
      </Box>
      {/* Password */}
      <Box className="flex justify-between items-center mt-8">
        <TitleSubtitle
          title="Password"
          subtitle="Set a unique password to protect your account"
          titleClass="!text-[14px]"
          subtitleClass="!text-[13px] !mt-2"
          className="w-5/6 md:w-10/12"
        />

        <Button
          variant="outlined"
          size="small"
          className="!rounded-full !border-gray-400 !text-gray-500 flex-shrink-0 !ml-2 !w-36"
          onClick={() => setDisplay("password")}
        >
          Change Password
        </Button>
      </Box>
      {/* Account Activities */}
      <Box className="flex justify-between items-center mt-8">
        <TitleSubtitle
          title="Account Activities"
          subtitle="Make your account extra secure, Along with your password, you’ll need to enter a code"
          titleClass="!text-[14px]"
          subtitleClass="!text-[13px] !mt-2"
          className="w-5/6 md:w-10/12"
        />

        <Button
          variant="outlined"
          size="small"
          className="!rounded-full !border-gray-400 !text-gray-500 !ml-5"
          onClick={() => setDisplay("activities")}
        >
          View
        </Button>
      </Box>
    </Box>
  );
};

const ChangePassword = ({ setDisplay }) => {
  const dispatch = useDispatch();
  const [passData, setPassData] = useState({
    oldPassword: "",
    confirmPassword: "",
    newPassword: "",
  });

  const handleChange =
    (prop) =>
    ({ target }) => {
      setPassData((prev) => {
        return { ...prev, [prop]: target.value };
      });
    };
  return (
    <Box className="">
      <MyTextField
        title="Current Password"
        placeholder="Enter your current password"
        value={passData.oldPassword}
        onChange={handleChange("oldPassword")}
        type="password"
        PClassName="w-full sm:w-80"
      />
      <MyTextField
        title="New Password"
        placeholder="Enter your new password"
        value={passData.newPassword}
        onChange={handleChange("newPassword")}
        type="password"
        PClassName="w-full sm:w-80"
      />
      <MyTextField
        title="Confirm Password"
        placeholder="Confirm your new password"
        value={passData.confirmPassword}
        onChange={handleChange("confirmPassword")}
        type="password"
        PClassName="w-full sm:w-80"
      />
      <TitleSubtitle
        title="Password Requirements"
        subtitle="Ensure that these requirements are met:"
        titleClass="!text-[14px]"
        subtitleClass="!text-[13px] !mt-2"
        className="w-5/6 md:w-10/12 mt-4 mb-3"
      />
      <CheckPassword password={passData.newPassword} />
      <Box className="flex items-center mt-4">
        <Button
          className="!w-36 !h-10 !rounded-full !shadow-none"
          variant="contained"
          disabled={
            !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
              passData.newPassword
            )
          }
          onClick={() => changeStorePassword(passData, dispatch)}
        >
          Save Changes
        </Button>
        <Button
          className="!w-28 !h-10 !rounded-full !shadow-none !ml-4"
          variant="outlined"
          onClick={() => setDisplay("all")}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

const EmailAddress = ({ setDisplay, myAccount }) => {
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(60); // Initial countdown value in seconds
  const [resendDisabled, setResendDisabled] = useState(false);
  const [inputValues, setInputValues] = useState(["", "", "", "", "", ""]);
  const [emailData, setEmailData] = useState({
    password: "",
    email: "",
  });

  const handleResend = () => {
    // Handle OTP resend logic here
    // You can initiate the OTP resend process
    // and then reset the countdown timer
    resendOtp({ email: emailData.email, action: "change-email" }, dispatch);
    setCountdown(60);
    setResendDisabled(true);
  };

  useEffect(() => {
    let intervalId;

    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [countdown]);

  const otpValues = inputValues.join("");

  const handleChange =
    (prop) =>
    ({ target }) => {
      setEmailData((prev) => {
        return { ...prev, [prop]: target.value };
      });
    };
  return (
    <Box className="">
      <MyTextField
        title="New email"
        placeholder="Enter your new email"
        value={emailData.email}
        onChange={handleChange("email")}
        type="email"
        PClassName="w-full sm:w-80"
      />
      <MyTextField
        title="Email Password"
        placeholder="Enter your password"
        value={emailData.password}
        onChange={handleChange("password")}
        type="email"
        PClassName="w-full sm:w-80"
      />

      {resendDisabled ? (
        <Typography className="!text-[13px] !mt-2">
          Resend (
          <b color="custom.pri" className="!font-semibold">
            {countdown} Secs
          </b>
          )
        </Typography>
      ) : (
        <Button
          className="!w-20 !text-[11px] !h-8 !rounded-full !shadow-none"
          variant="contained"
          disabled={
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
              emailData.email
            )
          }
          onClick={handleResend}
        >
          Get Otp
        </Button>
      )}
      <Box className="w-fit !my-4">
        <OtpInput inputValues={inputValues} setInputValues={setInputValues} />
      </Box>
      <Box className="flex items-center mt-7">
        <Button
          className="!w-36 !h-10 !rounded-full !shadow-none"
          variant="contained"
          disabled={otpValues.length !== 6}
          onClick={() =>
            changeStaffEmail(
              {
                oldEmail: myAccount.email,
                newEmailAddress: emailData.email,
                password: emailData.password,
                otp: otpValues,
                isStaff: true,
              },
              dispatch
            )
          }
        >
          Save Changes
        </Button>
        <Button
          className="!w-28 !h-10 !rounded-full !shadow-none !ml-4"
          variant="outlined"
          onClick={() => setDisplay("all")}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
