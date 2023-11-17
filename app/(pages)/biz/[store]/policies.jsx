import { Box, Typography } from "@mui/material";
import React from "react";

const Policies = () => {
  return (
    <Box className="!bg-white rounded-xl px-8 py-8 mt-10 !text-black">
      <Typography className="!font-bold !text-xl" variant="body2">
        Our Store Policies
      </Typography>
      <br />
      <Typography className="!text-sm !leading-9 " variant="body2">
        Introduction Welcome to Clothing Store! <br />
        We're committed to providing you with an exceptional shopping
        experience. Our store policies ensure clarity, transparency, and
        fairness for all our valued customers. By shopping with us, you agree to
        adhere to the following policies.
      </Typography>
      <EachExpression
        title="1. Shipping and Delivery Policies"
        body={[
          "Shipping Methods: We offer a variety of shipping options for your convenience. Choose from standard, express, or overnight shipping, and more. We also provide international shipping to reach our global customers.",
          "Delivery Times: Our estimated delivery times are as follows: [Provide time frames for different shipping options]. Please note that these times may vary based on your location.",
          "Shipping Fees: [Explain any applicable shipping fees or charges]. Keep an eye on our promotions, as we often offer free shipping for specific orders.",
        ]}
      />
      <EachExpression
        title="2. Return and Refund Policies"
        body={[
          "Returns: If you're not satisfied with your purchase, you can return it within [number of days] days of receiving it. To initiate a return, please [provide instructions on how to request a return].",
          "Refunds: We aim to process refunds within [number of days] days after receiving your returned item. [Explain any conditions or exceptions related to refunds].",
          "Non-Returnable Items: Please note that the following items are non-returnable: [List specific non-returnable products or categories].",
        ]}
      />
      <EachExpression
        title="3. Payment and Pricing Information"
        body={[
          "Accepted Payment Methods: We accept a variety of payment methods, including [list accepted payment options]. You can shop with confidence knowing your transactions are secure.",
          "Pricing: Our pricing is based on [explain how pricing is determined, e.g., cost, demand, market factors]. Prices are subject to change based on market conditions.",
          "Additional Charges: [Specify any additional charges like taxes, customs duties, or fees that customers should be aware of].",
        ]}
      />
      <EachExpression
        title="4. Privacy and Security"
        body={[
          "Data Security: Your privacy and data security are paramount to us. We have rigorous data protection measures in place to safeguard your personal information.",
          "Third-Party Services: In some cases, we use trusted third-party services for payment processing and other functions. Rest assured, these services meet our stringent security standards.",
          "Privacy Policy: For detailed information about our privacy practices, please review our [link to Privacy Policy].",
        ]}
      />
      <EachExpression
        title="5. Terms and Conditions"
        body={[
          "Usage Terms: By using our platform, you agree to abide by our terms and conditions. These include [mention key usage terms like content ownership and acceptable use].",
          "Prohibited Content: We do not permit [list any specific types of content or behavior that are prohibited on your platform].",
        ]}
      />
      <EachExpression
        title="6. Contact Information"
        body={[
          "If you have any questions or need assistance, please don't hesitate to reach out to our dedicated customer support team.",
          "Email: [Your Customer Support Email]",
          "Phone: [Your Customer Support Phone Number]",
          "Business Hours: [Your Customer Support Business Hours]",
        ]}
      />
      <EachExpression
        title="7. Feedback and Reviews"
        body={[
          "SWe welcome your feedback and encourage you to leave reviews for products you've purchased. Your reviews can help fellow shoppers make informed choices.",
          "Conclusion We're thrilled to have you as our valued customer. These policies are designed to create a safe, transparent, and rewarding shopping environment. We recommend reviewing these policies before making a purchase to ensure a smooth shopping journey. Thank you for choosing [Your Store Name].",
          "If you have any questions or need further clarification on any policy, please don't hesitate to contact us. Your satisfaction is our priority.",
        ]}
      />
    </Box>
  );
};

export default Policies;

const EachExpression = ({ title, body }) => {
  return (
    <Box className="mt-4">
      <Typography className="!font-bold !text-sm" variant="body2">
        {title}
      </Typography>
      <ul className="ml-7 !text-sm dfdgfd">
        {body.map((item, i) => (
          <li key={i} className="leading-10 mt-2 !font-[200] !text-[15px] !font-light">
            {item}
          </li>
        ))}
      </ul>
    </Box>
  );
};
