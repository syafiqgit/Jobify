import * as yup from "yup";

const JobValidation = yup.object({
  company: yup.string().required("Company name is required"),
  position: yup.string().required("Job position name is required"),
  job_location: yup.string().required("Job location name is required"),
});

export default JobValidation;
