import BackButton from "@/components/feature/backButton";
import Navbar from "@/components/Navbar";
import PreviewContent from "@/components/plan/previewContent";

export default function PreviewPage() {
  return (
    <div>
      <div className="w-full relative py-5 px-4">
        <BackButton path="/plan/edit/search" />
        <p className="text-center">여행일정만들기</p>
      </div>
      <PreviewContent />
      <Navbar />
    </div>
  );
}
