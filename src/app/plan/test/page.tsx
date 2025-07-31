// app/page.tsx (메인 페이지에서 사용)
import NaverMap from "@/components/plan/naverMap";

export default function HomePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">기본 지도</h2>
        <NaverMap />
      </div>
    </div>
  );
}
