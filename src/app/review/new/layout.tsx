import Navbar from "@/components/Navbar";
import "../../../styles/globals.css";

export default function NavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen p-4 pb-25">
      {children}
      <Navbar />
    </div>
  );
}
