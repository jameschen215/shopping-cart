/** --- pages/login/index.tsx --- */

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Form, useNavigate, useNavigation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/hooks";
import { TypographyH1 } from "@/components/typography";
import LoadingPage from "@/components/loading-page";

const testUser = {
  username: "mor_2314",
  password: "83r5^_",
};

const loginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password is required"),
});

export type LoginDataType = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/products", { replace: true });
    }
  }, [token, navigate]);

  function handleUsernameChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setUsername(ev.target.value);
  }

  function handlePasswordChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setPassword(ev.target.value);
  }

  function handleCheckboxChange(ev: React.ChangeEvent<HTMLInputElement>) {
    if (ev.target.checked) {
      setUsername(testUser.username);
      setPassword(testUser.password);
    } else {
      setUsername("");
      setPassword("");
    }
  }

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    setIsLoggingIn(true);

    try {
      const result = loginSchema.safeParse({ username, password });

      if (!result.success) {
        const flat = result.error.flatten().fieldErrors;

        setErrors({
          username: flat.username?.[0] || "",
          password: flat.password?.[0] || "",
        });

        return;
      }

      await login(username, password);
      toast.success("Login successfully!");
      navigate("/products");
      // redirect("/products");
    } catch (err) {
      setErrors({ form: (err as Error).message });
    } finally {
      setIsLoggingIn(false);
    }
  }

  if (navigation.state === "loading") return <LoadingPage />;

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <div className="dark:bg-foreground/5 w-full max-w-100 rounded-md bg-white px-4 py-8 shadow-2xl">
        <div className="flex w-full flex-col items-center gap-2">
          <TypographyH1 className="text-2xl md:text-3xl lg:text-3xl">
            Sign in
          </TypographyH1>
        </div>

        <Form
          className="flex w-full flex-col gap-6 p-8"
          onSubmit={handleSubmit}
        >
          <div className="space-y-3">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              className="rounded-sm"
              value={username}
              onChange={handleUsernameChange}
            />

            {/* describedby */}
            {errors?.username && (
              <span className="text-sm text-red-500" aria-live="polite">
                {errors?.username}
              </span>
            )}
          </div>
          <div className="space-y-3">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              className="rounded-sm"
              value={password}
              onChange={handlePasswordChange}
            />
            {errors?.password && (
              <span className="text-sm text-red-500" aria-live="polite">
                {errors?.password}
              </span>
            )}
          </div>
          <div className="flex items-center justify-start gap-2">
            <Input
              type="checkbox"
              id="auto-login"
              className="size-4"
              onChange={handleCheckboxChange}
            />
            <Label htmlFor="auto-login">
              Login as <span className="italic">David Morrison</span>
            </Label>
          </div>
          {errors?.form && (
            <span className="text-sm text-red-500" aria-live="polite">
              {errors?.form}
            </span>
          )}
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full cursor-pointer rounded-sm bg-blue-500 hover:bg-blue-600"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Signing in ..." : "Sign in"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
