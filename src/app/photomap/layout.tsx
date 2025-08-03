import Navbar from "@/components/Navbar";
import "../../styles/globals.css";

export default function NavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="relative w-full py-5">
        <p className="text-center">지도생성</p>
      </div>
      <div className="relative w-full pb-25">
        <div className="px-4">
          <h2 className="font-semibold text-28 text-travel-primary200">나만의 여행지도</h2>
          <p className="text-16 text-travel-gray700">원하는 지역을 선택한 후 나만의 사진을 추가해보세요.</p>
        </div>
        {children}
      </div>
      <Navbar />
    </div>
  );
}
