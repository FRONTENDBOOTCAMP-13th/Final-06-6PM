import "../../../styles/globals.css";
import { ChevronLeft } from "lucide-react";
import Button from "@/components/ui/btn";

export default function MenubarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="w-full relative my-5 px-4">
        <button className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer">
          <ChevronLeft />
        </button>
        <p className="text-center">기록하기</p>
      </div>
      <div className="relative w-full px-4 pb-25">
        <div>
          <h2 className="text-28 text-travel-primary200 font-semibold">
            후기작성
          </h2>
          <p className="text-16 text-travel-gray700">제주도</p>
        </div>
        {children}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4  max-h-21 z-20 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
        <Button className="w-full text-16">
          05.08. ~ 05.12. 일정 선택 완료
        </Button>
      </div>
    </div>
  );
}
