import React from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import DrawerItem from "@/components/feature/drawerItem";
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
        <div className="float-right">
          <DrawerItem
            title={"이호태우해변"}
            location={"제주특별자치도"}
            imgUrl={"/images/user1.png"}
            desc={
              "섬 전체가 하나의 거대한 관광자원인 제주도. 이 해변은 제주도의 에메랄드빛 물빛이 인상적인 섬 전체가 하나의 거대한 관광자원인 제주도. 이 해변은 제주도의 에메랄드빛 물빛이 인상적인가 하나의 거대한 관광자원인 제주도. 이 해변은 제주도의 섬 전체가 하나의 거대한 관광자원인 제주도"
            }
          />
        </div>
      </div>
    </div>
  );
}
