"use server";

import { ApiRes, ApiResPromise } from "@/types/api";
import { User } from "@/types/user";

const API_URL =
  process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

/**
 * 로그인 함수
 * @param state - 이전 상태(사용하지 않음)
 * @param formData - 로그인 폼 데이터(FormData 객체)
 * @returns 로그인 결과 응답 객체
 * @description
 * 이메일/비밀번호로 로그인 API를 호출합니다.
 */
export async function login(
  state: ApiRes<User> | null,
  formData: FormData
): ApiResPromise<User> {
  const body = Object.fromEntries(formData.entries());

  let res: Response;
  let data: ApiRes<User>;

  try {
    // 로그인 API 호출
    res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: "일시적인 네트워크 문제가 발생했습니다." };
  }

  return data;
}
