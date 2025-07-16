import DropdownItem from "@/components/ui/dropdownItem";
import Input from "@/components/ui/input";

import ReviewWrite from "@/components/ui/reviewItem";
import ScheduleRegister from "@/components/ui/scheduleRegister";
import SelectMenu3 from "@/components/ui/selectMenu3";
import ViewItem from "@/components/ui/viewItem";

// 마이페이지/리뷰
export default function MypageReviewPage() {
  return (
    <>
      <h2>마이페이지/리뷰</h2>

      <div className="flex items-center gap-2 m-4">
        <DropdownItem label="제주도 여행" />
      </div>
      <div className=" m-2 bg-white text-center">
        <div>
          <SelectMenu3 />
        </div>
        <div className="m-2">
          <ReviewWrite />
        </div>
      </div>
    </>
  );
}
