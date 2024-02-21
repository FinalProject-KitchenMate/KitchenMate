import Cookies from "js-cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function ServerProtectedComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("Authorization")?.value;

  const authorizationToken = Cookies.get("Authorization");
  if (!token) {
    redirect("/login");
  }
  return <>{children}</>;
}
