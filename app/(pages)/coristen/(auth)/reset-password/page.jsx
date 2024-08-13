"use client";
import ResetPassword from "@/app/(pages)/auth/reset-password/page";
import AuthLayout from "@/app/components/layouts/AuthLayouts";
import { passwordResetHandler } from "@/app/redux/state/slices/shop/auth/resetPassword";
import { useSearchParams } from "next/navigation";

const ResetStorePass = () => {
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new");
  const store = searchParams.get("store");
  const token = searchParams.get("token");
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
