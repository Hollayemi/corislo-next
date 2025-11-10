"use client"
import AuthLayout from "@/app/components/layouts/AuthLayouts";
import { usePathname } from "next/navigation";

// export const metadata = {
//   title: "auth - Corislo",
//   description: "Showcase your store now",
// };

const config = {
  login: { title: 'Sign In to Account', center: true },
  refresh: { title: 'Authenticating', center: true, noLogo: true },
  logout: { title: 'User Logout', center: true },
  register: { title: 'Create Account'},
  forgot_password: { title: 'Forgot your Password?', center: true },
  reset_password: { title: 'Reset Account Password', center: true },
  verify_account: { title: 'Email Verification', center: true },
  send_mail: { title: 'Verify your Email Address', center: true },
  otp_verification: { title: 'Verify your Email Address', center: true },
}

export default function MyAuthLayout({ children }) {
   const pathname = usePathname();
   const path = pathname.split("/").pop();
   const realPath = path.split("?")[0].replaceAll("-", "_");

   return <AuthLayout {...config[realPath]}>{children}</AuthLayout>
}
