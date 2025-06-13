/** --- pages/login/index.tsx --- */

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Form, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/hooks";
import { TypographyH1 } from "@/components/typography";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { token } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

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
      navigate(from, { replace: true });
    } catch (err) {
      setErrors({ form: (err as Error).message });
    } finally {
      setIsLoggingIn(false);
    }
  }

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
          {/* Row 1 for username */}
          <div className="space-y-3">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              className="rounded-sm"
              value={username}
              onChange={handleUsernameChange}
              aria-labelledby={errors?.username ? "username-error" : undefined}
              aria-invalid={Boolean(errors?.username)}
            />

            {errors?.username && (
              <span
                id="username-error"
                role="alert"
                className="text-sm text-red-500"
                aria-live="polite"
              >
                {errors?.username}
              </span>
            )}
          </div>

          {/* Row 2 for password */}
          <div className="space-y-3">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              className="rounded-sm"
              value={password}
              onChange={handlePasswordChange}
              aria-labelledby={errors?.password ? "password-error" : undefined}
              aria-hidden={Boolean(errors?.password)}
            />
            {errors?.password && (
              <span
                id="password-error"
                role="alert"
                className="text-sm text-red-500"
                aria-live="polite"
              >
                {errors?.password}
              </span>
            )}
          </div>

          {/* Row 3 for fake user */}
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
            <span
              role="alert"
              className="text-sm text-red-500"
              aria-live="polite"
            >
              {errors?.form}
            </span>
          )}

          {/* Row 4 for submit button */}
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full cursor-pointer rounded-sm"
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
