/**
 * 오늘 날짜를 YYYYMMDD 형식의 문자열로 반환하는 함수
 *
 * @returns {string} 오늘 날짜 (예: "20250722")
 *
 * @example
 * todayDate(); // "20250722" (현재 날짜 기준)
 */
export function todayDate(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}
