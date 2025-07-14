"use client";

import ButtonRounded from "@/components/ui/btnRound";
import { MapPin, X, Star, Bookmark } from "lucide-react";
import Image from "next/image";

type Props = {
  userName: string;
  imgURL?: string;
  location: string;
  content: string;
  tags: string[];
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ViewItem2({
  userName,
  imgURL = "/gwak.png",
  location,
  content,
  tags,
  onEdit,
  onDelete,
}: Props) {
  const openModal = () => {
    console.log("모달창");
  };

  return (
    <div className="relative rounded-xl bg-white shadow p-4 w-full max-w-xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Image
            width={40}
            height={40}
            src={imgURL}
            alt={userName}
            className="w-10 h-10 rounded-full bg-travel-gray300"
          />
          <div>
            <p className="font-medium text-16 text-travel-gray700">
              {userName}
            </p>
            <button
              className="flex items-center text-12 text-travel-info100 cursor-pointer"
              onClick={() => openModal()}
            >
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </button>
          </div>
        </div>
        <Bookmark className="w-6 h-6 text-travel-gray400" />
      </div>
      <div className="flex items-center my-2 gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 text-travel-warn100"
            fill="currentColor"
          />
        ))}
      </div>

      <div className="flex gap-3 mb-2">
        <div className="flex-1 h-28 bg-travel-gray200 rounded-lg" />
        <div className="flex-1 h-28 bg-travel-gray200 rounded-lg" />
      </div>
      <div className="text-14 text-travel-text200 mb-2 line-clamp-3">
        {content}
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {tags.map((tag) => (
          <span key={tag} className="text-12 text-travel-info100">
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex gap-1 justify-end">
        <ButtonRounded
          className="text-12 px-3 py-1 rounded-full border bg-travel-bg100 text-travel-gray700"
          onClick={onEdit}
          type="button"
          size="sm"
          variant="outline"
        >
          수정
        </ButtonRounded>
        <ButtonRounded
          className="text-12 px-3 py-1 rounded-full border bg-travel-bg100 text-travel-gray700"
          onClick={onDelete}
          type="button"
          size="sm"
          variant="outline"
        >
          삭제
        </ButtonRounded>
      </div>
    </div>
  );
}
