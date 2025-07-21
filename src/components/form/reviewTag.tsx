import TagItem from "@/components/ui/tagItem";

export default function ReviewTag() {
  return (
    <div className="flex items-center justify-between px-4 py-3 border rounded-lg border-travel-gray400 text-14">
      <p>
        <strong>#태그</strong>로 감정과 분위기를 표현해보세요!
      </p>
      <TagItem variant="fill">태그</TagItem>
    </div>
  );
}
