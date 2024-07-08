import customFetch from "../customFetch";
import { queryClient } from "@/App";
import { toast } from "@/components/ui/use-toast";
import { Response } from "../types/response";
import { ActionFunction, ActionFunctionArgs } from "react-router-dom";

export const updateProfile: ActionFunction = async (
  formData: ActionFunctionArgs<FormData>
) => {
  try {
    const { data } = await customFetch.patch<Response>("/user", formData);
    queryClient.invalidateQueries({ queryKey: ["user"] });
    toast({ title: data.message });
    return null;
  } catch (error: any) {
    toast({ title: error.response.data.message });
    return null;
  }
};
