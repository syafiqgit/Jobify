import { ReactNode } from "react";

export type StatusApplications = {
  pending: string,
  interview_hr: string,
  interview_user: string,
  technical_test: string,
  recieve_job_offer_letter: string,
  accept_job_offer_letter: string,
  rejected_offer_letter: string,
  rejected_interview_hr: string,
  rejected_technical_test: string,
  declined: string,
};

export type MonthlyApplications = {
  date: string;
  count: number;
};

export interface Stats {
  status_applications: StatusApplications;
  monthly_applications: MonthlyApplications[];
}

export interface AdminStats {
  users: number;
  jobs: number;
  monthly_applications_users: MonthlyApplications[];
  monthly_applications_jobs: MonthlyApplications[];
}

export type StatsCardType = {
  title: string;
  count: number;
  icon: ReactNode;
};
