"use client";
import { useState } from "react";
import { Star, Bookmark } from "lucide-react";

export default function ToggledComponents() {
  const [isStarToggled, setIsStarToggled] = useState(false);
  const [isBookmarkToggled, setIsBookmarkToggled] = useState(false);

  function handleStarClick() {
    setIsStarToggled(!isStarToggled);
  }

  function handleBookmarkClick() {
    setIsBookmarkToggled(!isBookmarkToggled);
  }

  return (
    <>
      <button onClick={handleStarClick}>
        <Star
          className={`w-7 h-7 ${
            isStarToggled
              ? "text-amber-300 fill-current"
              : "text-travel-gray400 fill-current"
          }`}
        />
      </button>
      <button onClick={handleBookmarkClick}>
        <Bookmark
          className={`w-7 h-7 ${
            isBookmarkToggled
              ? "text-amber-300 fill-current"
              : "text-travel-gray400 fill-current"
          }`}
        />
      </button>
    </>
  );
}
