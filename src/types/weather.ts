export interface WeatherItem {
  baseDate: string; // 발표 기준 날짜 (예: "20230721")
  baseTime: string; // 발표 기준 시각 (예: "1400")
  category: string; // 예보 항목 코드 (예: "TMP" - 기온)
  fcstDate: string; // 예보 날짜 (예: "20230721")
  fcstTime: string; // 예보 시각 (예: "1500")
  fcstValue: string; // 예보 값 (예: 온도, 강수량 등 수치)
  nx: number; // 격자 X 좌표
  ny: number; // 격자 Y 좌표
}
