import { getWeatherData } from "@/data/functions/weather";
import { getCurrentLocationInfo } from "@/lib/api/location";
import { convertToGrid } from "@/lib/convertToGrid";

/**
 * 현재 위치를 기반으로 날씨 정보를 가져옵니다.
 * - GPS 또는 IP 기반 위치 획득
 * - 위도/경도를 기상청 격자 좌표로 변환
 * - 해당 위치의 날씨 데이터 조회
 *
 * @returns {Promise<{
 *   location: LocationInfo;
 *   weatherData: any;
 *   gridCoords: { nx: string; ny: string };
 * } | null>} 위치 및 날씨 데이터 객체 또는 실패 시 null
 */
export async function getCurrentLocationWeather() {
  try {
    // console.log("위치 정보 요청 시작");

    const location = await getCurrentLocationInfo();
    if (!location) {
      throw new Error("위치 정보를 가져올 수 없습니다");
    }
    // console.log("위치 정보 획득:", location);

    const gridCoords = convertToGrid(location.latitude, location.longitude);
    const { nx, ny } = gridCoords;
    // console.log("격자 좌표 변환:", { nx, ny });

    const weatherData = await getWeatherData(String(nx), String(ny));
    return {
      location,
      weatherData,
      gridCoords: { nx: String(nx), ny: String(ny) },
    };
  } catch (error) {
    console.error("위치 기반 날씨 데이터 오류:", error);
    return null;
  }
}
