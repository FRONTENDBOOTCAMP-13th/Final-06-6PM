import Textarea from "@/components/ui/textarea";
import { FileText } from "lucide-react";

interface ReviewContentProps {
  name: string;
  defaultValue?: string;
}

export default function ReviewContent({ name, defaultValue = "" }: ReviewContentProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <FileText className="size-5" />
        <h3 className="font-semibold text-18">내용</h3>
      </div>
      <Textarea placeholder="내용을 입력해주세요" id="reviewContent" name={name} defaultValue={defaultValue} rows={5} />
    </div>
  );
}
