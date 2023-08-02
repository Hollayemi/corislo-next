import "@/styles/globals.css";
import ThemeComponent from "@/theme";

export const metadata = {
  title: "Corislo-NG | Your One-Stop Ecommerce Hub for Next-Generation Solutions",
  description: "Your ultimate destination for top-quality products and unparalleled shopping experiences. Explore a captivating assortment of fashion, electronics, home essentials, and more. Immerse yourself in a seamless and secure shopping journey with our user-friendly platform. Indulge your senses, find inspiration, and redefine convenience with every visit. Embrace the joy of discovering something extraordinary as you navigate through our meticulously curated selection. Elevate your online shopping experience with Corislo – where dreams become reality.",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel='apple-touch-icon' sizes='180x180' href='/images/logo/icon/main.png' />
      <link rel='shortcut icon' href='/images/logo/icon/main.jpg' />
        <meta charSet="UTF-8" />
        <meta name="description" content=" Your ultimate destination for top-quality products and unparalleled shopping experiences. Explore a captivating assortment of fashion, electronics, home essentials, and more. Immerse yourself in a seamless and secure shopping journey with our user-friendly platform. Indulge your senses, find inspiration, and redefine convenience with every visit. Embrace the joy of discovering something extraordinary as you navigate through our meticulously curated selection. Elevate your online shopping experience with Corislo – where dreams become reality." />
        <meta name="keywords" content="HTML, CSS, JavaScriptOnline Shopping, Fashion, Electronics, Home Essentials, Quality Products, User-Friendly Platform, Secure Shopping, Curated Selection, Convenience, Seamless Experience, Trendy, High-Quality, Best Deals, Affordable Prices, Customer Satisfaction, Fast Delivery, Gift Ideas, Gadgets, Accessories, New Arrivals, Business Showcase, Store Registration, Business Promotion, Shop Owners, Local Businesses, Empowering Entrepreneurs, Shop Local, Online Marketplace, Small Businesses, Showcasing Talent, Shopkeepers, Independent Retailers, Supporting Local Economy, Discover Unique Businesses, Connecting Buyers and Sellers." />
        <meta name="author" content="Corislo - stephanyemmitty" />
        {/* Open Graph (OG) */}
        <meta property="og:title" content="Corislo-NG | Your One-Stop Ecommerce Hub for Next-Generation Solutions" />
        <meta property="og:description" content="Your ultimate destination for top-quality products and unparalleled shopping experiences. Explore a captivating assortment of fashion, electronics, home essentials, and more. Immerse yourself in a seamless and secure shopping journey with our user-friendly platform. Indulge your senses, find inspiration, and redefine convenience with every visit. Embrace the joy of discovering something extraordinary as you navigate through our meticulously curated selection. Elevate your online shopping experience with Corislo – where dreams become reality." />
        <meta property="og:image" content="/images/logo/horizontal/1.png" />
        <meta property="og:url" content="https:corislo-demo.vercel.app" />
        <meta property="og:type" content="product" />
      <body className="!overflow-x-hidden">
        <ThemeComponent>
          {children}
        </ThemeComponent>
      </body>
    </html>
  );
}
