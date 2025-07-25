"use client";

import { Camera, ImagePlus, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

interface ReviewImgProps {
  images: File[];
  setImages: (images: File[]) => void;
}

export default function ReviewImg({ images, setImages }: ReviewImgProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // 이미지 미리보기용 URL
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_IMG = 10;

  // images가 변경될 때마다 미리보기 URL 업데이트
  useEffect(() => {
    // 기존 URL 해제 (메모리 누수 방지)
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    // 새로운 미리보기 URL 생성
    const newUrls = images.map((file) => URL.createObjectURL(file));
    setPreviewUrls(newUrls);

    // cleanup 함수로 컴포넌트 언마운트 시 URL 해제
    return () => {
      newUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  // 이미지 업로드
  const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectFiles = Array.from(e.target.files || []);
    console.log(selectFiles);

    if (images.length + selectFiles.length > MAX_IMG) {
      toast.warning("사진은 최대 10장까지 첨부할 수 있습니다.");
      return;
    }

    // 부모 컴포넌트의 상태 업데이트
    setImages([...images, ...selectFiles]);

    e.target.value = ""; // input 초기화
  };

  // 이미지 삭제
  const removeImg = (index: number) => {
    // 부모 컴포넌트의 상태 업데이트
    setImages(images.filter((_, i) => i !== index));
  };

  // 파일 선택 다이얼로그 열기
  const openFileDialog = () => inputRef.current?.click();

  return (
    <div className="space-y-1.5">
      {/* 헤더 */}
      <div className="flex items-center gap-1.5">
        <Camera className="size-5" />
        <h3 className="font-semibold text-18">사진첨부</h3>
      </div>

      {/* 이미지 그리드 */}
      <div className="grid grid-cols-4 gap-2">
        {/* 업로드 버튼 */}
        <div
          className="relative flex items-center justify-center p-2 transition-colors bg-white border border-dashed rounded-lg cursor-pointer min-h-21 border-travel-gray400 hover:bg-gray-50"
          onClick={openFileDialog}
        >
          <ImagePlus className="w-10 h-10 text-travel-gray400" />
        </div>

        {/* 업로드된 이미지들 */}
        {previewUrls.map((src, index) => (
          <div
            key={index}
            className="relative p-2 bg-white border rounded-lg border-travel-gray400 min-h-21"
          >
            <img
              src={src}
              alt={`첨부이미지-${index + 1}`}
              className="object-cover w-full h-full rounded-lg"
            />
            {/* 삭제 버튼 */}
            <button
              type="button"
              onClick={() => removeImg(index)}
              className="absolute z-10 p-1 text-white transition-colors rounded-full top-1 right-1 bg-black/60 hover:bg-black/80"
              aria-label={`이미지 ${index + 1} 삭제`}
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {/* 숨겨진 파일 입력 */}
        <input
          type="file"
          accept="image/*"
          multiple
          ref={inputRef}
          className="hidden"
          onChange={uploadImg}
        />
      </div>
    </div>
  );
}
