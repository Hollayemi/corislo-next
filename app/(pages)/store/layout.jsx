'use client';
import StoreDashboardLayout from "@/app/components/layouts/StoreDashboardLayout";

export const metadata = {
  title: "Corislo",
  description: "Showcase your store now",
};

export default function MyStoreDashboardLayout({ children }) {
    
    return (
        <StoreDashboardLayout>
            {children}
        </StoreDashboardLayout>
    )
}
