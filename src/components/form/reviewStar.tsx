"use client";

import { Star } from "lucide-react";

interface ReviewStarProps {
  starRate: number;
  setStarRate: (starRate: number) => void;
}

export default function ReviewStar({ starRate, setStarRate }: ReviewStarProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <h3 className="font-semibold text-18">이번 여행은 어떠셨나요?</h3>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((grade) => (
          <button key={grade} type="button" onClick={() => setStarRate(grade)}>
            <Star
              className={`w-7 h-7 ${
                starRate >= grade ? "text-amber-300" : "text-travel-gray400"
              }`}
              fill="currentColor"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
