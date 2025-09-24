import { cookies } from "next/headers";
import { z } from "zod";

const adminCredentials = {
  username: "TaskGo",
  password: "aka.300896"
};

export async function authenticate(username: string, password: string) {
  if (username === adminCredentials.username && password === adminCredentials.password) {
    return true;
  }
  return false;
}

export function requireAdmin() {
  const session = cookies().get("taskgo_session");
  if (!session) throw new Error("Unauthorized");
  return session;
}

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});