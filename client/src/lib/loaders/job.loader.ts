import { queryClient } from "@/App";
import customFetch from "../customFetch";
import { toast } from "@/components/ui/use-toast";
import { JobPagination, Params, Response } from "../types/response";
import { Job } from "../types/job.type";

export const jobsQuery = (params: Params) => {
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get<Response<JobPagination<Job[]>>>(
        "/job",
        {
          params,
        }
      );
      return data.data;
    },
  };
};

export const singleJobQuery = (id: string | undefined) => {
  return {
    queryKey: ["jobs", id],
    queryFn: async () => {
      const { data } = await customFetch.get<Response<Job>>(`/job/${id}`);
      return data.data;
    },
  };
};

export const jobsLoader = async ({ request }: { request: Request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    await queryClient.ensureQueryData(jobsQuery(params));
    return { searchValues: { ...params } };
  } catch (error: any) {
    toast({ title: "Login first", variant: "destructive" });
    return null;
  }
};

export const getJobById = async ({ params }: { params: { id?: string } }) => {
  try {
    await queryClient.ensureQueryData(singleJobQuery(params.id));
    return params.id;
  } catch (error: any) {
    toast({ title: error.response.data.message, variant: "destructive" });
    return null;
  }
};
