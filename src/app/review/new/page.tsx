import DayItem from "@/components/ui/dayItem";
import DropdownItem from "@/components/ui/dropdownItem";

// 자유게시판 목록
export default function FreeAddPage() {
  return (
    <>
      <div className="flex flex-row-reverse mt-3 mb-4">
        <DropdownItem label="오래된순" />
      </div>
      <div className="space-y-4">
        <DayItem name="부산" period="2025.07.12 ~ 2025.07.15." />
        <DayItem name="부산" period="2025.07.12 ~ 2025.07.15." />
        <DayItem name="제주도" period="2025.07.12 ~ 2025.07.15." dday="D-2" />
        <DayItem empty />
      </div>
    </>
  );
}
