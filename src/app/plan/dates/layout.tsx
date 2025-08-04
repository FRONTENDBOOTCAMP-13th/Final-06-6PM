import "../../../styles/globals.css";
import BackButton from "@/components/feature/backButton";
import Link from "next/link";
import PlanDetailForm from "@/components/form/plan/planDetailForm";

export default function MenubarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full relative py-5 px-4">
        <BackButton path="/plan" />
        <p className="text-center">여행일정만들기</p>
      </div>
      <div className="relative w-full px-4 pb-25">
        <div>
          <h2 className="text-28 text-travel-primary200 font-semibold">여행 기간이 어떻게 되시나요?</h2>
        </div>
        {children}
      </div>

      <PlanDetailForm />
    </>
  );
}
