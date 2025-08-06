import SearchAll from "@/components/plan/searchAll";
import BackButton from "@/components/feature/backButton";

export default function SearchPage() {
  return (
    <div>
      <h1 className="bg-white sr-only">여행 장소 검색</h1>
      <div className="relative w-full px-4 py-5">
        <BackButton path="/plan/edit/schedule" />
        <p className="text-center" aria-hidden="true">
          여행일정만들기
        </p>
      </div>
      <SearchAll />
    </div>
  );
}
