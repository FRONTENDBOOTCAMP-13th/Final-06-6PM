import { ZoomIn, ZoomOut } from "lucide-react";
import TestMap2 from "@/app/photomap/view/mapcom/depth/koreaMap2";
import KoreaMapClipPathImg from "@/app/photomap/view/mapcom/depth/koreaMapImg";
import MapTest from "@/app/photomap/view/mapcom/depth/mapTest";

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
          <KoreaMapClipPathImg />
        </div>
        <div>
          <MapTest token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInR5cGUiOiJhZG1pbiIsIm5hbWUiOiLrrLjshJzsnbgiLCJlbWFpbCI6ImFkbWluQG1hcmtldC5jb20iLCJpbWFnZSI6Ii9maWxlcy9mZWJjMTMtZmluYWwwNi1lbWpmL3VzZXItbXV6aS5wbmciLCJsb2dpblR5cGUiOiJlbWFpbCIsImlhdCI6MTc1MzU5NTI1MywiZXhwIjoxNzUzNjgxNjUzLCJpc3MiOiJGRUJDIn0.0qS04JafG0btnZHYiAfVDhA25BtSEw-2P4627P91VEI" />
        </div>
      </div>
    </>
  );
}
