import * as yup from "yup"; //import all exports from the yup

export const userSchemaValidation = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Not valid email format")
      .required("Email is required"),
    phone: yup.string()
    .required('Phone number is required')
    .matches(
      /^[+]?[1-9]\d{1,14}$/,
      'Phone number must be valid (e.g., +1234567890 or 1234567890)'
    ),
    password: yup.string().min(4).max(20).required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required(),
  });
  