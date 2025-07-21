import "../../../styles/globals.css";
import Navbar from "@/components/Navbar";
import ButtonRounded from "@/components/ui/btnRound";
import BackButton from "@/components/feature/backButton";

export default function MenubarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="w-full relative py-5 px-4">
        <BackButton />
        <p className="text-center">여행 일정 살펴보기</p>
      </div>
      <div className="relative w-full px-4 pb-25">
        <div>
          <div className="flex justify-between">
            <h2 className="text-28 text-travel-primary200 font-semibold">
              제주도
            </h2>
            <ButtonRounded variant="outline" size="sm" className="">편집</ButtonRounded>
          </div>
          <p className="text-16 text-travel-gray700">
            여행 일정 : 2025.05.08 ~ 2025.05.12.
          </p>
        </div>
        {children}
      </div>
      <Navbar />
    </div>
  );
}
