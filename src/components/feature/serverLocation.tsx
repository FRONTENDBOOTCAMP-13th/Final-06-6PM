"use client";

// location이라는 props만 받아서 표시 (ipapi fetch, useEffect 등 전부 제거!)
export default function ServerLocation({ city }: { city: string }) {
  return <span>{city}</span>;
}
