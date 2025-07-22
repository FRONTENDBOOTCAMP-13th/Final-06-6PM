"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { createUser } from "@/data/actions/user";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import Button from "@/components/ui/btn";
import { toast } from "react-toastify";
import ImageUploader from "@/components/form/imageUploader";

export default function SignupForm() {
  const [state, formAction] = useActionState(createUser, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.ok) {
      toast.success("회원 가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      router.replace("/login");
    } else if (state?.ok === 0 && !state?.errors) {
      // 입력값 검증에러가 아닌 경우
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="w-full bg-white rounded-xl shadow border border-travel-gray400 p-6 flex flex-col gap-4 items-center"
    >
      <input type="hidden" name="type" value="user" />

      {/* 이메일 */}
      <div className="w-full">
        <Input
          size="sm"
          id="email"
          name="email"
          labelTitle="이메일"
          srOnly={false}
          placeholder="이메일을 입력해주세요"
        />
        <p className="mt-1 text-14 font-medium text-travel-fail100">
          {state?.ok === 0 && state.errors?.email?.msg}
        </p>
      </div>

      {/* 비밀번호 */}
      <div className="w-full">
        <Input
          size="sm"
          id="password"
          name="password"
          type="password"
          labelTitle="비밀번호"
          srOnly={false}
          placeholder="비밀번호를 입력해주세요"
        />
        <p className="mt-1 text-14 font-medium text-travel-fail100">
          {state?.ok === 0 && state.errors?.password?.msg}
        </p>
      </div>

      {/* 이름 */}
      <div className="w-full">
        <Input
          size="sm"
          id="name"
          name="name"
          labelTitle="닉네임"
          srOnly={false}
          placeholder="닉네임을 입력해주세요"
        />
        <p className="mt-1 text-14 font-medium text-travel-fail100">
          {state?.ok === 0 && state.errors?.name?.msg}
        </p>
      </div>

      {/* 소개 */}
      <div className="w-full">
        <Input
          size="sm"
          id="desc"
          name="desc"
          labelTitle="소개(선택사항)"
          srOnly={false}
          placeholder="소개를 입력해주세요"
        />
      </div>

      {/* 이미지 */}
      <ImageUploader />

      {/* 버튼 그룹 */}
      <div className="flex justify-center items-center gap-4">
        <Button type="submit" variant="primary" size="md">
          회원가입
        </Button>
        <Link href="/">
          <Button variant="outline" size="md">
            취소
          </Button>
        </Link>
      </div>
    </form>
  );
}
