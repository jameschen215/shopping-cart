import type { UserType } from "@/lib/types";

// --- login ---
export async function login(username: string, password: string) {
  const resp = await fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (!resp.ok) throw new Error("Invalid username or password.");

  const { token }: { token: string } = await resp.json();
  const user = await getCurrentUser(username);

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return { token, user };
}

// --- logout ---
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// --- get stored token
export function getStoredToken(): string | null {
  return localStorage.getItem("token");
}

// --- get stored user
export function getStoredUser(): UserType | null {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

// --- get current user ---
export async function getCurrentUser(username: string) {
  const resp = await fetch("https://fakestoreapi.com/users");

  if (!resp.ok) throw new Error("Failed to fetch users");

  const users: UserType[] = await resp.json();
  const user = users.find((u) => u.username === username);

  if (!user) throw new Error("User not found");

  return user;
}
