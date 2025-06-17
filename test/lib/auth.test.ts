import { login, logout } from "@/lib/auth";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("auth module", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  it("should store token and user locally after login", async () => {
    const fetchMock = vi
      .fn()
      .mockReturnValueOnce({
        ok: true,
        json: async () => ({ token: "fake-token" }),
      })
      .mockReturnValueOnce({
        ok: true,
        json: async () => [
          { username: "james", id: 1, name: "James", email: "j@example.com" },
        ],
      });

    vi.stubGlobal("fetch", fetchMock);

    const { token, user } = await login("james", "password");

    expect(token).toBe("fake-token");
    expect(user.username).toBe("james");
    expect(localStorage.getItem("token")).toBe("fake-token");
    expect(JSON.parse(localStorage.getItem("user")!)).toMatchObject({
      username: "james",
    });
  });

  it("should removes token and user after logout", () => {
    localStorage.setItem("token", "abc");
    localStorage.setItem("user", "{}");

    logout();

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
  });
});
