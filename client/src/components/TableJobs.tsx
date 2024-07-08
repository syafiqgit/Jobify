import {
  TableHeader,
  TableRow,
  Table,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { Job } from "@/lib/types/job.type";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Form, Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";

interface Props {
  jobs: Job[];
}

export default function TableJobs(props: Props) {
  const { jobs } = props;
  return (
    <Table className="border rounded-md shadow">
      <TableHeader>
        <TableRow>
          <TableHead>Company name</TableHead>
          <TableHead>Job position</TableHead>
          <TableHead>Job location</TableHead>
          <TableHead>Job type</TableHead>
          <TableHead>Job status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => {
          const jobDate = new Date(job.createdAt);
          return (
            <TableRow key={job._id}>
              <TableCell className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{job.company}</span>
              </TableCell>
              <TableCell>{job.position}</TableCell>
              <TableCell>{job.job_location}</TableCell>
              <TableCell>{job.job_type}</TableCell>
              <TableCell>{job.job_status}</TableCell>
              <TableCell>
                {jobDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link to={`/home/edit-job/${job._id}`}>
                    <Edit className="hover:text-gray-400 transition-all" />
                  </Link>
                  <Form method="delete" action={`/home/delete-job/${job._id}`}>
                    <button type="submit">
                      <Trash className="hover:text-gray-400 transition-all" />
                    </button>
                  </Form>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
