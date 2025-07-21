// src/utils/getTodayString.ts
export function getTodayString() {
  const date = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 (${week[date.getDay()]})`;
}
