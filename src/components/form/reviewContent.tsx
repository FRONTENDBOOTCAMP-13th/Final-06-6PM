import Textarea from "@/components/ui/textarea";
import { Plane } from "lucide-react";

export default function ReviewContent() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Plane />
        <h3 className="font-semibold text-18">내용</h3>
      </div>
      <Textarea placeholder="내용을 입력해주세요" id="reviewContent" />
    </div>
  );
}
