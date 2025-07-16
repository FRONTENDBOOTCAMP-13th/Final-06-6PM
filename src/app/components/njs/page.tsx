import DayItem from "@/components/ui/dayItem";

export default function ComponentPage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="w-full">
        <h2 className="mb-2 text-16 font-bold">DayItem</h2>
        <div className="space-y-4 w-full">
          <DayItem name="제주도" period="2025.07.12 ~ 2025.07.15." dday="D-2" />
          <DayItem empty />
        </div>
      </div>
    </div>
  );
}
