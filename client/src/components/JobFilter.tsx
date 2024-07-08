import { Form, useSubmit } from "react-router-dom";
import SelectJobFilter from "./SelectJobFilter";
import { job_sort_by, job_status, job_type } from "@/lib/constant";
import JobSearchInput from "./JobSearchInput";

interface Props {
  search: string;
}

export default function JobFilter(props: Props) {
  const { search } = props;
  const submit = useSubmit();
  const debounce = (onChange: (arg0: any) => void) => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    return (e: { currentTarget: { form: any } }) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1000);
    };
  };
  return (
    <Form className="w-full flex pb-3 items-center gap-3">
      <JobSearchInput
        search={search}
        onChange={debounce((form) => {
          submit(form);
        })}
      />
      <SelectJobFilter
        name="jobStatus"
        onChange={debounce((form) => {
          submit(form);
        })}
        options={["All", ...Object.values(job_status)]}
        placeholder="Job status"
      />
      <SelectJobFilter
        name="jobType"
        onChange={debounce((form) => {
          submit(form);
        })}
        options={["All", ...Object.values(job_type)]}
        placeholder="Job type"
      />
      <SelectJobFilter
        name="sort"
        onChange={debounce((form) => {
          submit(form);
        })}
        options={["All", ...Object.values(job_sort_by)]}
        placeholder="Sort"
      />
    </Form>
  );
}
