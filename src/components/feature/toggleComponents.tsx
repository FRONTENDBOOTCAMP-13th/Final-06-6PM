"use client";

import { useState } from "react";
import { Star, Bookmark } from "lucide-react";

interface ToggleIconProps {
  type: "star" | "book";
}

export default function ToggleIcon({ type }: ToggleIconProps) {
  const [toggle, setIsToggle] = useState(false);

  const toggleClick = () => {
    setIsToggle(!toggle);
  };

  const Icon = type === "star" ? Star : Bookmark;

  return (
    <button onClick={toggleClick}>
      <Icon
        className={`size-7 ${
          toggle ? "text-amber-300" : "text-travel-gray400"
        }`}
        fill="currentColor"
      />
    </button>
  );
}
