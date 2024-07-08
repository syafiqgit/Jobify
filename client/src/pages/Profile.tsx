import InputForm from "@/components/InputForm";
import PreviewAvatar from "@/components/PreviewAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types/user.type";
import UserValidation from "@/lib/validation/user.validation";
import { useFormik } from "formik";
import {
  ActionFunctionArgs,
  Form,
  useOutletContext,
} from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { updateProfile } from "@/lib/actions/user.action";
import { useState } from "react";

export default function Profile() {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const user = useOutletContext<User>();
  const formik = useFormik<User>({
    initialValues: {
      avatar: user.avatar,
      email: user.email,
      name: user.name,
      location: user.location,
    },
    validationSchema: UserValidation,
    onSubmit: async ({ avatar, email, location, name }) => {
      try {
        setIsloading(true);
        const formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("email", email);
        formData.append("location", location);
        formData.append("name", name);
        await updateProfile(
          formData as unknown as ActionFunctionArgs<FormData>
        );
      } catch (error: any) {
        throw new Error(error);
      } finally {
        setIsloading(false);
      }
    },
  });
  return (
    <div className="flex flex-col justify-center items-center p-5">
      {formik.values.avatar ? (
        <PreviewAvatar file={formik.values.avatar} avatar={user.avatar} />
      ) : (
        <Avatar className="size-32 mb-4">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <p className="text-center pb-4">{user.name}</p>
      <Form
        className="flex flex-col w-full gap-2"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <InputForm
          label="Avatar"
          placeholder="Enter your fullname"
          name="avatar"
          onChange={(e) => formik.setFieldValue("avatar", e.target.files[0])}
          type="file"
          accept="image/*"
          errorMessage={formik.errors.avatar}
        />
        <InputForm
          label="Name"
          placeholder="Enter your fullname"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          type="text"
          errorMessage={formik.errors.name}
        />
        <InputForm
          label="Email"
          placeholder="Enter your email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          type="text"
          errorMessage={formik.errors.email}
        />
        <InputForm
          label="Address"
          placeholder="Enter your address"
          name="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          type="text"
          errorMessage={formik.errors.location}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <ReloadIcon className="animate-spin" /> : "Update"}
        </Button>
      </Form>
    </div>
  );
}
