import { NextResponse } from "next/server";
import { credentialsMatch, SESSION_COOKIE, sessionToken } from "@/lib/admin-session";

export async function POST(request: Request) {
  const body = (await request.json()) as { user?: string; password?: string };
  const user = body.user?.trim() ?? "";
  const password = body.password ?? "";

  if (!credentialsMatch(user, password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = await sessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
