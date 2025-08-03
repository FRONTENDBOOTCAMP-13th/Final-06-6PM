"use client";

import { useState, useCallback } from "react";
import FeedDetailContent from "@/components/feed/feedDetailContent";
import CommentForm from "@/components/feed/commentForm";
import { ReviewReply } from "@/types/review";

interface FeedDetailContainerProps {
  reviewId: string;
}

export default function FeedDetailContainer({ reviewId }: FeedDetailContainerProps) {
  const [newComment, setNewComment] = useState<ReviewReply | null>(null);

  const handleCommentAdded = useCallback((comment: ReviewReply) => {
    setNewComment(comment);
  }, []);

  return (
    <>
      <FeedDetailContent reviewId={reviewId} newComment={newComment} />
      <CommentForm onCommentAdded={handleCommentAdded} />
    </>
  );
}
