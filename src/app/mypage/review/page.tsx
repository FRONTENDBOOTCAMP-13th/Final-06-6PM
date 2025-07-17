import Input from "@/components/ui/input";
import SelectMenu3 from "@/components/ui/selectMenu3";
import ViewItem from "@/components/ui/viewItem";
import { ChevronDown } from "lucide-react";

// 마이페이지/리뷰
export default function MypageReviewPage() {
  return (
    <>
      <h2>마이페이지/리뷰</h2>

      <div className="relative mb-2">
        <label htmlFor="daily-review"></label>
        <select
          name="daily-review"
          id="daily-review"
          className="w-full border border-travel-gray400 py-3 px-4 rounded-lg 
            bg-white text-travel-text100 text-14
               focus:outline-none focus:border-travel-primary100 focus:ring-2 focus:ring-travel-primary100
               hover:border-travel-primary100
               appearance-none cursor-pointer"
        >
          <option value="날짜선택" className="text-travel-gray500">
            날짜를 선택하세요
          </option>
          <option value="day1" className="py-2">
            1일차 (2025.07.12)
          </option>
          <option value="day2" className="py-2">
            2일차 (2025.07.13)
          </option>
          <option value="day3" className="py-2">
            3일차 (2025.07.14)
          </option>
          <option value="day4" className="py-2">
            4일차 (2025.07.15)
          </option>
        </select>

        <div className="absolute top-4 right-0 flex items-center px-3 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-travel-gray600" />
        </div>
      </div>
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className=" bg-white text-center rounded-2xl overflow-hidden">
          <SelectMenu3 />
        </div>
        <div className="m-4 grid grid-cols-1 gap-2 shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded-2xl">
          <ViewItem
            userName={"닉네임"}
            userImgURL={"/gwak.png"}
            location={"제주도"}
            content={
              "내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다 내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다 "
            }
            tags={["맛집", "#좋아요", "몰라"]}
            views={200}
            likes={100}
            comments={100}
            date={"2025-07-15"}
          />
        </div>
      </div>
    </>
  );
}
