import JobFilter from "@/components/JobFilter";
import PaginationJob from "@/components/PaginationJob";
import TableJobs from "@/components/TableJobs";
import { jobsQuery } from "@/lib/loaders/job.loader";
import { Job } from "@/lib/types/job.type";
import { JobPagination, SearchValues } from "@/lib/types/response";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";

export default function AllJobs() {
  const { searchValues } = useLoaderData() as SearchValues;
  const { data } = useQuery<JobPagination<Job[]>>(jobsQuery(searchValues));
  return (
    <div className="p-4">
      <JobFilter search={searchValues.search} />
      <TableJobs jobs={data!.jobs} />
      <PaginationJob
        current_page={data!.current_page}
        total_pages={data!.total_pages}
        jobs={data!.jobs}
      />
    </div>
  );
}
