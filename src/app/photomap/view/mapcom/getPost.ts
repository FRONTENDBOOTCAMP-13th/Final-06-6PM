"use server";

import {
  ApiRes,
  UserPhoto,
} from "@/app/photomap/view/mapcom/depth/koreaMapImg";

const API_URL =
  process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

/**
 * 사진 업로드 함수 (POST)
 * @param file    업로드할 이미지 파일 객체
 * @param userId  로그인한 유저 ID
 * @param regionId 업로드하는 지역 id (예: "seoul")
 * @param token   사용자 인증 토큰 (필요시)
 */
export async function uploadUserPhoto(
  file: File,
  userId: string,
  regionId: string,
  token?: string
): Promise<ApiRes<{ imageUrl: string }>> {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userId);
    formData.append("regionId", regionId);

    const headers: HeadersInit = {
      "Client-Id": CLIENT_ID,
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    // Content-Type 설정하지 않음: 브라우저가 자동 지정
    const res = await fetch(`${API_URL}/posts?type=map`, {
      method: "POST",
      headers, // Content-Type 없음!
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "이미지 업로드 실패");
    }
    return await res.json();
  } catch (error) {
    return {
      ok: 0,
      message:
        error instanceof Error
          ? error.message
          : "이미지 업로드에 실패했습니다.",
    };
  }
}

/**
 * 유저별 지역 사진 리스트 조회 함수 (GET)
 * @param userId  로그인된 사용자 ID
 * @param token   인증 토큰 (필요시)
 */
export async function fetchUserPhotos(
  userId: string,
  token?: string
): Promise<ApiRes<UserPhoto[]>> {
  try {
    const headers: HeadersInit = {
      "Client-Id": CLIENT_ID,
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(
      `${API_URL}/photomap/photos?userId=${encodeURIComponent(userId)}`,
      { method: "GET", headers }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "사진 조회 실패");
    }
    return await res.json();
  } catch (error) {
    return {
      ok: 0,
      message:
        error instanceof Error
          ? error.message
          : "사진을 불러오는 중 문제가 발생했습니다.",
    };
  }
}
