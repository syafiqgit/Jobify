import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Email format is invalid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const RegisterValidation = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Email format is invalid")
    .required("Email is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Pasword must be 8 or more characters")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])\w+/,
      "Password ahould contain at least one uppercase and lowercase character"
    )
    .matches(/\d/, "Password should contain at least one number")
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
      "Password should contain at least one special character"
    ),
});
