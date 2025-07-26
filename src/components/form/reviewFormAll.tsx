"use client";

import { useState, useActionState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ReviewStar from "@/components/form/reviewStar";
import ReviewTitle from "@/components/form/reviewTitle";
import ReviewContent from "@/components/form/reviewContent";
import ReviewImg from "@/components/form/reviewImg";
import ReviewTag from "@/components/form/reviewTag";
import Button from "@/components/ui/btn";
import useUserStore from "@/zustand/userStore";
import { toast } from "react-toastify";
import { createReviewAllPost } from "@/data/actions/review";

export default function ReviewFormAll() {
  const token = useUserStore((state) => state.token);
  const router = useRouter();

  // useActionState: [state, formAction, isPending]
  const [state, formAction, isPending] = useActionState(
    createReviewAllPost,
    null
  );

  const [starRate, setStarRate] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const planId = searchParams.get("plan_id");
  const place = searchParams.get("place");

  // Server Action 결과 처리
  useEffect(() => {
    if (state?.ok === 1) {
      toast.success("리뷰가 성공적으로 작성되었습니다!");
      router.push(`/review/success`);
    } else if (state?.ok === 0 && state?.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  const isFormValid = title.trim() && content.trim() && planId && place;

  return (
    <form action={formAction} className="grid grid-cols-1 gap-3 p-4">
      {/* Hidden inputs로 상태값들 전달 */}
      <input type="hidden" name="starRate" value={starRate} />
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="content" value={content} />
      <input type="hidden" name="tags" value={JSON.stringify(tags)} />
      <input type="hidden" name="token" value={token || ""} />
      <input type="hidden" name="plan_id" value={planId || ""} />
      <input type="hidden" name="place" value={place || ""} />

      {/* 실제 이미지 파일들을 hidden input으로 추가 */}
      {images.map((image, index) => (
        <input
          key={`image-${index}`}
          type="file"
          name={`image_${index}`}
          style={{ display: "none" }}
          ref={(input) => {
            if (input) {
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(image);
              input.files = dataTransfer.files;
            }
          }}
        />
      ))}

      <ReviewStar starRate={starRate} setStarRate={setStarRate} />
      <ReviewTitle title={title} setTitle={setTitle} />
      <ReviewContent content={content} setContent={setContent} />
      <ReviewImg images={images} setImages={setImages} />
      <ReviewTag tags={tags} setTags={setTags} />

      {/* 에러 메시지 표시 */}
      {state?.ok === 0 && state?.errors && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          {Object.entries(state.errors).map(([field, error]) => (
            <p key={field} className="text-sm text-red-600">
              {error?.msg}
            </p>
          ))}
        </div>
      )}

      {/* 제출 버튼 */}
      <div className="bg-white fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 max-h-21 z-20 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
        <Button
          className="w-full text-16"
          type="submit"
          disabled={isPending || !isFormValid}
        >
          {isPending ? "작성 중..." : "리뷰 작성 완료"}
        </Button>
      </div>
    </form>
  );
}
