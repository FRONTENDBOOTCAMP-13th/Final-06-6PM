import CurrentPlace from "@/components/review/currentPlace";
import "../../../../styles/globals.css";
import BackButton from "@/components/feature/backButton";

export default function MenubarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="relative w-full px-4 py-5">
        <BackButton />
        <p className="text-center">기록하기</p>
      </div>
      <div className="relative w-full px-4 pb-25">
        <div>
          <h2 className="font-semibold text-28 text-travel-primary200">후기수정</h2>
          <CurrentPlace />
        </div>
        {children}
      </div>
    </div>
  );
}
