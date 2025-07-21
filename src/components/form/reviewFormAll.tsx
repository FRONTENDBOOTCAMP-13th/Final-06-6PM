"use client";

import ReviewStar from "@/components/form/reviewStar";
import ReviewTitle from "@/components/form/reviewTitle";
import ReviewContent from "@/components/form/reviewContent";
import ReviewImg from "@/components/form/reviewImg";
import ReviewTag from "@/components/form/reviewTag";
import ReviewSelect from "@/components/form/reviewSelect";
import Button from "@/components/ui/btn";

export default function ReviewFormAll() {
  const formSubmit = () => {
    console.log("폼 제출");
  };

  return (
    <form action={formSubmit} className="grid grid-cols-1 gap-2 p-4">
      <ReviewStar />
      <ReviewTitle />
      <ReviewContent />
      <ReviewImg />
      <ReviewTag />{" "}
      <div className="bg-travel-bg100 fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4  max-h-21 z-20 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
        <Button className="w-full text-16" type="submit">
          05.08. ~ 05.12. 일정 선택 완료
        </Button>
      </div>
    </form>
  );
}
