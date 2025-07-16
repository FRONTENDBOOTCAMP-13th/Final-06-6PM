"use client";

import Input from "@/components/ui/input";
import SelectMenu3 from "@/components/ui/selectMenu3";
import TagItem from "@/components/ui/tagItem";
import Textarea from "@/components/ui/textarea";
import { ImagePlus, Plane, Star } from "lucide-react";
import { useState } from "react";

// 여행기록_세부사항선택하기
export default function ReviewDetailPage() {
  const [isStarToggled, setIsStarToggled] = useState(false);

  const handleStarClick = () => {
    setIsStarToggled(!isStarToggled);
  };

  return (
    <>
      <div className="mt-5 overflow-hidden bg-white shadow-xl rounded-2xl">
        <SelectMenu3 />

        <div className="grid grid-cols-1 gap-2 p-4">
          {/* 셀렉트박스 :: 커스텀 드롭다운 필요*/}
          <label htmlFor="daily-review" className="sr-only">
            일자별목록선택
          </label>
          <select
            name="daily-review"
            id="daily-review"
            className="border border-travel-gray400 py-2 px-2 rounded-lg"
          >
            <option value="">1일차 (2025.07.12)</option>
            <option value="">2일차 (2025.07.12)</option>
            <option value="">3일차 (2025.07.12)</option>
            <option value="">4일차 (2025.07.12)</option>
          </select>

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
