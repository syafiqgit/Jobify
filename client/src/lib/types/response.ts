import { Job } from "./job.type";

export type Response<T = any> = {
  message: string;
  data: T;
};

export type JobPagination<T = Job> = {
  total_jobs: number;
  jobs: T;
  current_page: number;
  total_pages: number;
};

export interface Params {
  [x: string]: string;
  search?: any;
  jobStatus?: any;
  jobType?: any;
  sort?: any;
  page?: any;
}

export interface SearchValues {
  searchValues: {
    jobStatus: string;
    search: string;
  };
}
