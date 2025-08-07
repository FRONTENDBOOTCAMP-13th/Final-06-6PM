import "../../styles/globals.css";
export default function FooterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="relative w-full px-4 pb-25 h-dvh">{children}</div>;
}
