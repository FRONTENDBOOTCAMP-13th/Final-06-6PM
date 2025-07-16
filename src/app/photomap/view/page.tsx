import { ZoomIn, ZoomOut } from "lucide-react";

// 지도생성 뷰
export default function PhotoMapViewPage() {
  return (
    <>
      <div className="w-full min-h-[600px] bg-amber-200 mt-4">
        지도 들어올 공간
      </div>
      <div className="flex items-center justify-end w-full gap-2 py-2">
        <ZoomIn />
        <ZoomOut />
      </div>
    </>
  );
}
