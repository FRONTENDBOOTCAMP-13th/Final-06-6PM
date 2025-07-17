import React from "react";
import { MapPin, Plane } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Btn";
import Link from "next/link";

interface RandomItemProps {
  image: string;
  title: string;
  location: string;
  desc: string;
  onMoreClick?: () => void;
}

export default function RandomItem({
  image,
  title,
  location,
  desc,
  onMoreClick,
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
      <div className="absolute left-0 top-0 inset-0 bg-black/40" />
      <div className="relative z-10 p-5 w-full">
        <div className="text-white space-y-1 mb-3">
          <div className="font-bold text-20">{title}</div>
          <div className="flex items-center gap-1 text-14">
            <MapPin className="w-4 h-4 text-white" />
            {location}
          </div>
          <div className="text-14 line-clamp-2">{desc}</div>
        </div>
        <div className="flex justify-between items-center mt-2 gap-2">
          <Button variant="outline" size="sm" onClick={onMoreClick}>
            더 알아보기
          </Button>
          <Link
            href="/plan"
            className="
              inline-flex items-center justify-center
              h-10 px-5
              rounded-full
              bg-travel-primary100
              border border-travel-primary100
              text-white
              text-16
              hover:bg-travel-primary200 hover:border-travel-primary200
              transition
              gap-2
            "
          >
            <Plane className="w-5 h-5 text-white" />
            여행 일정만들기
          </Link>
        </div>
      </div>
    </div>
  );
}
