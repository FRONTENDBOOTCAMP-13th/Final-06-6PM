"use client";

import { useSearchParams } from "next/navigation";

export default function CurrentPlace() {
  const searchParams = useSearchParams();
  const place = searchParams.get("place");

  return <p className="text-16 text-travel-gray700">{place}</p>;
}
