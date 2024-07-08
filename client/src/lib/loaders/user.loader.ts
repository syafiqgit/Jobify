import { queryClient } from "@/App";
import customFetch from "../customFetch";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "react-router-dom";
import { User } from "../types/user.type";
import { Response } from "../types/response";

export const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get<Response<User>>(
      "/user"
    );
    return data.data;
  },
};

export const userLoader = async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error: any) {
    toast({ title: error.response.data.message, variant: "destructive" });
    return redirect("/");
  }
};
