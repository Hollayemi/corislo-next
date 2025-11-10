"use client";
// ** React Imports
import { useState } from "react";
import Box from "@mui/material/Box";

import { CustomInput } from "@/app/components/cards/auth/components";
import { Button } from "@mui/material";
import CheckPassword from "../../user/checkPassword";
import { useDispatch } from "react-redux";
import { ResetPasswordHandler } from "@/app/redux/state/slices/auth/resetPassword";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPassword = ({ btnClick, newPayload }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const payload = {
    password,
    ...token,
    ...newPayload,
  };

  console.log(payload);
  const buttonFunc = () => {
    const func = btnClick ? btnClick : ResetPasswordHandler;

    func(payload, router, dispatch);
  };

  return (
    <Box className="!mt-10 mb-16 w-full max-w-[380px]">
      <CustomInput
        title="New Password"
        id="pass"
        onChange={(e) => setPassword(e.target.value)}
        hideCheck={true}
        inputProps={{
          type: "password",
          value: password,
          placeholder: "Enter your new password",
        }}
      />
      <br />
      <CustomInput
        title="Confirm New Password"
        id="confPass"
        onChange={(e) => setConfPass(e.target.value)}
        hideCheck={true}
        error={password !== confPass ? "Password not match" : null}
        inputProps={{
          type: "password",
          value: confPass,
          placeholder: "Enter your new password again to confirm",
        }}
      />
      <br />

      <CheckPassword password={password} />

      <Button
        variant="contained"
        onClick={buttonFunc}
        className="!h-10 w-full !rounded-full !text-gray-100 !text-[14px] !mt-6"
        disabled={
          !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
        }
      >
        Reser your password
      </Button>
    </Box>
  );
};

export default ResetPassword;
