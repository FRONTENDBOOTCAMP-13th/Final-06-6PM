"use server";

const API_URL = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = "febc13-final06-emjf";

// 북마크 추가
export async function addBookmark(reviewId: number, token: string) {
  const body = {
    target_id: reviewId, // 게시글 아이디값
    memo: "",
    extra: {},
  };
  try {
    const response = await fetch(`${API_URL}/bookmarks/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "client-id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    console.error("북마크 추가 실패:", error);
    throw error;
  }
}

// 북마크 목록 조회
export async function getBookmarks(token: string) {
  try {
    const response = await fetch(`${API_URL}/bookmarks/post`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "client-id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("북마크 조회 실패:", error);
    throw error;
  }
}

// 북마크 삭제
export async function deleteBookmark(bookmarkId: number, token: string) {
  try {
    const response = await fetch(`${API_URL}/bookmarks/${bookmarkId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "client-id": CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("북마크 삭제 실패:", error);
    throw error;
  }
}
