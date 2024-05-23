import * as yup from "yup";

const validationRegisterSchema = yup.object({
  fullname: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup
    .string()
    .matches(
      /^[A-Za-z0-9]+$/,
      "Username must contain only alphabets and numbers"
    ).min(5, "Minimum of 5 characters")
    .required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      "Password must have an uppercase letter and a unique symbol"
    ),
  state: yup.string().required("State is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
});

export default validationRegisterSchema;
