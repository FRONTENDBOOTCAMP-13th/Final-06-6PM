"use client";

import { Trash2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useParams } from "next/navigation";
import useUserStore from "@/zustand/userStore";
import { deleteReviewReply } from "@/data/actions/reply";
import { ReviewReply } from "@/types/review";

interface CommentDeleteFormProps {
  reply: ReviewReply;
  onCommentDeleted: (replyId: number) => void;
}

export default function CommentDeleteForm({ reply, onCommentDeleted }: CommentDeleteFormProps) {
  const { userInfo, token } = useUserStore();
  const params = useParams();
  const reviewId = params.id as string;
  const [state, formAction, isLoading] = useActionState(deleteReviewReply, null);

  useEffect(() => {
    if (state?.ok === 1) {
      onCommentDeleted(reply._id);
    }
  }, [state, reply._id, onCommentDeleted]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      event.preventDefault();
      return;
    }
  };

  if (!userInfo || reply.user._id !== userInfo._id) {
    return null;
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} className="inline ml-2">
      <input type="hidden" name="_id" value={reviewId} />
      <input type="hidden" name="replyId" value={reply._id} />
      <input type="hidden" name="accessToken" value={token || ""} />

      <button
        type="submit"
        disabled={isLoading}
        className="text-travel-fail100 hover:text-travel-fail200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="댓글 삭제"
      >
        <Trash2 className="size-4" />
      </button>

      {state?.ok === 0 && state.message && <div className="text-xs text-travel-fail100 mt-1">{state.message}</div>}
    </form>
  );
}
