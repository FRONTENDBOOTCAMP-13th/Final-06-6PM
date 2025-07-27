import Input from "@/components/ui/input";
import { Plane } from "lucide-react";

// interface ReviewTitleProps {
//   title: string;
//   setTitle: (title: string) => void;
// }

export default function ReviewTitle({ name = "title" }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <Plane className="size-5" />
        <h3 className="font-semibold text-18">제목</h3>
      </div>
      <Input size="sm" name={name} placeholder="제목을 입력해주세요" />
    </div>
  );
}
