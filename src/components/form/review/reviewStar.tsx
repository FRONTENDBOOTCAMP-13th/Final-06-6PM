"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface ReviewStarProps {
  name?: string; // FormData에서 사용할 name
  defaultValue?: string; // 기본값
}

export default function ReviewStar({ name = "starRate", defaultValue = "5" }: ReviewStarProps) {
  const [starRate, setStarRate] = useState(parseInt(defaultValue));

  const handleStarClick = (grade: number) => {
    setStarRate(grade);
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <h2 className="font-semibold text-18">이번 여행은 어떠셨나요?</h2>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((grade) => (
          <button key={grade} type="button" onClick={() => handleStarClick(grade)} aria-label={`${grade}점`}>
            <Star
              className={`w-7 h-7 ${starRate >= grade ? "text-amber-300" : "text-travel-gray400"}`}
              fill="currentColor"
            />
          </button>
        ))}
      </div>

      {/* FormData로 전송할 숨겨진 input */}
      <input type="hidden" name={name} value={starRate} />
    </div>
  );
}
