import ButtonRounded from "@/components/ui/btnRound";
import { MessageCircleMore } from "lucide-react";

interface FreeItemProps {
  title: string;
  content: string;
  author: string;
  date: string;
  view: number;
  comment: number;
}

export default function FreeItem({
  title,
  content,
  author,
  date,
  view,
  comment,
}: FreeItemProps) {
  return (
    <div className="space-y-1.5  font-sans">
      <div className="flex gap-1">
        <ButtonRounded variant="outline" size="sm">
          태그1
        </ButtonRounded>
        <ButtonRounded variant="outline" size="sm">
          태그2
        </ButtonRounded>
      </div>
      <h3 className="text-16 text-travel-primary100 font-bold">{title}</h3>
      <p className="text-14">{content}</p>
      <div className="flex items-center justify-between text-12 text-travel-gray700">
        <p className="flex divide-x divide-travel-gray500">
          <span className="px-2 pl-0">{author}</span>
          <span className="px-2">{date}</span>
          <span className="px-2">조회수 {view}</span>
        </p>
        <p className="flex items-center gap-1">
          <MessageCircleMore className="w-[1rem] h-[1rem]" />
          <span>{comment}</span>
        </p>
      </div>
    </div>
  );
}
