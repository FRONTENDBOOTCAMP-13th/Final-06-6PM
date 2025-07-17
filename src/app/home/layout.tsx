import Navbar from "@/components/Navbar";
import "../../styles/globals.css";
import { Plane } from "lucide-react";
import Link from "next/link";
import ButtonRounded from "@/components/ui/btnRound";

export default function NavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="relative w-full pb-20">{children}</div>
      <Link
        href="/plan"
        className="fixed z-30 translate-x-full xs:translate-x-[112%] right-1/2 bottom-25 "
      >
        <ButtonRounded
          size="lg"
          variant="primary"
          className="flex items-center gap-1 shadow-sm shadow-travel-gray700"
        >
          <Plane className="text-white size-6" />
          <span>여행 일정만들기</span>
        </ButtonRounded>
      </Link>

      <Navbar />
    </div>
  );
}
