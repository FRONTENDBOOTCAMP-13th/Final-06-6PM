import { getUser } from "@/data/functions/user";
import { ApiRes } from "@/types/api";
import { User } from "@/types/user";
import useUserStore from "@/zustand/userStore";

const API_URL = process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

/**
 * 북마크 추가 함수
 * @param state - 이전 상태(사용하지 않음)
 * @param formData - 회원수정 폼 데이터(FormData 객체)
 * @param _id - 사용자 ID
 * @param token - 인증 토큰
 * @returns 회원수정 결과 응답 객체
 * @description 사용자 정보에 북마크 정보를 추가 수정한다.
 */
export async function bookmarkUser(_state: ApiRes<User> | null, formData: FormData): Promise<ApiRes<User>> {
  let res: Response;
  let data: ApiRes<User>;

  try {
    const _id = formData.get("userId") as string;
    const token = formData.get("userToken") as string;
    const placeTitle = formData.get("placeTitle") as string;
    const placeContentId = formData.get("placeContentId") as string;
    const placeContentType = formData.get("placeContentTypeId") as string;
    const placeDesc = formData.get("placeDesc") as string;
    const placeImgUrl = formData.get("placeImgUrl") as string;
    const placeLocation = formData.get("placeLocation") as string;

    const newPlace = {
      contentId: placeContentId,
      contentType: placeContentType,
      title: placeTitle,
      desc: placeDesc,
      imgUrl: placeImgUrl,
      location: placeLocation,
    };

    const userInfo = useUserStore.getState().userInfo;
    const prevBookmark = userInfo?.extra?.bookmarkPlace ?? [];

    // 새 북마크 추가
    const updateBookmark = [...prevBookmark, newPlace];

    const body = {
      extra: {
        ...userInfo?.extra,
        bookmarkPlace: updateBookmark,
      },
    };

    // 회원수정 API 호출
    const res = await fetch(`${API_URL}/users/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
    // console.log(data);

    if (!res.ok) {
      return {
        ok: 0,
        message: "북마크 추가에 실패하였습니다.",
      };
    }
  } catch (error) {
    console.error("북마크 추가에 실패하였습니다", error);
    return {
      ok: 0,
      message: "일시적인 네트워크 문제가 발생했습니다.",
    };
  }
  return data;
}

/**
 * 북마크 삭제 함수
 * @param state - 이전 상태(사용하지 않음)
 * @param formData - 북마크 삭제 폼 데이터(FormData 객체)
 * @returns 북마크 삭제 결과 응답 객체
 * @description 사용자 정보에서 특정 contentId의 북마크를 삭제한다.
 */
export async function bookmarkDeleteUser(_state: ApiRes<User> | null, formData: FormData): Promise<ApiRes<User>> {
  let res: Response;
  let data: ApiRes<User>;

  try {
    const _id = formData.get("userId") as string;
    const token = formData.get("userToken") as string;
    const placeContentId = formData.get("placeContentId") as string;

    // 유효성 검사
    if (!_id || !token || !placeContentId) {
      return {
        ok: 0,
        message: "필수 정보가 누락되었습니다.",
      };
    }

    const userInfo = useUserStore.getState().userInfo;
    const prevBookmark = userInfo?.extra?.bookmarkPlace ?? [];

    // contentId가 일치하는 북마크를 제외 새 배열 생성
    const updatedBookmark = prevBookmark.filter((bookmark) => bookmark.contentId !== placeContentId);

    // 삭제할 북마크가 없는 경우
    if (prevBookmark.length === updatedBookmark.length) {
      return {
        ok: 0,
        message: "삭제할 북마크를 찾을 수 없습니다.",
      };
    }

    const body = {
      extra: {
        ...userInfo?.extra,
        bookmarkPlace: updatedBookmark,
      },
    };

    // 회원수정 API 호출
    res = await fetch(`${API_URL}/users/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();

    if (!res.ok) {
      return {
        ok: 0,
        message: "북마크 삭제에 실패하였습니다.",
      };
    }
  } catch (error) {
    console.error("북마크 삭제에 실패하였습니다", error);
    return {
      ok: 0,
      message: "일시적인 네트워크 문제가 발생했습니다.",
    };
  }

  return data;
}
