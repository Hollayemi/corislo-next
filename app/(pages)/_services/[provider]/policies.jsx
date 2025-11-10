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

const Policies = ({ store, branch, services }) => {
  const { data, error } = useSWR(
    `/branch/info?store=${store}&branch=${branch}`
  )
  const info = data ? data?.data : {}
  console.log(info)
  const days = Object.keys(info?.opening_hours || {})
  const opening_hours = days.map(
    (x) =>
      info.opening_hours[x].isset && `${formatName(x)}: from ${info.opening_hours[x].from
      } to ${info.opening_hours[x].to},`
  )
  const getServiceDeliveryMessage = () => {
    const deliveryType = info.service_delivery_type

    switch (deliveryType) {
      case 'Visiting client':
        return `${info.businessName} offers a convenient option where our professionals will visit the client's location to provide onsite services.`

      case 'Client Visiting':
        return `Clients are required to visit our location to receive assistance with their services we render`

      case 'Both':
        return `${info.businessName} offers flexibility in service delivery: clients can either visit our business location or request a professional to visit them at their location for home service`

      default:
        return `Service delivery options are not specified at this time. Please contact ${info.businessName} for more details.`
    }
  }
  return (
    <Box className="!bg-white rounded-xl !px-4 pb-8 !text-black">
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
        {/* At {info.businessName}, we pride ourselves on providing top-notch
        service to our community. Located in {info.city}, {info.state}, our
        biusiness is easily accessible at {info.address}, near {info.landmark}.
        Our team is dedicated to making your shopping experience as smooth and
        enjoyable as possible.  */}
        Located in the vibrant city of {info.city}, {info.businessName}{' '}
        specializes in providing expert services to meet the unique needs of
        their clients. With a strong reputation for reliability and
        professionalism, the business operates from its main branch in
        {info.city}, offering convenient access to local residents and
        businesses alike. Customers can easily reach {info.businessName} through
        phone at <a href={`mail:${info.phone}`}>{info.phone}</a>. or email at{' '}
        <a href={`mail:${info.email}`}>{info.email}</a>. Whether you're seeking
        top-notch services in {services.join(" or ")} etc, {info.businessName} is dedicated to
        delivering high-quality results that meet a wide range of needs.
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
        title="Social Media presence"
        body={[
          `${info.businessName} actively engages with customers through several social media platforms. Whether you're looking to connect or stay updated with the latest services and offers, you can find them on:`,
          ...Object.entries(info.social_media || {}).map(
            ([platform, link]) =>
              link && (
                <a
                  key={platform}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              )
          ),
        ]}
      />
      <EachExpression
        title="Service Delivery"
        body={[getServiceDeliveryMessage()]}
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
      <ul className="ml-0 !text-sm dfdgfd">
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



const BusinessTerms = ({ businessDetails }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg space-y-4">
      {/* Business Information */}
      <article>
        <h2 className="text-2xl font-bold text-gray-800">{businessDetails.businessName}</h2>
        <p className="text-gray-600">
          Branch: {businessDetails.branch}, {businessDetails.city}, {businessDetails.state}
        </p>
        <p className="text-gray-600">Phone: {businessDetails.phone}</p>
        <p className="text-gray-600">Email: {businessDetails.email}</p>
        <p className="mt-2 text-gray-800">{businessDetails.about_business}</p>
      </article>

      {/* Gallery */}
      <article>
        <h3 className="text-xl font-semibold text-gray-700">Gallery</h3>
        <div className="grid grid-cols-3 gap-4">
          {businessDetails.gallery.map((image, index) => (
            <img key={index} src={image} alt="Business" className="w-full h-24 object-cover rounded" />
          ))}
        </div>
      </article>

      {/* Social Media Links */}
      <article>
        <h3 className="text-xl font-semibold text-gray-700">Social Media</h3>
        <div className="flex space-x-4">
          {Object.entries(businessDetails.social_media).map(([platform, link]) => (
            link && (
              <a
                key={platform}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </a>
            )
          ))}
        </div>
      </article>

      {/* Operating Hours */}
      <article>
        <h3 className="text-xl font-semibold text-gray-700">Opening Hours</h3>
        <ul className="space-y-1">
          {Object.entries(businessDetails.opening_hours).map(([day, { isset, from, to }]) => (
            <li key={day} className="text-gray-600">
              {day.charAt(0).toUpperCase() + day.slice(1)}: {isset ? `${from} - ${to}` : 'Closed'}
            </li>
          ))}
        </ul>
      </article>

      {/* Service Delivery Type */}
      <article>
        <h3 className="text-xl font-semibold text-gray-700">Service Delivery</h3>
        <p className="text-gray-600">
          Service Type: {businessDetails.service_delivery_type || 'N/A'}
        </p>
        {businessDetails.mobile_service.isset && (
          <div>
            <h4 className="text-lg font-medium text-gray-600">Mobile Service Locations</h4>
            <ul className="list-disc pl-5 space-y-1">
              {businessDetails.mobile_service.locations.map((location, index) => (
                <li key={index} className="text-gray-600">{location}</li>
              ))}
            </ul>
          </div>
        )}
      </article>

      {/* Service Policies */}
      <article>
        <h3 className="text-xl font-semibold text-gray-700">Service Policies</h3>
        {businessDetails.service_policies.isset ? (
          <div>
            <p className="text-gray-600">Payment Type: {businessDetails.service_policies.service_payment_type}</p>
            <h4 className="text-lg font-medium text-gray-600">Cancellation Policies:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {businessDetails.service_policies.cancellation_policies.map((policy, index) => (
                <li key={index} className="text-gray-600">{policy}</li>
              ))}
            </ul>
            <h4 className="text-lg font-medium text-gray-600">Repayment Methods:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {businessDetails.service_policies.repayment_method.map((method, index) => (
                <li key={index} className="text-gray-600">{method}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-600">No specific policies available.</p>
        )}
      </article>
    </div>
  );
};

// Sample data for testing
const businessDetails = {
  businessName: 'Tech Services',
  branch: 'Main',
  branchId: '670bbbcf4a1fb016a45d6f09',
  phone: '123-456-7890',
  email: 'info@techservices.com',
  about_business: 'We provide tech-related installation and repair services.',
  gallery: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
  city: 'Lagos',
  state: 'Lagos State',
  social_media: {
    facebook: 'https://facebook.com/techservices',
    instagram: 'https://instagram.com/techservices',
    twitter: 'https://twitter.com/techservices',
    tiktok: ''
  },
  opening_hours: {
    monday: { isset: true, from: '9:00', to: '17:00' },
    tuesday: { isset: true, from: '9:00', to: '17:00' },
    wednesday: { isset: true, from: '9:00', to: '17:00' },
    thursday: { isset: true, from: '9:00', to: '17:00' },
    friday: { isset: true, from: '9:00', to: '17:00' },
    saturday: { isset: false, from: '', to: '' },
    sunday: { isset: false, from: '', to: '' }
  },
  service_delivery_type: 'Onsite',
  mobile_service: {
    isset: true,
    locations: ['Lagos Mainland', 'Victoria Island', 'Ikeja']
  },
  service_policies: {
    isset: true,
    service_payment_type: 'Upfront',
    cancellation_policies: ['No refund on cancellations within 24 hours of service.'],
    repayment_method: ['Bank Transfer', 'Mobile Payment']
  }
};

export const Policy2 = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <BusinessTerms businessDetails={businessDetails} />
    </div>
  );
}
