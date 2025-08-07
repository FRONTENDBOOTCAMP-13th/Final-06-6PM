"use client";

import { Edit3, Check, X } from "lucide-react";
import { useActionState, useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import useUserStore from "@/zustand/userStore";
import { updateReviewReply } from "@/data/actions/reply";
import { ReviewReply } from "@/types/review";
import { toast } from "react-toastify";

interface CommentEditFormProps {
  reply: ReviewReply;
  onCommentUpdated: (updatedReply: ReviewReply) => void;
  isEditing: boolean;
  onEditToggle: (editing: boolean) => void;
}

export default function CommentEditForm({ reply, onCommentUpdated, isEditing, onEditToggle }: CommentEditFormProps) {
  const { userInfo, token } = useUserStore();
  const params = useParams();
  const reviewId = params.id as string;
  const [state, formAction, isLoading] = useActionState(updateReviewReply, null);
  const [editContent, setEditContent] = useState(reply.content || "");
  const prevStateRef = useRef(state);

  useEffect(() => {
    if (state && state !== prevStateRef.current && state.ok === 1 && state.item) {
      onCommentUpdated(state.item);
      onEditToggle(false);
      setEditContent(state.item.content || "");
    }
    prevStateRef.current = state;
  }, [state, onCommentUpdated, onEditToggle]);

  const handleEditClick = () => {
    onEditToggle(true);
    setEditContent(reply.content || "");
  };

  const handleCancelEdit = () => {
    onEditToggle(false);
    setEditContent(reply.content || "");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!editContent.trim()) {
      event.preventDefault();
      toast.warning("댓글 내용을 입력해주세요.");
      return;
    }
  };

  if (!userInfo || reply.user._id !== userInfo._id) {
    return null;
  }

  if (isEditing) {
    return (
      <div className="w-full mt-2">
        <form action={formAction} onSubmit={handleSubmit}>
          <input type="hidden" name="_id" value={reviewId} />
          <input type="hidden" name="replyId" value={reply._id} />
          <input type="hidden" name="accessToken" value={token || ""} />
          <input type="hidden" name="content" value={editContent} />

          <div className="flex items-start gap-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="flex-1 min-h-[60px] p-2 border border-travel-gray300 rounded-md resize-none text-14 focus:outline-none focus:border-travel-primary100"
              placeholder="댓글을 수정해주세요..."
              disabled={isLoading}
              autoFocus
            />
            <div className="flex gap-2 items-center pt-1 leading-none">
              <button
                type="submit"
                disabled={isLoading || !editContent.trim()}
                className="leading-none text-travel-primary100 hover:text-travel-primary200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="수정 완료"
              >
                <Check className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={isLoading}
                className="text-travel-gray400 hover:text-travel-gray500 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="수정 취소"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {state?.ok === 0 && state.message && <div className="text-xs text-travel-fail100 mt-1">{state.message}</div>}
        </form>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleEditClick}
      className="text-travel-gray400 hover:text-travel-gray500 rounded transition-colors ml-1"
      title="댓글 수정"
    >
      <Edit3 className="size-4" />
    </button>
  );
}
