import { MessageCircleMore } from "lucide-react";

interface FreeItemProps {
  title : string;
  content : string;
  author : string;
  date : string;
  view : number;
  comment : number;
}


export default function FreeItemComponent({title, content, author, date, view, comment}: FreeItemProps) {
  return(
    <div>
      <h3 className="text-14 text-primary font-bold">{title}</h3>
      <p className="text-12">{content}</p>
      <div className="flex items-center divide-x text-10 text-cancel">
        <span className="pr-2">{author}</span>
        <span className="px-2">{date}</span>
        <span className="px-2">조회수 {view}</span>
        <span className="px-2 flex items-center gap-1"><MessageCircleMore className="w-[15px] h-[15px]"/> {comment}</span>
      </div>
    </div>
  );
}

