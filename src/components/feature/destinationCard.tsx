// components/feature/DestinationCard.tsx
"use client";

import Image from "next/image";

export interface Destination {
  id: number;
  name: string;
  image: string;
}

interface DestinationCardProps {
  destination: Destination;
  onClick: (regionName: string) => void;
}

export default function DestinationCard({
  destination,
  onClick,
}: DestinationCardProps) {
  return (
    <div onClick={() => onClick(destination.name)} className="cursor-pointer">
      <div className="relative overflow-hidden rounded-lg aspect-square group">
        <Image
          width={400}
          height={300}
          src={destination.image}
          alt={destination.name}
          className="object-cover w-full h-full transition-transform duration-300 z-5 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h3 className="text-white text-20">{destination.name}</h3>
        </div>
      </div>
    </div>
  );
}
