import Navbar from "@/components/Navbar";
import "../../styles/globals.css";

export default function NavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="relative w-full pb-25">{children}</div>
      <Navbar />
    </div>
  );
}
