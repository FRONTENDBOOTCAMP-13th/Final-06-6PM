import { ChevronLeft } from "lucide-react";
import "../../../styles/globals.css";

export default function NavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative w-full px-4 my-5">
        <button className="absolute -translate-y-1/2 cursor-pointer left-4 top-1/2">
          <ChevronLeft />
        </button>
        <p className="text-center">지도 생성</p>
      </div>
      <div className="relative w-full px-4 pb-25">
        <div>
          <h2 className="font-semibold text-28 text-travel-primary200">
            선택한 지역
          </h2>
          <p className="text-16 text-travel-gray700">
            원하는 지역을 선택한 후 나만의 사진을 추가해보세요.
          </p>
        </div>
        {children}
      </div>
    </>
  );
}
