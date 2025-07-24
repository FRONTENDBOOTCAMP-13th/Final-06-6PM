"use client";

import { useState } from "react";
import { Tags } from "lucide-react";
import TagItem from "@/components/feature/tagItem";
import { toast } from "react-toastify";

export default function ReviewTag() {
  const [tagValue, setTagValue] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);

  const tagKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimTagValue = tagValue.trim();

      // 태그 갯수 제한
      if (tagList.length >= 10) {
        toast.warning("태그는 최대 10개까지 입력할 수 있어요.");
        return;
      }

      // 중복 값 방지
      if (tagList.includes(trimTagValue)) {
        toast.warning("이 태그는 이미 등록되어 있어요");
      }
      if (trimTagValue && !tagList.includes(trimTagValue)) {
        setTagList([...tagList, trimTagValue]);
        setTagValue("");
      }
    }
  };

  const removeTag = (target: string) => {
    setTagList(tagList.filter((tag) => tag !== target));
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <Tags className="size-5" />
        <h3 className="font-semibold text-18">태그</h3>
      </div>
      <input
        type="text"
        className="px-4 py-3 text-14 w-full rounded-lg border border-travel-gray400 bg-white text-travel-text100 placeholder-travel-gray500 ${inputSize[size]} ${className} focus:outline-travel-primary-light100 focus:bg-travel-gray100"
        placeholder="#태그로 감정과 분위기를 표현해보세요!(최대 10개)"
        value={tagValue}
        onChange={(e) => setTagValue(e.target.value)}
        onKeyDown={tagKeydown}
      />
      <div className="flex flex-wrap gap-2 ">
        {tagList.map((tag) => (
          <TagItem
            key={tag}
            closeIcon
            onRemove={() => removeTag(tag)}
            variant="outline"
          >
            {tag}
          </TagItem>
        ))}
      </div>
    </div>
  );
}
