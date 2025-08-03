"use client";

import { Send } from "lucide-react";
import { useState, useActionState, useTransition, useEffect } from "react";
import { useParams } from "next/navigation";
import useUserStore from "@/zustand/userStore";
import { createReviewReply } from "@/data/actions/reply";
import { ReviewReply } from "@/types/review";

interface CommentFormProps {
  onCommentAdded: (comment: ReviewReply) => void;
}

export default function CommentForm({ onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [state, formAction, isLoading] = useActionState(createReviewReply, null);
  const [isPending, startTransition] = useTransition();
  const { userInfo, token, isLoggedIn } = useUserStore();
  const params = useParams();
  const reviewId = params.id as string;

  useEffect(() => {
    if (state?.ok === 1 && state.item) {
      onCommentAdded(state.item);
    }
  }, [state, onCommentAdded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn || !userInfo) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("_id", reviewId);
    formData.append("content", content);
    formData.append("accessToken", token || "");

    startTransition(() => {
      formAction(formData);
    });

    setContent("");
  };

  return (
    <div className="w-full mt-4">
      <label htmlFor="feedMessage" className="sr-only">
        댓글창
      </label>

      {!isLoggedIn || !userInfo ? (
        <div className="text-center py-4">
          <p className="text-travel-gray500 text-sm">로그인 후 댓글을 작성할 수 있습니다.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              placeholder="댓글을 입력해주세요."
              id="feedMessage"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isLoading || isPending}
              className="w-full py-2 pl-4 pr-10 rounded-full border border-travel-info100 bg-white text-travel-text100 placeholder-travel-gray500 focus:outline-travel-info200 focus:bg-[#f4faff] focus:text-travel-info200 transition duration-200 text-14"
            />
            <button
              type="submit"
              disabled={isLoading || isPending || !content.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-travel-text100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="text-travel-info100 w-5" />
            </button>
          </div>

          {state?.ok === 0 && state.message && <p className="mt-2 text-sm text-red-500">{state.message}</p>}
        </form>
      )}
    </div>
  );
}
