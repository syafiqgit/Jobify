import { queryClient } from "@/App";
import customFetch from "../customFetch";
import { Response } from "../types/response";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "react-router-dom";
import { AdminStats } from "../types/stats.type";

export const adminQuery = {
  queryKey: ["admin"],
  queryFn: async () => {
    const { data } = await customFetch.get<Response<AdminStats>>(
      "/admin/stats"
    );
    return data.data;
  },
};

export const adminLoader = async () => {
  try {
    return await queryClient.ensureQueryData(adminQuery);
  } catch (error: any) {
    toast({ title: error.response.data.message, variant: "destructive" });
    return redirect("/");
  }
};
