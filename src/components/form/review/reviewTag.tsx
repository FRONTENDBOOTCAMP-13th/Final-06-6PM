"use client";
import { useState, useEffect } from "react";
import { Tags } from "lucide-react";
import TagItem from "@/components/feature/tagItem";
import { toast } from "react-toastify";

interface ReviewTagProps {
  name?: string; // FormData에서 사용할 name
  defaultValue?: string[]; // 초기 태그 배열
}

export default function ReviewTag({ name = "tags", defaultValue = [] }: ReviewTagProps) {
  const [tags, setTags] = useState<string[]>(defaultValue);
  const [tagValue, setTagValue] = useState("");

  // defaultValue가 변경되면 tags 상태 업데이트 (편집 모드용)
  useEffect(() => {
    setTags(defaultValue);
  }, [defaultValue]);

  const tagKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimTagValue = tagValue.trim();

      // 태그 갯수 제한
      if (tags.length >= 10) {
        toast.warning("태그는 최대 10개까지 입력할 수 있어요.");
        return;
      }

      // 중복 값 방지
      if (tags.includes(trimTagValue)) {
        toast.warning("이 태그는 이미 등록되어 있어요");
        return;
      }

      if (trimTagValue && !tags.includes(trimTagValue)) {
        const newTags = [...tags, trimTagValue];
        setTags(newTags);
        setTagValue("");
      }
    }
  };

  const removeTag = (target: string) => {
    const newTags = tags.filter((tag) => tag !== target);
    setTags(newTags);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <Tags className="size-5" />
        <h3 className="font-semibold text-18">태그</h3>
      </div>

      <input
        type="text"
        className="px-4 py-3 text-14 w-full rounded-lg border border-travel-gray400 bg-white text-travel-text100 placeholder-travel-gray500 focus:outline-travel-primary-light100 focus:bg-travel-gray100"
        placeholder="#태그로 감정과 분위기를 표현해보세요!(최대 10개)"
        value={tagValue}
        onChange={(e) => setTagValue(e.target.value)}
        onKeyDown={tagKeydown}
      />

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TagItem key={tag} closeIcon onRemove={() => removeTag(tag)} variant="outline">
            {tag}
          </TagItem>
        ))}
      </div>

      {/* FormData로 전송할 숨겨진 input */}
      <input type="hidden" name={name} value={JSON.stringify(tags)} />
    </div>
  );
}
