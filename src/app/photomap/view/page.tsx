import { ZoomIn, ZoomOut } from "lucide-react";
import TestMap2 from "@/app/photomap/view/mapcom/depth/koreaMap2";
import KoreaMapClipPathImg from "@/app/photomap/view/mapcom/depth/koreaMapImg";
const userId = "admin@market.com";
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
          <KoreaMapClipPathImg userId={userId} />
        </div>
      </div>
    </>
  );
}
