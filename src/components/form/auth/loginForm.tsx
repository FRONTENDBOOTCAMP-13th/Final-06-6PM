"use client";

import React, { useActionState, useEffect } from "react";
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
      });
      toast.success("로그인이 완료되었습니다.");
      router.replace("/home");
    } else if (!userState?.errors && userState?.message) {
      toast.error(userState.message);
    }
  }, [userState]);

  return (
    <form
      action={formAction}
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
