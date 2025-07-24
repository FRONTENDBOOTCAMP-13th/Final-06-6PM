import { ZoomIn, ZoomOut } from "lucide-react";
import KoreaMap from "./mapcom/koreaMap";
import TestMap from "@/app/photomap/view/mapcom/depth/paths";
import TestMap2 from "@/app/photomap/view/mapcom/depth/koreaMap2";
import KoreaMapOverlayImg from "@/app/photomap/view/mapcom/depth/koreaMapImg";

// 지도생성 뷰
export default function PhotoMapViewPage() {
  return (
    <>
      <div>
        <ZoomIn />
        <ZoomOut />
        <div className="w-full bg-amber-200 mt-4">
          <TestMap2 />
        </div>
        <div>
          <KoreaMapOverlayImg />
        </div>
      </div>
    </>
  );
}
