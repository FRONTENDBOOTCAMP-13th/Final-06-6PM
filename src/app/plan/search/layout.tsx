import "../../../styles/globals.css";
import Button from "@/components/ui/btn";
import RemoveTag from "@/components/ui/removeTag";
import BackButton from "@/components/feature/backButton";

export default function MenubarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const tourData = [
    { id: 1, name: "가나디" },
    { id: 2, name: "성산일출봉" },
    { id: 3, name: "한라산" }

  ];

  return (
    <div>
      <div className="w-full relative py-5 px-4">
        <BackButton />
        <p className="text-center">여행일정만들기</p>
      </div>
      <div className="relative w-full px-4 pb-25">
        <div>
          <h2 className="text-28 text-travel-primary200 font-semibold">
            제주도
          </h2>
          <p className="text-16 text-travel-gray700">
            여행 일정: 2025.05.08. ~ 2025.05.12.
          </p>
        </div>
        {children}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4  min-h-23 z-20 bg-white shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
        <div className="flex gap-2 pb-2">
          <RemoveTag tagData={tourData} />
        </div>
        <Button className="w-full text-16">
          05.08. ~ 05.12. 일정 선택 완료
        </Button>
        
      </div>
    </div>
  );
}
