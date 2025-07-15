import React from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/btn";

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
        <Button variant="outline" size="sm">
          더 알아보기
        </Button>
      </div>
    </div>
  );
}
