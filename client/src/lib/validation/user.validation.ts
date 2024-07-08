import * as yup from "yup";

const UserValidation = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Email format is invalid")
    .required("Email is required"),
  location: yup.string().required("Location is required"),
  avatar: yup
    .mixed()
    .test("fileFormat", "Only jpg, jpeg, png files are allowed", (value) => {
      if (value instanceof File) {
        const supportedFormats = ["jpg", "jpeg", "png"];
        return supportedFormats.includes(
          value.name.split(".").pop()?.toLowerCase() ?? ""
        );
      }
      return true;
    })
    .test("fileSize", "File size must be less than 3MB", (value) => {
      if (value instanceof File) {
        return value.size <= 3145728;
      }
      return true;
    }),
});

export default UserValidation;
