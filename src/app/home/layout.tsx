import Navbar from "@/components/Navbar";
import "../../styles/globals.css";
import LoginCheck from "@/components/home/loginCkeck";

export default function NavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="relative w-full pb-20">{children}</div>
      <LoginCheck />

      <Navbar />
    </div>
  );
}
