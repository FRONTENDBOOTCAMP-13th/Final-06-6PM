/**
 * GPS 좌표를 기상청 격자 좌표로 변환하는 함수
 * (기상청 API는 위경도가 아닌 격자 좌표 시스템 사용)
 *
 * 기상청에서 제공하는 좌표 변환 공식 적용
 *
 * @param lat - 위도
 * @param lon - 경도
 * @returns 기상청 격자 좌표 {nx, ny}
 */
export function convertToGrid(lat: number, lon: number) {
  const RE = 6371.00877; // 지구 반경(km)
  const GRID = 5.0; // 격자 간격(km)
  const SLAT1 = 30.0; // 투영 위도1(degree)
  const SLAT2 = 60.0; // 투영 위도2(degree)
  const OLON = 126.0; // 기준점 경도(degree)
  const OLAT = 38.0; // 기준점 위도(degree)
  const XO = 43; // 기준점 X 좌표(GRID 기준)
  const YO = 136; // 기준점 Y 좌표(GRID 기준)
  const DEGRAD = Math.PI / 180.0; // 도(degree)를 라디안(radian)으로 변환 상수

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);

  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;

  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  let ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);
  let theta = lon * DEGRAD - olon;

  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;

  theta *= sn;

  return {
    nx: String(Math.floor(ra * Math.sin(theta) + XO + 0.5)),
    ny: String(Math.floor(ro - ra * Math.cos(theta) + YO + 0.5)),
  };
}
