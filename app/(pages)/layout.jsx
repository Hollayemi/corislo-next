import "@/styles/globals.css";
import ThemeComponent from "@/theme";

export const metadata = {
  title: "Corislo",
  description: "Showcase your store now",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <ThemeComponent>
          {children}
        </ThemeComponent>
      </body>
    </html>
  );
}
