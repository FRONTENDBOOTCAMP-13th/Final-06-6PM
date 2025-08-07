/**
 * 오늘 날짜를 "YYYY년 M월 D일 (요일)" 형식의 문자열로 반환하는 함수
 *
 * @returns {string} 예: "2025년 7월 22일 (화)"
 *
 * @example
 * todayString(); // "2025년 7월 22일 (화)" (현재 날짜 기준)
 */
export function todayString(): string {
  const date = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 (${week[date.getDay()]})`;
}
