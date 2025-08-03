import Image from "next/image";
import { useState } from "react";
import CommentDeleteForm from "@/components/feature/commentDeleteForm";
import CommentEditForm from "@/components/feature/commentEditForm";
import { ReviewReply } from "@/types/review";
import useUserStore from "@/zustand/userStore";

interface CommentItemProps {
  imgUrl?: string;
  author: string;
  date: string;
  content: string;
  comment?: ReviewReply;
  onCommentDeleted?: (replyId: number) => void;
  onCommentUpdated?: (updatedReply: ReviewReply) => void;
}

export default function CommentItem({
  imgUrl,
  author,
  date,
  content,
  comment,
  onCommentDeleted,
  onCommentUpdated,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { userInfo } = useUserStore();

  const showActionButtons = comment && userInfo && comment.user._id === userInfo._id;

  return (
    <div className="rounded-lg text-travel-text100 text-16">
      <div className="flex items-start gap-3">
        <div className="w-[50px] h-[50px] rounded-full bg-travel-gray200 overflow-hidden aspect-square flex-shrink-0">
          {imgUrl && (
            <Image
              width={50}
              height={50}
              src={imgUrl}
              alt={`${author} 프로필`}
              className="object-cover w-full h-full"
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="font-semibold">{author}</p>
            {showActionButtons && !isEditing && (
              <div className="flex items-center">
                {onCommentUpdated && (
                  <CommentEditForm
                    reply={comment}
                    onCommentUpdated={onCommentUpdated}
                    isEditing={isEditing}
                    onEditToggle={setIsEditing}
                  />
                )}
                {onCommentDeleted && <CommentDeleteForm reply={comment} onCommentDeleted={onCommentDeleted} />}
              </div>
            )}
          </div>

          <p className="text-travel-gray500 text-14 mb-2">{date}</p>

          {isEditing && comment && onCommentUpdated ? (
            <CommentEditForm
              reply={comment}
              onCommentUpdated={onCommentUpdated}
              isEditing={isEditing}
              onEditToggle={setIsEditing}
            />
          ) : (
            <p className="text-14 break-words whitespace-pre-wrap">{content}</p>
          )}
        </div>
      </div>
    </div>
  );
}
