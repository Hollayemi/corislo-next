import { Box, Typography } from "@mui/material";

const TitledStatement = ({ title, statement, styleStatement, styleTitle }) => {
  return (
    <Box className="!mb-6">
      <Typography
        variant="h5"
        className={`!font-bold !text-[14px] !text-left ${styleTitle}`}
      >
        {title}
      </Typography>
      <Typography
        variant="caption"
        className={`!mt-2 !text-left ${styleStatement}`}
      >
        {statement}
      </Typography>
    </Box>
  );
};

export const TermsOfService = () => {
  return (
    <Box>
      <Typography
        variant="body1"
        className="!font-semibold !text-3xl !text-left"
      >
        Terms of Service
      </Typography>
      <Typography variant="body2" className="!font-bold !text-xl !mt-3 !mb-10 !text-left">
        Welcome to Mamafeeds
      </Typography>

      <TitledStatement
        title="Acceptance of Terms"
        statement="Welcome to MamaFeeds . By accessing or using our website and our services, you agree to comply with and be bound by these Terms of Service. If you do not agree with these terms, please do not use our Site or Services."
      />
      <TitledStatement
        title="Use of Services"
        statement={
          <span>
            You agree to use our Services only for lawful purposes and in a
            manner consistent with these TOS and applicable laws. <br /> You
            shall not engage in any activities that disrupt or interfere with
            the functionality or security of the Site or Services.
          </span>
        }
      />
      <TitledStatement
        title="Account Registration"
        statement={
          <span>
            To access certain features of our Services, you may need to create
            an account. You are responsible for providing accurate and complete
            information during registration. <br /> You are solely responsible
            for maintaining the confidentiality of your login credentials and
            are liable for any activity under your account.
          </span>
        }
      />
      <TitledStatement
        title="Intellectual Property"
        statement={
          <span>
            All content on our Site, including but not limited to text, images,
            graphics, logos, and trademarks, is our intellectual property.
            <br />
            You may not use, modify, distribute, reproduce, or create derivative
            works from any content without our explicit written consent.
          </span>
        }
      />
      <TitledStatement
        title="Product Information"
        statement={
          <span>
            While we strive for accuracy, we do not guarantee that product
            information, including colors, sizes, and descriptions, will be
            accurate or error-free due to variations in display settings.
            <br />
            Product availability is subject to change without notice.
          </span>
        }
      />
      <TitledStatement
        title="Pricing and Payments"
        statement={
          <span>
            Product prices are listed in the applicable currency and do not
            include taxes or shipping fees unless specified. We reserve the
            right to change prices, offers, and availability without prior
            notice.
            <br />
            Payment is required before an order is processed.
          </span>
        }
      />
      <TitledStatement
        title="Shipping and Returns"
        statement="Please refer to our Shipping and Returns policies for information about shipping times, methods, and our return and exchange policies."
      />
      <TitledStatement
        title="Limitation of Liability"
        statement={
          <span>
            Our Site and Services are provided on an &ldquo;as is&ldquo; and
            &ldquo;as available&ldquo; basis.
            <br />
            We shall not be liable for any direct, indirect, incidental,
            special, consequential, or punitive damages arising from the use or
            inability to use our Site or Services.
          </span>
        }
      />
      <TitledStatement
        title="Changes to TOS"
        statement={
          <span>
            We reserve the right to modify or update these TOS at any time.
            <br />
            Changes will be effective upon posting to our Site. Your continued
            use of our Services after any such changes shall signify your
            acceptance of the modified TOS.
          </span>
        }
      />
      <TitledStatement
        title="Governing Law and Dispute Resolution"
        statement={
          <span>
            These TOS are governed by and construed in accordance with the laws
            of [your jurisdiction].
            <br />
            Any disputes arising out of or related to these TOS or your use of
            our Site or Services shall be resolved through arbitration in
            accordance with [arbitration rules], held in [location].
          </span>
        }
      />
    </Box>
  );
};
