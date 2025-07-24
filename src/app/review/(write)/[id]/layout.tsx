import "../../../../styles/globals.css";
import { ChevronLeft } from "lucide-react";
import Button from "@/components/ui/btn";

export default function MenubarLayout({
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
        <p className="text-center">기록하기</p>
      </div>
      <div className="relative w-full px-4 pb-25">
        <div>
          <h2 className="font-semibold text-28 text-travel-primary200">
            후기작성
          </h2>
          <p className="text-16 text-travel-gray700">제주도</p>
        </div>
        {children}
      </div>
    </div>
  );
}
