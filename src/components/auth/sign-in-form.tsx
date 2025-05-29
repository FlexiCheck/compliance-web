"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthForm } from "./auth-form";

const formSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
});

type FormValues = z.infer<typeof formSchema>;

export const SignInForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  const onSubmit = (values: FormValues) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return <AuthForm form={form} onSubmit={onSubmit} />;
};
