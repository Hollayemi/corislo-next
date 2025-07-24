import * as yup from "yup";

const validationStoreSchema = yup.object({
  businessName: yup.string().required('Business name is required'),
  businessEmail: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  businessRegNum: yup
    .string()
    .required('Business Registration Number is required is required'),
  businessType: yup.string().required('Business Type is required is required'),
  store: yup
    .string()
    .required('Store name is required')
    .min(5, 'Store must be at least 5 characters')
    .matches(
      /^[a-z0-9]+$/,
      'Store must NOT contain: uppercase letter, space or symbol'
    ),
  address: yup.string().required('Address is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  about_store: yup
    .string()
    .min(
      20,
      'Give a short detail about your store with at least 20 characters.'
    )
    .required('Give a short detail about your store'),
})

export default validationStoreSchema;
