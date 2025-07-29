import { ZoomIn, ZoomOut } from "lucide-react";
import TestMap2 from "@/app/photomap/view/mapcom/depth/koreaMap2";
import KoreaMapClipPathImg from "@/app/photomap/view/mapcom/depth/koreaMapImg";
import MapTest from "@/app/photomap/view/mapcom/depth/mapTest";

// 지도생성 뷰
export default function PhotoMapViewPage() {
  return (
    <>
      <div>
        <div>
          <MapTest />
        </div>
      </div>
    </>
  );
}
