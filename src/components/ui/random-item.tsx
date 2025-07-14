import React from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";

interface RandomItemProps {
  image: string;
  title: string;
  location: string;
  desc: string;
}

export default function RandomItem({
  image,
  title,
  location,
  desc,
}: RandomItemProps) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg w-full flex items-end h-[180px]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        draggable={false}
      />

      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-white p-5 w-full">
        <div className="font-bold text-16 mb-1">{title}</div>
        <div className="flex items-center text-12 mb-1">
          <MapPin className="w-4 h-4 mr-1 text-white" />
          {location}
        </div>
        <div className="text-12 line-clamp-2 mb-3">{desc}</div>
        <button className="bg-travel-bg100 text-travel-text200 text-12 px-3 py-1 rounded transition cursor-pointer">
          더 알아보기
        </button>
      </div>
    </div>
  );
}
