"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2 } from "lucide-react";
import Input from "@/components/ui/input";
import ButtonRounded from "@/components/ui/btnRound";
import useUserStore from "@/zustand/userStore";
import { User } from "@/types/user";
import { getUser } from "@/data/functions/user";
import { UpdateUser } from "@/data/actions/user";

const API_URL = process.env.NEXT_PUBLIC_API_SERVER;

export default function ProfileItemEdit() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userInfo, setUserInfo] = useState<User | null>(null); // 서버에서 가져온 최신 사용자 정보
  const [isLoading, setIsLoading] = useState(false); // 데이터 로딩 상태
  const [isSubmit, setIsSubmit] = useState(false); // 폼 제출 중 상태
  const [prevImg, setPrevImg] = useState<string | null>(null); // 선택한 이미지 미리보기 URL
  const [selectFile, setSelectFile] = useState<File | null>(null); // 선택된 이미지 파일

  const user = useUserStore((state) => state.userInfo); // 현재 로그인된 사용자 정보
  const userToken = useUserStore((state) => state.token); // 인증 토큰
  const isLoggedIn = useUserStore((state) => state.isLoggedIn); // 로그인 상태
  const updateUser = useUserStore((state) => state.updateUser); // 사용자 정보 업데이트 함수

  // 폼 검증 에러 상태
  const [errors, setErrors] = useState<{
    name?: string;
    desc?: string;
    image?: string;
  }>({});

  // 프로필 이미지 URL 생성 로직
  const imgUrl = user?.image?.startsWith("http")
    ? user.image // 외부 URL인 경우 그대로 사용
    : user?.image
    ? `${API_URL}/${user.image}` // 상대 경로인 경우 API URL과 결합
    : "/images/user-default.webp"; // 이미지가 없으면 기본 이미지 사용

  // 사용자 정보 조회
  useEffect(() => {
    if (!isLoggedIn || !user?._id) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const res = await getUser(user._id);
        if (res.ok) {
          setUserInfo(res.item); // 성공 시 로컬상태에 유저 정보 저장
        } else {
          console.error("유저 정보를 조회하는데 실패했습니다:", res.message);
        }
      } catch (error) {
        console.error("네트워크 오류가 발생하였습니다.", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [user?._id, isLoggedIn, router]);

  // 폼 데이터 검증
  const validateForm = (formData: FormData): boolean => {
    const newErrors: typeof errors = {};

    // FormData에서 값 추출
    const name = formData.get("username") as string;
    const desc = formData.get("desc") as string;

    // 닉네임 검증
    if (!name || name.trim().length < 2) {
      newErrors.name = "닉네임은 2자 이상 입력해주세요.";
    } else if (name.trim().length > 20) {
      newErrors.name = "닉네임은 20자 이하로 입력해주세요.";
    }

    // 한줄소개 검증 (선택사항이므로 빈 값은 허용)
    if (desc && desc.trim().length > 100) {
      newErrors.desc = "한줄소개는 100자 이하로 입력해주세요.";
    }

    // 이미지 파일 크기 검증
    if (selectFile && selectFile.size > 5 * 1024 * 1024) {
      // 5MB
      newErrors.image = "이미지 파일은 5MB 이하로 업로드해주세요.";
    }

    // 에러 상태 업데이트
    setErrors(newErrors);

    // 에러가 없으면 true 반환
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 이미지 파일 선택 처리 함수
   * 파일 선택 시 검증 후 미리보기 생성
   */
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 타입 - 이미지 파일만 허용
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "이미지 파일만 업로드 가능합니다." }));
      return;
    }

    setSelectFile(file);
    setErrors((prev) => ({ ...prev, image: undefined }));

    // FileReader를 사용해 미리보기 이미지 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      setPrevImg(e.target?.result as string); // Base64 URL로 변환된 이미지 저장
    };
    reader.readAsDataURL(file); // 파일을 Data URL로 읽기 시작
  };

  /**
   * 프로필 이미지 클릭 시 파일 선택 다이얼로그 열기
   */
  const handleImageClick = () => {
    fileInputRef.current?.click(); // 숨겨진 input 클릭
  };

  // 프로필 수정 폼
  const profileEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user?._id) return;

    // FormData 객체 생성 - 파일 전송을 위해 사용
    const formData = new FormData(event.currentTarget);
    if (selectFile) {
      formData.append("attach", selectFile);
    }

    // 디버깅용 로그 추가
    console.log("Form data entries:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // 폼 검증 실패 시 처리 중단
    if (!validateForm(formData)) {
      return;
    }

    setIsSubmit(true); // 제출 중 상태로 변경

    try {
      // 서버에 업데이트 요청 전송
      const result = await UpdateUser(null, formData, user._id, userToken as string);

      if (result.ok) {
        // 성공 시 Zustand store의 사용자 정보 업데이트
        updateUser(result.item);

        // 성공 메시지 출력 (실제로는 toast 등 사용)
        console.log("프로필이 성공적으로 업데이트되었습니다.");

        // 마이페이지로 이동
        router.push("/mypage");
      } else {
        // 서버 에러 시 에러 메시지 표시
        console.error("Profile update failed:", result.message);
        setErrors({ name: result.message });
      }
    } catch (error) {
      // 네트워크 에러 등 예외 처리
      console.error("Error updating profile:", error);
      setErrors({ name: "프로필 업데이트 중 오류가 발생했습니다." });
    } finally {
      setIsSubmit(false); // 제출 중 상태 해제
    }
  };

  // 로딩 중일 때 표시할 UI
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <Loader2 className="w-8 h-8 animate-spin text-travel-primary" />
      </div>
    );
  }

  // 표시할 이미지 결정: 미리보기 이미지가 있으면 우선, 없으면 기존 이미지
  const displayImage = prevImg || imgUrl;

  console.log("Current user:", user);
  console.log("UserInfo from server:", userInfo);

  return (
    <form
      onSubmit={profileEdit}
      className="relative flex flex-col items-center w-full gap-6 px-5 py-8 text-center bg-white shadow rounded-xl"
    >
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />

      {/* 프로필 이미지 섹션 */}
      <div className="relative overflow-hidden rounded-full cursor-pointer w-25 h-25 bg-travel-gray200 aspect-square group">
        <div className="relative w-25 h-25 bg-travel-gray200 aspect-square">
          <Image
            fill
            src={displayImage}
            alt={user?.name || "사용자"}
            className="object-cover w-full h-full"
            onError={() => {
              setPrevImg("/images/user-default.webp");
            }}
          />
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/60 group-hover:opacity-100"
          onClick={handleImageClick}
        >
          <Camera className="text-white size-7" />
        </div>
      </div>

      {/* 이미지 관련 에러 메시지 */}
      {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}

      {/* 닉네임 */}
      <div className="w-full">
        <Input
          size="sm"
          id="username"
          name="username"
          placeholder="닉네임을 입력하세요"
          defaultValue={user?.name || ""}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      {/* 한줄소개 입력 필드 */}
      <div className="w-full">
        <Input
          key={userInfo?._id || "loading"} // userInfo 로드 시 컴포넌트 재생성
          size="sm"
          id="desc"
          name="desc"
          placeholder="자신을 소개해보세요"
          defaultValue={userInfo?.desc || ""}
          className={errors.desc ? "border-red-500" : ""}
        />
        {errors.desc && <p className="mt-1 text-sm text-red-500">{errors.desc}</p>}
      </div>

      {/* 취소/수정 버튼 */}
      <div className="grid grid-cols-2 gap-1.5 w-full">
        <Link href="/mypage" className="w-full">
          <ButtonRounded
            size="md"
            variant="outline"
            className="w-full"
            disabled={isSubmit} // 제출 중일 때 비활성화
          >
            취소
          </ButtonRounded>
        </Link>

        <ButtonRounded
          size="md"
          variant="fill"
          type="submit"
          className="flex items-center justify-center w-full gap-1"
          disabled={isSubmit} // 제출 중일 때 비활성화
        >
          {isSubmit ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span>수정 중...</span>
            </>
          ) : (
            "수정"
          )}
        </ButtonRounded>
      </div>
    </form>
  );
}
