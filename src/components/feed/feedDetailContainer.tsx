"use client";

import { useState, useCallback } from "react";
import FeedDetailContent from "@/components/feed/feedDetailContent";
import CommentForm from "@/components/feed/commentForm";
import { ReviewReply } from "@/types/review";
import FeedPlanItem from "@/components/feed/feedPlanItem";
import { useSearchParams } from "next/navigation";

export interface FeedDetailContainerProps {
  reviewId: string;
}

export default function FeedDetailContainer({ reviewId }: FeedDetailContainerProps) {
  const [newComment, setNewComment] = useState<ReviewReply | null>(null);
  const params = useSearchParams();
  const planId = params.get("planId");

  const handleCommentAdded = useCallback((comment: ReviewReply) => {
    setNewComment(comment);
  }, []);

  return (
    <>
      <FeedDetailContent reviewId={reviewId} newComment={newComment} />
      <CommentForm onCommentAdded={handleCommentAdded} />
      <FeedPlanItem planId={planId as string} />
    </>
  );
}
