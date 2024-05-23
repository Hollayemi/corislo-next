import "@/styles/globals.css";

export const metadata = {
  title: "admin-corislo",
  description: "Showcase your store now",
};

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="bg-gray-900 h-screen">
        {children}

        <h5 className="text-slate-500 text-center">Admin Layout</h5>
    </div>
  );
}
