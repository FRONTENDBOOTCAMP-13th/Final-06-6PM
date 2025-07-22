"use server";

import { uploadFile } from "@/data/actions/file";
import { ApiRes, ApiResPromise } from "@/types/api";
import { User } from "@/types/user";

const API_URL =
  process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

/**
 * 회원가입 함수
 * @param state - 이전 상태(사용하지 않음)
 * @param formData - 회원가입 폼 데이터(FormData 객체)
 * @returns 회원가입 결과 응답 객체
 * @description
 * 첨부파일(프로필 이미지)이 있으면 파일 업로드 후, 회원가입 API를 호출합니다.
 */
export async function createUser(
  state: ApiRes<User> | null,
  formData: FormData
): ApiResPromise<User> {
  let res: Response;
  let data: ApiRes<User>;

  try {
    // 첨부파일(프로필 이미지) 처리
    const attach = formData.get("attach") as File;
    let image;
    if (attach.size > 0) {
      // 파일 업로드 API 호출
      const fileRes = await uploadFile(formData);
      console.log(`fileRes`, fileRes);
      if (fileRes.ok) {
        image = fileRes.item[0].path;
      } else {
        return fileRes;
      }
    }

    // 회원가입 요청 바디 생성
    const body = {
      type: formData.get("type") || "user",
      name: formData.get("name"),
      email: formData.get("email"),
      desc: formData.get("desc"),
      password: formData.get("password"),
      ...(image ? { image } : {}),
    };

    console.log(`body`, body);

    // 회원가입 API 호출
    res = await fetch(`${API_URL}/users`, {
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

/**
 * 전체 회원 목록 조회
 * @returns 회원 목록 응답 객체
 * @description
 * API 서버에서 전체 회원 목록을 조회합니다.
 */
export async function getUsers() {
  try {
    const res = await fetch(`${API_URL}/users/}`, {
      headers: {
        "Client-Id": CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return {
      ok: 0,
      message: "일시적인 네트워크 문제로 회원 정보를 불러오는데 실패했습니다.",
    };
  }
}

/**
 * ID로 회원 검색
 * @param _id - 회원 ID
 * @returns 회원 정보 응답 객체
 * @description
 * API 서버에서 특정 회원 정보를 ID로 조회합니다.
 */
export async function getUser(_id: number) {
  try {
    const res = await fetch(`${API_URL}/users/${_id}`, {
      headers: {
        "Client-Id": CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return {
      ok: 0,
      message: "일시적인 네트워크 문제로 회원 정보를 불러오는데 실패했습니다.",
    };
  }
}
