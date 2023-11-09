const { Box, Typography } = require("@mui/material")

const OrderedList = ({ number, text, component }) => {
    return (
      <Box className="pb-2">
        <Typography variant="caption" className="">
          <b className="mr-0.5">{number}.</b>
          {component || text}
        </Typography>
      </Box>
    );
}

export const CreateAccountHelp = () => {
    return noteData.split("----").map((each, i) => (
      <Box key={i} className="">
        <OrderedList number={i+1} text={each} />
      </Box>
    ));
}


const noteData = `Visit our Homepage: Go to www.corisio.com.----
Click "Sign Up": You'll typically find this option in the upper right-hand corner of the page. Click on it to begin the registration process.----
Choose Your Account Type: Corisio offers different account types, including "Buyer" and "Seller." Select the one that suits your needs.----
Fill in Your Information: You'll need to provide basic details like your name, email address, and a secure password. Make sure your password is strong and unique.----
Verify Your Email: After you've filled in your information, we'll send a verification email to the address you provided. Check your inbox and click the verification link to confirm your email.----
Complete Your Profile: Once you've verified your email, you can complete your profile. Add a profile picture, update your contact information, and include any additional details that will help other users get to know you better.----
Agree to Terms and Conditions: Review Corisio's Terms of Service and Privacy Policy. By creating an account, you agree to abide by these terms.----
Start Exploring: Congratulations, you now have a Corisio account! You can start exploring products, adding items to your cart, or setting up your online store if you're a seller.
`;

const proTips = `
Pro Tips:
Secure Your Account: Use a strong and unique password for your Corisio account. Don't share your login credentials with anyone, and be cautious of phishing attempts.----
Complete Your Profile: A complete profile helps build trust with other users. Consider adding a bio, your location, and any business information if you're a seller.----
Stay Informed: Keep an eye on your email for updates, promotions, and order notifications from Corisio. You can manage your email preferences in your account settings.----
If you encounter any issues during the registration process, please don't hesitate to contact our customer support team for assistance. We're here to help you get started on Corisio hassle-free!`;