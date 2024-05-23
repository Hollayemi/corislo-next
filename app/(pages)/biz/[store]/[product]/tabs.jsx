import { Box, Typography } from "@mui/material";

export const ProdDescription = () => {
  return (
    <Box>
      <InfoCaption
        title="Product Title:"
        caption="Flangesio Ultra-Cool Design Men's Sneakers PU Leather Trend Casual
            Shoes EUR Size 39-48 New Arrival Leisure Runway Sneakers Cool
            Jogging Shoes Comfort Male Athletic Tennis Shoes Man Sport Training
            Footwear Black"
      />
      <InfoCaption title="Brand: " caption="Flangesio" />
      <br />
      <InfoCaption
        title="Product Description: "
        br
        caption="Elevate your style with the Flangesio Ultra-Cool Design Men's
            Sneakers. Crafted for those who appreciate the perfect blend of
            fashion and functionality, these sneakers are the epitome of trendy
            footwear. Whether you're stepping out for a casual day with friends,
            hitting the gym, or embracing your inner sports enthusiast, these
            sneakers are designed to provide unmatched comfort and style."
      />
      <InfoCaption
        title="Key Features: "
        br
        caption="Elevate your style with the Flangesio Ultra-Cool Design Men's
            Sneakers. Crafted for those who appreciate the perfect blend of
            fashion and functionality, these sneakers are the epitome of trendy
            footwear. Whether you're stepping out for a casual day with friends,
            hitting the gym, or embracing your inner sports enthusiast, these
            sneakers are designed to provide unmatched comfort and style."
      />
    </Box>
  );
};

const InfoCaption = ({ title, caption, br }) => {
    return (
      <Typography className="!text-gray-400 !text-[13px] !my-2 !leading-9">
        <span className="!text-black w-28">{title}</span> <br className={`${!br && "hidden"}`} /> {caption}
      </Typography>
    );
}

// Key Features:
// Ultra-Cool Design: These sneakers feature a contemporary and eye-catching design that sets you apart from the crowd. The trendy runway-inspired look makes them perfect for urban explorers who want to make a style statement.
// High-Quality PU Leather: Crafted from premium PU leather, these sneakers offer durability, flexibility, and a leather-like texture. The PU leather is easy to clean, ensuring your shoes maintain their pristine appearance.
// Wide Size Range: Flangesio offers these sneakers in European sizes from 39 to 48, catering to a broad range of foot sizes.
// New Arrival: Stay ahead of the fashion curve with these new arrival sneakers. Flangesio continually updates its designs to offer you the latest in footwear fashion.
// Versatile Casual Wear: These sneakers are not limited to athletic purposes. They are perfect for everyday casual wear, enhancing your street style or providing a sporty edge to your outfit.
// Optimal Comfort: The shoes are designed for all-day comfort. With cushioned insoles and comfortable lining, you can go about your day without discomfort.
// Durable Soles: The sneakers feature robust soles that provide excellent traction and ensure your footwear can withstand everyday wear and tear.
// Perfect for Athletic Activities: Whether you're jogging, hitting the gym, playing tennis, or engaging in any sports activity, these sneakers offer the support and functionality you need.
// Available Sizes:
//         EUR 39, EUR 40, EUR 41, EUR 42, EUR 43, EUR 44. EUR 45, EUR 46, EUR 47, EUR 48
// Color: Black
// Brand Guarantee:
//         Flangesio is a trusted brand known for its dedication to producing high-quality footwear. With these sneakers, you can be confident in the brand's commitment to delivering fashionable and reliable shoes.
// Upgrade your shoe collection with the Flangesio Ultra-Cool Design Men's Sneakers. Don't miss out on this fantastic opportunity to enjoy stylish and comfortable footwear. Order now and experience the difference in quality and design.
