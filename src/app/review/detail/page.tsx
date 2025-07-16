"use client";

import Input from "@/components/ui/input";
import SelectMenu3 from "@/components/ui/selectMenu3";
import TagItem from "@/components/ui/tagItem";
import Textarea from "@/components/ui/textarea";
import {
  CalendarDays,
  ChevronDown,
  ImagePlus,
  Plane,
  Star,
} from "lucide-react";
import { useState } from "react";

const dummyList = [
  {
    days: "1일차 (2025.07.12)",
    places: "해운대 해수욕장, 동백섬, 광안리 해수욕장",
  },
  {
    days: "2일차 (2025.07.13)",
    places: "태종대, 자갈치시장, 감천문화마을",
  },
  {
    days: "3일차 (2025.07.14)",
    places: "송도해수욕장, 부산타워, 용두산공원",
  },
];

const listData = (
  <>
    {dummyList.map((item, idx) => (
      <li
        key={idx}
        onClick={() => {}}
        className="space-y-1 px-4 py-2 hover:bg-travel-success100/20 cursor-default"
      >
        <p className="text-16 font-medium flex items-center gap-1">
          <CalendarDays />
          <span>{item.days}</span>
        </p>
        <p>방문 장소: {item.places}</p>
      </li>
    ))}
  </>
);

// 여행기록_세부사항선택하기
export default function ReviewDetailPage() {
  const [isStarToggled, setIsStarToggled] = useState(false);

  const handleStarClick = () => {
    setIsStarToggled(!isStarToggled);
  };

  const [selectOpen, setSelectOpen] = useState(false);
  const [selectList, setSelectList] = useState("일정을 선택하세요");

  return (
    <>
      <div className="mt-5 overflow-hidden bg-white shadow-xl rounded-2xl">
        <SelectMenu3 />

        <div className="grid grid-cols-1 gap-2 p-4">
          {/* 셀렉트박스 커스텀 */}
          <div className="text-travel-gray700 text-14 relative">
            <div
              onClick={() => setSelectOpen((prev) => !prev)}
              className="bg-white text-travel-text100 flex items-center justify-between py-2 px-4 border rounded-lg border-travel-gray400"
            >
              <p>{selectList}</p>
              <ChevronDown
                className={`duration-300 transition-transform ${
                  selectOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {selectOpen && (
              <ul className="border rounded-lg border-travel-gray400 bg-white absolute top-[42px] left-0 w-full shadow-xl">
                {listData}
              </ul>
            )}
          </div>

          {/* 이번 여행은 어떠셨나요 */}
          <div className="flex flex-col items-center gap-1">
            <h3 className="font-semibold text-18">이번 여행은 어떠셨나요?</h3>
            <div className="flex items-center gap-1">
              <button onClick={handleStarClick}>
                <Star
                  className={`w-7 h-7 ${
                    isStarToggled
                      ? "text-amber-300 fill-current"
                      : "text-travel-gray400 fill-current"
                  }`}
                />
              </button>{" "}
              <button onClick={handleStarClick}>
                <Star
                  className={`w-7 h-7 ${
                    isStarToggled
                      ? "text-amber-300 fill-current"
                      : "text-travel-gray400 fill-current"
                  }`}
                />
              </button>{" "}
              <button onClick={handleStarClick}>
                <Star
                  className={`w-7 h-7 ${
                    isStarToggled
                      ? "text-amber-300 fill-current"
                      : "text-travel-gray400 fill-current"
                  }`}
                />
              </button>{" "}
              <button onClick={handleStarClick}>
                <Star
                  className={`w-7 h-7 ${
                    isStarToggled
                      ? "text-amber-300 fill-current"
                      : "text-travel-gray400 fill-current"
                  }`}
                />
              </button>{" "}
              <button onClick={handleStarClick}>
                <Star
                  className={`w-7 h-7 ${
                    isStarToggled
                      ? "text-amber-300 fill-current"
                      : "text-travel-gray400 fill-current"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 제목 */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Plane />
              <h3 className="font-semibold text-18">제목</h3>
            </div>
            <Input size="sm" placeholder="제목을 입력해주세요" />
          </div>

          {/* 내용 */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Plane />
              <h3 className="font-semibold text-18">내용</h3>
            </div>
            <Textarea placeholder="내용을 입력해주세요" />
          </div>

          {/* 사진첨부 */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Plane />
              <h3 className="font-semibold text-18">사진첨부</h3>
            </div>
            <div className="p-4 bg-white border rounded-lg b text-travel-gray700 border-travel-gray400 w-fit">
              <ImagePlus />
            </div>
          </div>

          {/* 태그공간 */}
          <div className="flex items-center justify-between px-4 py-3 border rounded-lg border-travel-gray400 text-14">
            <p>
              <strong>#태그</strong>로 감정과 분위기를 표현해보세요!
            </p>
            <TagItem variant="fill">태그</TagItem>
          </div>
        </div>
      </div>
    </>
  );
}
