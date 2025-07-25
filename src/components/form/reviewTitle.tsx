import Input from "@/components/ui/input";
import { Plane } from "lucide-react";

export default function ReviewTitle() {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <Plane className="size-5" />
        <h3 className="font-semibold text-18">제목</h3>
      </div>
      <Input size="sm" placeholder="제목을 입력해주세요" />
    </div>
  );
}
