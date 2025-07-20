import { ImagePlus, Plane } from "lucide-react";

export default function ReviewImg() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Plane />
        <h3 className="font-semibold text-18">사진첨부</h3>
      </div>
      <div className="p-4 bg-white border rounded-lg b text-travel-gray700 border-travel-gray400 w-fit">
        <ImagePlus />
      </div>
    </div>
  );
}
