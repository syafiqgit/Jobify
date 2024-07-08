import { ActionFunctionArgs, redirect } from "react-router-dom";
import customFetch from "../customFetch";
import { queryClient } from "@/App";
import { toast } from "@/components/ui/use-toast";
import { Response } from "../types/response";

interface Params {
  request: Request;
  params: {
    id?: string | unknown;
  };
}

export const createJobAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  try {
    const { data } = await customFetch.post<Response>("/job", values);
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
    toast({ title: data.message });
    return redirect("/home");
  } catch (error: any) {
    toast({ title: error.data.message });
    return null;
  }
};

export const editJobAction = async ({ request, params }: Params) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  try {
    const { data } = await customFetch.patch<Response>(`job/${params.id}`, values);
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
    toast({ title: data.message });
    return redirect("/home");
  } catch (error: any) {
    toast({ title: error.data.message });
    return null;
  }
};

export const deleteJobAction = async ({
  params,
}: {
  params: { id?: string | unknown };
}) => {
  try {
    const { data } = await customFetch.delete<Response>(`job/${params.id}`);
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
    toast({ title: data.message });
    return redirect("/home");
  } catch (error: any) {
    toast({ title: error.data.message });
    return null;
  }
};
