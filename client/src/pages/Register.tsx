import AuthForm from "@/components/AuthForm";
import AuthSubmit from "@/components/AuthSubmit";
import { RegisterFormData } from "@/lib/types/auth.type";
import { RegisterValidation } from "@/lib/validation/auth.validation";
import { useFormik } from "formik";
import { AtSign, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import { useNavigation, useSubmit } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { state } = useNavigation();
  const submit = useSubmit();
  const formik = useFormik<RegisterFormData>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterValidation,
    onSubmit: async (values) => {
      submit(values, { method: "POST" });
    },
  });
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center bg-white dark:bg-black/90">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
          <p className="mt-4">
            Access your account to view job applications, application status, and latest updates.
          </p>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          method="post"
          className="mx-auto mb-0 mt-8 max-w-lg space-y-4 text-black"
        >
          <AuthForm
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
            icon={<User className="size-5" />}
            onChange={formik.handleChange}
            value={formik.values.name}
            errorMessage={formik.touched.name && formik.errors.name}
          />
          <AuthForm
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            icon={<AtSign />}
            onChange={formik.handleChange}
            value={formik.values.email}
            errorMessage={formik.touched.email && formik.errors.email}
          />
          <AuthForm
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            icon={
              showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )
            }
            onChange={formik.handleChange}
            value={formik.values.password}
            onClick={() => setShowPassword(!showPassword)}
            errorMessage={formik.touched.password && formik.errors.password}
          />
          <AuthSubmit name="Register" isLoading={state === "submitting"} />
        </form>
      </div>
      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
