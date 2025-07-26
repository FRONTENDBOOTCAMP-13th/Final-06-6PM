import SearchAll from "@/components/plan/searchAll";
import BackButton from "@/components/feature/backButton";

export default function SearchPage() {
  return (
    <div>
      <div className="relative w-full px-4 py-5">
        <BackButton path="/plan/edit/schedule" />
        <p className="text-center">여행일정만들기</p>
      </div>
      <SearchAll />
    </div>
  );
}
