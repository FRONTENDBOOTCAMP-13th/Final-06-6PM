"use client";

import { MapPin, Eye, Heart, MessageCircleMore, Bookmark } from "lucide-react";
import Image from "next/image";

type Props = {
  userName: string;
  imgURL?: string;
  location: string;
  content: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  date: string;
};

export default function ViewItem({
  userName,
  imgURL = "/gwak.png",
  location,
  content,
  tags,
  views,
  likes,
  comments,
  date,
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
      <div className="space-y-2 my-4">
        <div className="grid grid-cols-2 gap-3">
          <Image
            width={200}
            height={200}
            src="/"
            alt="이미지"
            className=" bg-travel-gray200 rounded-lg object-cover aspect-square"
          />
          <Image
            width={200}
            height={200}
            src="/gwak.png"
            alt=""
            className=" bg-travel-gray200 rounded-lg object-cover aspect-square"
          />
        </div>
        <div className="text-14 text-travel-text200 line-clamp-3">
          {content}
        </div>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span key={tag} className="text-12 text-travel-info100">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center text-travel-gray600 text-12">
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircleMore className="w-4 h-4" />
            {comments}
          </span>
        </div>
        <span>{date}</span>
      </div>
    </div>
  );
}
