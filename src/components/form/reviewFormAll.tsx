"use client";

import { useActionState, useRef, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { Camera, ImagePlus, X } from "lucide-react";
import { uploadFile } from "@/data/actions/file"; // 파일 업로드 함수
import ReviewStar from "@/components/form/reviewStar";
import ReviewTitle from "@/components/form/reviewTitle";
import ReviewContent from "@/components/form/reviewContent";
import ReviewTag from "@/components/form/reviewTag";
import Button from "@/components/ui/btn";
import useUserStore from "@/zustand/userStore";
import { toast } from "react-toastify";
import { createReviewAllPost } from "@/data/actions/review";

export default function ReviewFormAll() {
  const token = useUserStore((state) => state.token);
  const [state, formAction, isPending] = useActionState(
    createReviewAllPost,
    null
  );

  // 이미지 관련 상태
  const [images, setImages] = useState<
    { path: string; name: string; preview: string }[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const params = useParams();
  const planId = params?.id || "";
  const place = searchParams.get("place");

  // 이미지 업로드 처리
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > 10) {
      toast.warning("사진은 최대 10장까지 첨부할 수 있습니다.");
      return;
    }

    setIsUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // 미리보기 생성
        const preview = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        // 파일 업로드
        const formData = new FormData();
        formData.append("attach", file);
        const res = await uploadFile(formData);

        if (res.ok === 1 && res.item.length > 0) {
          return {
            path: res.item[0].path,
            name: res.item[0].originalname || res.item[0].name,
            preview,
          };
        }
        throw new Error("업로드 실패");
      });

      const uploadedImages = await Promise.all(uploadPromises);
      setImages((prev) => [...prev, ...uploadedImages]);
    } catch (error) {
      toast.error("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  // 이미지 삭제
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 파일 선택 다이얼로그 열기
  const openFileDialog = () => {
    if (!isUploading && !isPending) {
      fileRef.current?.click();
    }
  };

  return (
    <form action={formAction} className="grid grid-cols-1 gap-3 p-4 relative">
      {/* 로딩 오버레이 */}
      {(isUploading || isPending) && (
        <div className="absolute inset-0 z-50 bg-black bg-opacity-30 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <span className="text-white font-semibold text-sm">
            {isUploading ? "이미지 업로드 중..." : "리뷰 작성 중..."}
          </span>
        </div>
      )}

      {/* Hidden inputs */}
      <input type="hidden" name="token" value={token || ""} />
      <input type="hidden" name="plan_id" value={planId.toString()} />
      <input type="hidden" name="place" value={place || ""} />

      {/* 이미지 경로들을 hidden input으로 전송 */}
      {images.map((img, index) => (
        <input
          key={index}
          type="hidden"
          name={`imagePath_${index}`}
          value={img.path}
        />
      ))}

      {/* 별점 */}
      <ReviewStar name="starRate" defaultValue="5" />

      {/* 제목 */}
      <div>
        <ReviewTitle name="title" />
        {state?.ok === 0 && state.errors?.title && (
          <p className="mt-1 text-sm text-red-500">{state.errors.title.msg}</p>
        )}
      </div>

      {/* 내용 */}
      <div>
        <ReviewContent name="content" />
        {state?.ok === 0 && state.errors?.content && (
          <p className="mt-1 text-sm text-red-500">
            {state.errors.content.msg}
          </p>
        )}
      </div>

      {/* 이미지 업로드 */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5">
          <Camera className="size-5" />
          <h3 className="font-semibold text-18">사진첨부</h3>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {/* 업로드 버튼 */}
          <div
            className="relative flex items-center justify-center p-2 transition-colors bg-white border border-dashed rounded-lg cursor-pointer min-h-21 border-travel-gray400 hover:bg-gray-50"
            onClick={openFileDialog}
          >
            <ImagePlus className="w-10 h-10 text-travel-gray400" />
          </div>

          {/* 업로드된 이미지들 */}
          {images.map((img, index) => (
            <div
              key={index}
              className="relative p-2 bg-white border rounded-lg border-travel-gray400 min-h-21"
            >
              <img
                src={img.preview}
                alt={`첨부이미지-${index + 1}`}
                className="object-cover w-full h-full rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute z-10 p-1 text-white transition-colors rounded-full top-1 right-1 bg-black/60 hover:bg-black/80"
                aria-label={`이미지 ${index + 1} 삭제`}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* 파일 선택용 숨겨진 input */}
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
          disabled={isUploading || isPending}
        />
      </div>

      {/* 태그 */}
      <ReviewTag name="tags" />

      {/* 제출 버튼 */}
      <div className="bg-white fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 max-h-21 z-20 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
        <Button
          className="w-full text-16"
          type="submit"
          disabled={isPending || isUploading}
        >
          {isPending ? "작성 중..." : "리뷰 작성 완료"}
        </Button>
      </div>
    </form>
  );
}
