import { login } from "@/auth/auth";
import { redirect } from "react-router-dom";
import { toast } from "sonner";

import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password is required"),
});

export type LoginDataType = z.infer<typeof loginSchema>;

export default async function loginAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      values: data,
    };
  }

  try {
    console.log(result.data);
    await login(result.data.username, result.data.password);
    toast.success("Login successfully!");
    return redirect("/products");
  } catch (err) {
    return {
      errors: { form: (err as Error).message },
      values: data,
    };
  }
}
