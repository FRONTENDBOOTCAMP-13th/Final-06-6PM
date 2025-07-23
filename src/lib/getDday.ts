/**
 * 주어진 날짜(date)까지 남은 날짜(D-day)를 계산하여 정수로 반환
 *
 * @param date - 기준 날짜
 * @returns 오늘 기준으로 며칠 남았는지를 나타내는 정수 (예: D-3 → 3, D-day → 0, D+1 → -1)
 *
 * - 결과는 오늘을 기준으로 `date`까지의 일(day) 차이
 * - 날짜 비교는 시간 영향을 제거하기 위해 UTC 기준으로 수행
 */

export function getDday(date: string): number {
  const today = new Date();
  const travelDay = new Date(date);

  // 날짜를 UTC 기준으로 변환하여 시차 영향 제거
  const todayUTC = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const travelUTC = Date.UTC(
    travelDay.getFullYear(),
    travelDay.getMonth(),
    travelDay.getDate()
  );

  // ms 단위 차이를 day 단위로 환산
  const dday = (travelUTC - todayUTC) / (1000 * 60 * 60 * 24);
  return dday;
}
