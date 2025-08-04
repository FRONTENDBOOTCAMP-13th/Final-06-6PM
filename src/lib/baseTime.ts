/**
 * 기상청 단기예보 발표 시각 배열
 * 발표 시각은 3시간 단위로 02, 05, 08, 11, 14, 17, 20, 23시
 */

/**
 * 현재 시각을 기준으로 가장 최근의 기상청 발표 시각을 구하는 함수
 *
 * @returns {string} 발표 시각 (HHmm 형식, 예: "1400")
 * @example
 * // 현재 시간이 15시일 때
 * baseTime(); // "1400" 반환
 */
const ANNOUNCE_HOURS = [2, 5, 8, 11, 14, 17, 20, 23];

export function baseTime(): string {
  const now = new Date();
  const hour = now.getHours();

  let selected = ANNOUNCE_HOURS[0];
  for (const h of ANNOUNCE_HOURS) {
    if (hour >= h) selected = h;
    else break;
  }

  return String(selected).padStart(2, "0") + "00";
}

/**
 * baseTime 기준으로 baseDate를 결정하는 함수
 * - 현재 시간이 baseTime보다 빠르면 전날 날짜 반환
 *
 * @param baseTime - baseTime() 결과 (예: "0200")
 * @returns 보정된 baseDate (예: "20250803")
 */
export function baseDate(baseTime: string): string {
  const now = new Date();
  const baseHour = parseInt(baseTime.slice(0, 2), 10);

  if (now.getHours() < baseHour) {
    now.setDate(now.getDate() - 1);
  }

  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");

  return `${yyyy}${mm}${dd}`;
}
