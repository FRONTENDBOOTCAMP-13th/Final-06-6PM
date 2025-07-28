"use server";

const API_URL =
  process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";

export interface ApiRes<T> {
  ok: number;
  data?: T;
  message?: string;
}

export interface UserPhoto {
  regionId: string;
  imageUrl: string;
}

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
  userId: number
): Promise<ApiRes<{ imageUrl: string }>> {
  console.log("1단계: 파일 업로드 시작", { fileName: file.name, regionId });

  // 1단계: 파일 업로드
  const formData = new FormData();
  formData.append("attach", file);

  const fileRes = await fetch(`${API_URL}/files`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!fileRes.ok) {
    const errorText = await fileRes.text();
    console.error("파일 업로드 실패:", errorText);
    throw new Error(`파일 업로드 실패: ${fileRes.status}`);
  }

  const fileResult = await fileRes.json();
  console.log("파일 업로드 결과:", fileResult);

  const imagePath = fileResult.item?.path || fileResult.path;
  if (!imagePath) {
    throw new Error("파일 경로를 받을 수 없습니다.");
  }

  console.log("2단계: 회원정보 조회 시작");

  // 2단계: 현재 회원정보 조회
  const getUserRes = await fetch(`${API_URL}/users/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!getUserRes.ok) {
    const errorText = await getUserRes.text();
    throw new Error(`회원정보 조회 실패: ${getUserRes.status}`);
  }

  const userResult = await getUserRes.json();
  console.log("회원정보 조회 결과:", userResult);

  const currentExtra = userResult.item?.extra || {};

  console.log("3단계: 회원정보 수정 시작");

  // 3단계: 회원정보 수정 (extra에 지역별 이미지 경로 저장)
  const updatedExtra = {
    ...currentExtra,
    [regionId]: imagePath,
  };

  const updateRes = await fetch(`${API_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
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

  const finalResult = await updateRes.json();
  console.log("회원정보 수정 완료:", finalResult);

  const result: ApiRes<{ imageUrl: string }> = {
    ok: 1,
    data: {
      imageUrl: imagePath,
    },
  };

  return result;
}

/**
 * 사용자 포토맵 조회 함수 (회원정보 조회)
 * @param token 인증 토큰
 * @param userId 사용자 ID
 */
export async function fetchUserPhotos(
  token: string,
  userId: number
): Promise<ApiRes<UserPhoto[]>> {
  console.log("사용자 포토맵 조회 시작");

  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("회원정보 조회 실패:", errorText);
    throw new Error(errorText || "포토맵 조회 실패");
  }

  const result = await res.json();
  console.log("회원정보 조회 결과:", result);

  if (result.ok && result.item?.extra) {
    const extra = result.item.extra;
    const userPhotos: UserPhoto[] = [];

    // extra 객체의 각 지역에 대해 이미지가 있으면 배열에 추가
    Object.keys(extra).forEach((regionId) => {
      if (extra[regionId]) {
        userPhotos.push({
          regionId,
          imageUrl: extra[regionId],
        });
      }
    });

    const resultData: ApiRes<UserPhoto[]> = {
      ok: 1,
      data: userPhotos,
    };

    return resultData;
  }

  // extra가 없으면 빈 배열 반환
  const emptyResult: ApiRes<UserPhoto[]> = {
    ok: 1,
    data: [],
  };

  return emptyResult;
}
