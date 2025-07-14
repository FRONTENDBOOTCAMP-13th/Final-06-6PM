import DayItem from "@/components/ui/day-item";

export default function ComponentPage() {
  return (
    <div className="flex flex-col gap-4 items-center bg-bg min-h-screen py-10">
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="mb-2 text-16 font-bold">DayItem</h2>
        <div className="space-y-4 w-full">
          <DayItem name="제주도" period="2025.07.12 ~ 2025.07.15." dday="D-2" />
          <DayItem empty />
        </div>
      </div>
    </div>
  );
}
