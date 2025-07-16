import Navbar from "@/components/Navbar";
import "../../../styles/globals.css";

export default function NavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="w-full relative my-5 px-4">
        {/* <button className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer">
          <ChevronLeft />
        </button> */}
        <p className="text-center">기록하기</p>
      </div>
      <div className="relative w-full px-4 pb-25">
        <div>
          <h2 className="text-28 text-travel-primary200 font-semibold">
            여행일정
          </h2>
          <p className="text-16 text-travel-gray700">
            다녀온 여행지에 대한 기록을 남겨보세요.
          </p>
        </div>
        {children}
      </div>
      <Navbar />
    </div>
  );
}
