import { ActionFunction, ActionFunctionArgs, redirect } from "react-router-dom";
import customFetch from "../customFetch";
import { toast } from "@/components/ui/use-toast";
import { queryClient } from "@/App";
import { Response } from "../types/response";

export const loginAction: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await request.formData());
  try {
    const { data } = await customFetch.post<Response>("/auth/login", formData);
    queryClient.invalidateQueries();
    toast({ title: data.message });
    return redirect("/home");
  } catch (error: any) {
    toast({ title: error.response.data.message, variant: "destructive" });
    return null;
  }
};

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await request.formData());

  try {
    const { data } = await customFetch.post<Response>(
      "/auth/register",
      formData
    );
    toast({ title: data.message });
    queryClient.invalidateQueries();
    return redirect("/");
  } catch (error: any) {
    toast({ title: error.response.data.message, variant: "destructive" });
    return null;
  }
};

export const logoutAction = async () => {
  try {
    const { data } = await customFetch.get<Response>("/auth/logout");
    queryClient.invalidateQueries();
    toast({ title: data.message });
    return redirect("/");
  } catch (error: any) {
    toast({ title: error.response.data.message, variant: "destructive" });
    return null;
  }
};
