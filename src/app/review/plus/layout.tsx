import "../../../styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full min-h-screen p-4 pb-25">{children}</div>
  );
}
