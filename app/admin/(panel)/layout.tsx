import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { SESSION_COOKIE, sessionToken } from "@/lib/admin-session";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const expected = await sessionToken();
  if (!expected || token !== expected) redirect("/admin/login");
  return <AdminShell>{children}</AdminShell>;
}
