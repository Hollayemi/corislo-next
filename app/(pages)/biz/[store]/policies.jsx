import { formatName } from "@/app/utils/get-initials";
import { Box, Typography } from "@mui/material";
import React from "react";
import useSWR from "swr";


// ****

// .

// ****  
// 

// **Contact Us**  
// 

// **About Us**  
// At [BusinessName], we believe in quality and customer satisfaction. Whether you’re visiting for the first time or a returning customer, we want you to feel at home in our store.

// **Social Media**  
// Stay connected with us on social media! Follow us on Facebook, Instagram, Twitter, and TikTok to get the latest updates, promotions, and more.


// **Payments and Refunds**  
// We offer secure payment options. If you need to make a payment, please have your account details ready. We also have a clear refund policy in place, ensuring that if you are not satisfied with your purchase, you have the option for a refund or exchange as per our terms.

// **Notifications**  
// We’ll keep you informed with notifications about your order status, including order confirmation, shipping updates, and more. If any item is low on stock or out of stock, we’ll notify you promptly to ensure you can plan your purchases accordingly.

// **Pre-orders**  
// 

// **Gallery and Profile**  
// Check out our gallery to see the latest products and store updates. Our profile image represents our commitment to quality and customer satisfaction.

// Thank you for choosing [BusinessName]. We look forward to serving you!

const Policies = ({ store, branch }) => {
  const { data, error } = useSWR(
    `/branch/info?store=${store}&branch=${branch}`
  )
  const info = data ? data?.data : {}
  console.log(info)
  const days = Object.keys(info?.opening_hours || {})
  const opening_hours = days.map(
    (x) =>
      info.opening_hours[x].isset && `${formatName(x)}: from ${
        info.opening_hours[x].from
      } to ${info.opening_hours[x].to},`
  )
  return (
    <Box className="!bg-white rounded-xl px-8 py-8 mt-10 !text-black">
      <Typography className="!font-bold !text-[12px]" variant="body2">
        Our Store Policies
      </Typography>
      <br />
      <Typography
        className="!text-[13px] !text-justify !font-light !leading-8 "
        variant="body2"
      >
        Welcome to {info.businessName} at {info.branchName}!
        <br />
        At {info.businessName}, we pride ourselves on providing top-notch
        service to our community. Located in {info.city},{info.state}, our store
        is easily accessible at {info.address}, near {info.landmark}. Our team
        is dedicated to making your shopping experience as smooth and enjoyable
        as possible
      </Typography>
      <EachExpression
        title="Store Hours"
        body={[
          'We understand the importance of convenience, which is why we are opening in the days below. Please note that we are closed on Sundays to allow our staff some well-deserved rest.',
          '------------------------',
          ...opening_hours,
          '------------------------',
        ]}
      />
      <EachExpression
        title="Product Pickup and Delivery"
        body={[
          `We offer ${
            info.pickup && info.waybill?.isset
              ? `both in-store pickup and waybill delivery options . For your convenience, you can pick up your order at the store or choose to have it delivered to your doorstep. Please note that a minimum purchase amount of ₦${
                  info.waybill?.minimum_amount
                } is required for delivery, and waybill fees are paid  ${
                  info.waybill?.waybill_fee_paid_seperately
                    ? 'on delivery'
                    : 'together with order.'
                }.`
              : info.pickup
              ? 'in-store pickup delivery option . For your convenience, you can pick up your order at the store or designate someone to pick your order on your behalf.'
              : `waybill delivery option . For your convenience, choose to have it delivered to your doorstep. Please note that a minimum purchase amount of ₦${
                  info.waybill?.minimum_amount
                } is required for delivery, and waybill fees are paid ${
                  info.waybill?.waybill_fee_paid_seperately
                    ? 'on delivery'
                    : 'together with order.'
                }.`
          }`,
        ]}
      />
      {/* <EachExpression
        title="Payment and Pricing Information"
        body={[
          'Accepted Payment Methods: We accept a variety of payment methods, including [list accepted payment options]. You can shop with confidence knowing your transactions are secure.',
          'Pricing: Our pricing is based on [explain how pricing is determined, e.g., cost, demand, market factors]. Prices are subject to change based on market conditions.',
          'Additional Charges: [Specify any additional charges like taxes, customs duties, or fees that customers should be aware of].',
        ]}
      /> */}
      {info.allow_preorder && (
        <EachExpression
          title="Pre-Order"
          body={[
            `Looking for something special? You can also place pre-orders with us. This ensures that your desired items are reserved and ready for you when you visit.`,
          ]}
        />
      )}
      {info?.refund_policies?.isset && (
        <EachExpression
          title="Terms and Conditions"
          body={[
            'By using our platform, you agree to abide by our terms and conditions. These include:',
            `Refund Policy: ${info?.refund_policies?.refund_policy}`,
            `Refund Option: ${info?.refund_policies?.refund_option?.join(
              ', '
            )}`,
            `Repayment Method: ${info?.refund_policies?.repayment_method?.join(
              ', '
            )}`,
          ]}
        />
      )}
      <EachExpression
        title="Contact Information"
        body={[
          "If you have any questions or need assistance, please don't hesitate to reach out to our dedicated customer support team.",
          `Email: ${info.email}`,
          `Phone: ${info.phone}`,
        ]}
      />
      <EachExpression
        title="Feedback and Reviews"
        body={[
          "We welcome your feedback and encourage you to leave reviews for products you've purchased. Your reviews can help fellow shoppers make informed choices.",
          `Conclusion We're thrilled to have you as our valued customer. These policies are designed to create a safe, transparent, and rewarding shopping environment. We recommend reviewing these policies before making a purchase to ensure a smooth shopping journey. Thank you for choosing ${info.businessName}.`,
          "If you have any questions or need further clarification on any policy, please don't hesitate to contact us. Your satisfaction is our priority.",
        ]}
      />
    </Box>
  )
}

export default Policies;

const EachExpression = ({ title, body }) => {
  return (
    <Box className="mt-4">
      <Typography className="!font-bold !text-sm" variant="body2">
        {title}
      </Typography>
      <ul className="ml-7 !text-sm dfdgfd">
        {body.map((item, i) => (
          <Typography
            variant="body2"
            key={i}
            className="!leading-8 !mt-2 !text-justify  !text-[12px] md:!text-[13px] !font-light"
          >
            {item}
          </Typography>
        ))}
      </ul>
    </Box>
  );
};
