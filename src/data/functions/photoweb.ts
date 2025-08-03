"use server";
const API_URL = process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const client_id = "febc13-final06-emjf";
import { UserPhoto, ApiMsgRes } from "@/types/api";
/**
 * 사용자 사진 업로드 함수 (회원정보 수정 방식)
 * @param file 이미지 파일
 * @param regionId 지역 ID (예: seoul)
 * @param token 인증 토큰
 * @param userId 사용자 ID
 */
export async function uploadUserPhoto(
  file: File,
  regionId: string,
  token: string,
  userId: number,
): Promise<ApiMsgRes<{ imageUrl: string }>> {
  // 서버에 파일 업로드
  const formData = new FormData();
  formData.append("attach", file);

  const fileRes = await fetch(`${API_URL}/files`, {
    method: "POST",
    headers: {
      "client-id": client_id,
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!fileRes.ok) {
    throw new Error(`파일 업로드 실패: ${fileRes.status}`);
  }

  const fileResult = await fileRes.json();
  const imagePath = fileResult.item?.[0]?.path || fileResult.path;
  if (!imagePath) {
    throw new Error("파일 경로를 받을 수 없습니다.");
  }

  // 회원정보 조회(get방식)
  const getUserRes = await fetch(`${API_URL}/users/${userId}`, {
    method: "GET",
    headers: {
      "client-id": client_id,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!getUserRes.ok) {
    throw new Error(`회원정보 조회 실패: ${getUserRes.status}`);
  }

  const userResult = await getUserRes.json();
  const currentExtra = userResult.item?.extra || {};

  // 회원 정보 수정(extra에 지역별 이미지 경로 저장)
  const updatedExtra = {
    ...currentExtra,
    [regionId]: imagePath,
  };
  // 새로고침시 받아오기
  const updateRes = await fetch(`${API_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "client-id": client_id,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      extra: updatedExtra,
    }),
  });

  if (!updateRes.ok) {
    const errorText = await updateRes.text();
    throw new Error(`회원정보 수정 실패: ${updateRes.status}`);
  }

  return {
    ok: 1,
    data: {
      imageUrl: imagePath,
    },
  };
}

/**
 * 사용자 포토맵 조회 함수 (회원정보 조회)
 * @param token 인증 토큰
 * @param userId 사용자 ID
 */
export async function fetchUserPhotos(token: string, userId: number): Promise<ApiMsgRes<UserPhoto[]>> {
  const res = await fetch(`${API_URL}/users/${userId}/extra`, {
    method: "GET",
    headers: {
      "client-id": client_id,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "포토맵 조회 실패");
  }

  const result = await res.json();

  if (result.ok && result.item?.extra) {
    const extra = result.item.extra;
    const userPhotos: UserPhoto[] = [];

    Object.keys(extra).forEach((regionId) => {
      if (extra[regionId]) {
        userPhotos.push({
          regionId,
          imageUrl: extra[regionId],
        });
      }
    });

    return {
      ok: 1,
      data: userPhotos,
    };
  }

  // 사진이 없으면 빈 배열 반환
  return {
    ok: 1,
    data: [],
  };
}
