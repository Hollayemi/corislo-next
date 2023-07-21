import AuthLayout from "@/app/components/layouts/AuthLayouts";

export const metadata = {
  title: "auth - Corislo",
  description: "Showcase your store now",
};

export default function MyAuthLayout({ children }) {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}
