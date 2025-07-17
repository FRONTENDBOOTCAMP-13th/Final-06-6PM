import React from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/btn";

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
}: RandomItemProps) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg w-full flex items-end min-h-[220px]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 top-0 left-0 bg-black/40" />
      <div className="relative z-10 w-full p-5">
        <div className="mb-3 space-y-1 text-white">
          <h3 className="font-bold text-20">{title}</h3>
          <p className="flex items-center gap-1 text-14">
            <MapPin className="w-4 h-4 text-white" />
            {location}
          </p>
          <p className="text-14 line-clamp-3">{desc}</p>
        </div>
        <Button variant="outline" size="md" className="float-right">
          더 알아보기
        </Button>
      </div>
    </div>
  );
}
