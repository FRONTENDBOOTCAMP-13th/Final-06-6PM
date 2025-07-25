"use client";

import ReviewStar from "@/components/form/reviewStar";
import ReviewTitle from "@/components/form/reviewTitle";
import ReviewContent from "@/components/form/reviewContent";
import ReviewImg from "@/components/form/reviewImg";
import ReviewTag from "@/components/form/reviewTag";
import Button from "@/components/ui/btn";
import { useState } from "react";
import useUserStore from "@/zustand/userStore";
import { createReviewAllPost } from "@/data/actions/review";

export default function ReviewFormAll() {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]); // 업로드할 파일
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const formSubmit = async (formData: FormData) => {
    setIsSubmit(true);

    try {
      // 텍스트파일
      formData.append("rating", rating.toString());
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tags", JSON.stringify(tags));

      // 이미지
      images.forEach((image, index) => {
        formData.append(`image_${index}`, image);
      });

      const token = useUserStore((state) => state.token);
      const result = await createReviewAllPost(formData, token);

      if (result.ok) {
        console.log("리뷰 작성 성공:", result);
      } else {
        console.error("리뷰 작성 실패:", result.message);
      }
    } catch (err) {
      console.error("폼 제출 오류", err);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <form action={formSubmit} className="grid grid-cols-1 gap-3 p-4">
      <ReviewStar rating={rating} setRating={setRating} />
      <ReviewTitle title={title} setTitle={setTitle} />
      <ReviewContent content={content} setContent={setContent} />
      <ReviewImg images={images} setImages={setImages} />
      <ReviewTag tags={tags} setTags={setTags} />
      <div className="bg-travel-bg100 fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4  max-h-21 z-20 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
        <Button className="w-full text-16" type="submit">
          {isSubmit ? "작성 중" : "리뷰 작성 완료"}
        </Button>
      </div>
    </form>
  );
}
