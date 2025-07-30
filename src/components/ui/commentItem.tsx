import Image from "next/image";
import CommentDeleteForm from "@/components/feature/commentDeleteForm";
import { ReviewReply } from "@/types/review";

interface CommentItemProps {
  imgUrl?: string;
  author: string;
  date: string;
  content: string;
  comment?: ReviewReply;
  onCommentDeleted?: (replyId: number) => void;
}

export default function CommentItem({ imgUrl, author, date, content, comment, onCommentDeleted }: CommentItemProps) {
  return (
    <div className="rounded-lg text-travel-text100 text-16">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-[50px] h-[50px] rounded-full bg-travel-gray200 overflow-hidden aspect-square">
          {imgUrl && (
            <Image
              width={100}
              height={100}
              src={imgUrl}
              alt={`${author} 프로필`}
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <div className="space-y-0.5 flex-1">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{author}</p>
            {comment && onCommentDeleted && <CommentDeleteForm reply={comment} onCommentDeleted={onCommentDeleted} />}
          </div>
          <p className="text-travel-gray500 text-14">{date}</p>
        </div>
      </div>

      <p className="text-14">{content}</p>
    </div>
  );
}
