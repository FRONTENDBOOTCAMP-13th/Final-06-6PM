import { ZoomIn, ZoomOut } from "lucide-react";
import KoreaMap from "./mapcom/koreaMap";
import TestMap from "@/app/photomap/view/mapcom/depth/paths";

// 지도생성 뷰
export default function PhotoMapViewPage() {
  return (
    <>
      <div>
        <ZoomIn />
        <ZoomOut />
        <div className="w-full bg-amber-200 mt-4">
          <KoreaMap />
        </div>
        <div className="w-full bg-amber-200 mt-4">
          <TestMap />
        </div>
      </div>
    </>
  );
}
