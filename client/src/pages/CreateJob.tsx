import InputForm from "@/components/InputForm";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { job_status, job_type } from "@/lib/constant";
import JobValidation from "@/lib/validation/job.validation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormik } from "formik";
import { Form, useNavigation, useSubmit } from "react-router-dom";

export default function CreateJob() {
  const submit = useSubmit();
  const { state } = useNavigation()
  const formik = useFormik({
    initialValues: {
      company: "",
      position: "",
      job_type: "Fulltime",
      job_location: "",
      job_status: "Pending",
    },
    validationSchema: JobValidation,
    onSubmit: async (values) => {
      submit(values, { method: "POST" });
    },
  });
  return (
    <div className="p-4">
      <Form onSubmit={formik.handleSubmit} method="post">
        <InputForm
          label="Company name"
          name="company"
          type="text"
          value={formik.values.company}
          onChange={formik.handleChange}
          placeholder="Enter company name"
          errorMessage={formik.touched.company && formik.errors.company}
        />

        <InputForm
          label="Job position"
          name="position"
          type="text"
          value={formik.values.position}
          onChange={formik.handleChange}
          placeholder="Enter job position"
          errorMessage={formik.touched.position && formik.errors.position}
        />

        <InputForm
          label="Job location"
          name="job_location"
          type="text"
          value={formik.values.job_location}
          onChange={formik.handleChange}
          placeholder="Enter job location"
          errorMessage={
            formik.touched.job_location && formik.errors.job_location
          }
        />
        <SelectInput
          label="Job type"
          name="job_type"
          defaultValue="Fulltime"
          options={Object.values(job_type)}
          onChange={formik.handleChange}
          value={formik.values.job_type}
        />

        <SelectInput
          label="Job status"
          name="job_status"
          defaultValue="Pending"
          options={Object.values(job_status)}
          onChange={formik.handleChange}
          value={formik.values.job_status}
        />
        <Button
          disabled={state === "submitting"}
          className="w-full"
          variant={"outline"}
          type="submit"
        >
          {state === "submitting" ? (<ReloadIcon className="animate-spin" />) : "Submit"}
        </Button>
      </Form>
    </div>
  );
}
