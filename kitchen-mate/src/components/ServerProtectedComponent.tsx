import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export default function ServerProtectedComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const authorizationToken = Cookies.get("Authorization");
  if (!authorizationToken) {
    redirect("/login");
  }
  return <>{children}</>;
}
