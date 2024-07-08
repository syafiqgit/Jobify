import { queryClient } from "@/App";
import customFetch from "../customFetch";
import { Response } from "../types/response";
import { toast } from "@/components/ui/use-toast";
import { Stats } from "../types/stats.type";

export const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const { data } = await customFetch.get<Response<Stats>>("/job/stats");
    return data.data;
  },
};

export const statsLoader = async () => {
  try {
    return await queryClient.ensureQueryData(statsQuery);
  } catch (error) {
    toast({ title: "Login first", variant: "destructive" });
    return null;
  }
};
