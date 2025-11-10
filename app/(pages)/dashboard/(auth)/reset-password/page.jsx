"use client";
import ResetPassword from "@/app/(pages)/(users)/auth/reset-password/page";
import AuthLayout from "@/app/components/layouts/AuthLayouts";
import { passwordResetHandler } from "@/app/redux/state/slices/shop/auth/resetPassword";
import { use } from "react";

const ResetStorePass = ({ searchParams }) => {
  const { new: isNew, store, token } = use(searchParams)
  return (
    <AuthLayout
      title={isNew ? "Welcome, Set Your Account Password" : "Reset Password"}
      center
    >
      <ResetPassword
        newPayload={{ store, token }}
        btnClick={passwordResetHandler}
      />
    </AuthLayout>
  );
};

export default ResetStorePass;
