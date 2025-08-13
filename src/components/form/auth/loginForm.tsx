"use client";

import React, { FormEvent, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import Button from "@/components/ui/btn";
import { login } from "@/data/actions/user";
import { toast } from "react-toastify";
import useUserStore from "@/zustand/userStore";

export default function LoginForm() {
  const { setToken, setUserInfo } = useUserStore.getState();
  const router = useRouter();
  const [userState, formAction, isLoading] = useActionState(login, null);

  useEffect(() => {
    if (userState?.ok) {
      const user = userState.item;

      setToken(user.token?.accessToken || "", user.token?.refreshToken || "");
      setUserInfo({
        _id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
        image: user.image,
        token: user.token,
        extra: user.extra,
      });
      toast.success("로그인이 완료되었습니다.");
      router.replace("/home");
    } else if (!userState?.errors && userState?.message) {
      toast.error(userState.message);
    }
  }, [userState]);

  // 클라이언트 유효성검사 추가
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value.trim();

    if (!email || email.length < 2) {
      e.preventDefault();
      toast.warning("이메일은 2글자 이상 입력해주세요.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      e.preventDefault();
      toast.warning("유효한 이메일을 입력해주세요.");
      return;
    }

    if (!password || password.length < 4) {
      e.preventDefault();
      toast.warning("비밀번호는 4글자 이상 입력해주세요.");
      return;
    }
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full gap-4 p-6 bg-white border shadow rounded-xl border-travel-gray400"
    >
      {/* 이메일 */}
      <div className="w-full">
        <Input size="md" id="email" name="email" placeholder="test@email.com" defaultValue="tripdiary@trip.diary" />
        <p className="mt-1 font-medium text-14 text-travel-fail100">
          {!userState?.ok && userState?.errors?.email?.msg}
        </p>
      </div>

      {/* 비밀번호 */}
      <div className="w-full">
        <Input size="md" id="password" name="password" type="password" placeholder="password" defaultValue="11111111" />
        <p className="mt-1 font-medium text-14 text-travel-fail100">
          {!userState?.ok && userState?.errors?.password?.msg}
        </p>
      </div>

      <Button className="w-full" size="lg" variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
}
