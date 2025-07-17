import Navbar from "@/components/Navbar";
import "../../styles/globals.css";
import { ChevronLeft } from "lucide-react";

export default function NavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="relative w-full px-4 py-5">
        <button className="absolute -translate-y-1/2 cursor-pointer left-4 top-1/2">
          <ChevronLeft />
        </button>
        <p className="text-center">마이페이지</p>
      </div>
      <div className="relative w-full px-4 pb-25">{children}</div>
      <Navbar />
    </div>
  );
}
