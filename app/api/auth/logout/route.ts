import { signOut } from "@/lib/auth";

export async function GET() {
  await signOut({ redirect: false });
  return Response.redirect(new URL("/login", process.env.AUTH_URL || "http://localhost:3000"));
}
