import KoreaMapContainer from "@/components/photoweb/koreaMap";

// 지도생성게시판
export default function PhotoMapPage() {
  return (
    <>
      <h1 className="bg-white sr-only">지도생성 페이지</h1>
      <KoreaMapContainer />
    </>
  );
}
