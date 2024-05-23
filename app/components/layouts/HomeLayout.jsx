import "@/styles/globals.css";

export const metadata = {
  title: "Corislo",
  description: "Showcase your store now",
};

export default function HomeLayout({ children }) {
  return (
    <div className="bg-gray-900 h-screen">
        {children}

        <h5 className="text-slate-500 text-center">Home Layout</h5>
    </div>
  );
}
