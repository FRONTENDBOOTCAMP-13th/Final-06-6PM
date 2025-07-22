// 기상청 단기예보 발표 시각: 02, 05, 08, 11, 14, 17, 20, 23시 3시간 단위
const ANNOUNCE_HOURS = [2, 5, 8, 11, 14, 17, 20, 23];

export function baseTime() {
  const now = new Date();
  const hour = now.getHours();

  let selected = ANNOUNCE_HOURS[0];
  for (const h of ANNOUNCE_HOURS) {
    if (hour >= h) selected = h;
    else break;
  }

  return String(selected).padStart(2, "0") + "00";
}
