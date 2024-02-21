import ServerProtectedComponent from "@/components/ServerProtectedComponent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ServerProtectedComponent>{children}</ServerProtectedComponent>
    </>
  );
}
