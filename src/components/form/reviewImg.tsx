"use client";

import { Camera, ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function ReviewImg() {
  const [imgList, setImgList] = useState<string[]>([]); // 이미지 미리보기용 URL
  const [imgFile, setImgFile] = useState<File[]>([]); // 업로드할 파일
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_IMG = 10;

  // 이미지 업로드
  const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    const selectFiles = Array.from(e.target.files || []);
    console.log(selectFiles);

    /*
      e.target.files = FileList 선택한 파일목록
      FileList {
        0: File { name: "photo1.png", size: 123456, type: "image/png", ... },
        1: File { name: "photo2.jpg", size: 234567, type: "image/jpeg", ... },
        length: 2,
        item: function(index) { ... } 
      }
     */

    if (imgFile.length + selectFiles.length > MAX_IMG) {
      // 현재 파일 개수 + 새로 선택하는 파일 개수
      toast.warning("사진은 최대 10장까지 첨부할 수 있습니다.");
      return;
    }

    // 파일 객체를 브라우저가 보여줄 수 있는 임시 URL처리
    const newUrls = selectFiles.map((file) => URL.createObjectURL(file));

    setImgList((prev) => [...prev, ...newUrls]); // 이미지 미리보기용 URL
    setImgFile((prev) => [...prev, ...selectFiles]); // 업로드할 파일

    e.target.value = ""; // input 초기화
  };

  // 이미지 삭제
  const removeImg = (index: number) => {
    // 메모리 누수 방지를 위해 URL 해제
    URL.revokeObjectURL(imgList[index]);

    // 두 상태에서 해당 인덱스 제거
    setImgList((prev) => prev.filter((_, i) => i !== index));
    setImgFile((prev) => prev.filter((_, i) => i !== index));
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
        {imgList.map((src, index) => (
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
