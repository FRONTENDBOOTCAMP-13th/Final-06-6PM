"use server";

const API_URL =
  process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

/**
 * 전체 회원 목록 조회
 * @returns 회원 목록 응답 객체
 * @description
 * API 서버에서 전체 회원 목록을 조회합니다.
 */
export async function getUserList() {
  try {
    const res = await fetch(`${API_URL}/users/`, {
      headers: {
        "Client-Id": CLIENT_ID,
      },
      cache: "force-cache",
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
      cache: "force-cache",
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
