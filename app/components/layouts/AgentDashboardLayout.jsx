import "@/styles/globals.css";

export const metadata = {
  title: "agent-corislo",
  description: "Showcase your store now",
};

export default function AgentDashboardLayout({ children }) {
  return (
    <div className="bg-gray-900 h-screen">
        {children}

        <h5 className="text-slate-500 text-center">Agent Layout</h5>
    </div>
  );
}
