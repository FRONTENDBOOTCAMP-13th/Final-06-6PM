import { LocationInfo } from "@/types/weather";

const API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY || "";

/**
 * 현재 사용자의 GPS 위치 정보를 가져와 행정 구역 정보로 변환합니다.
 * 위치 권한이 거부되면 IP 기반으로 fallback됩니다.
 *
 * @returns {Promise<LocationInfo | null>} 위치 정보 객체 또는 실패 시 null
 */
export async function getCurrentLocationInfo(): Promise<LocationInfo | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.error("Geolocation 지원되지 않음");
      resolve(null);
      return;
    }

    // 현재 위치 요청
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // OpenStreetMap Nominatim API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ko`,
          );

          if (!response.ok) {
            throw new Error(`HTTP 오류: ${response.status}`);
          }

          const data = await response.json();
          // console.log("OpenStreetMap Nominatim API:", data);

          const address = data.address || {};

          const region = address.state || address.province || "";
          const city = address.city || address.county || address.town || "";
          const district = address.suburb || address.neighbourhood || "";

          resolve({
            region,
            city: city || "알 수 없는 지역",
            district,
            fullAddress: data.display_name || "",
            latitude,
            longitude,
          });
        } catch (error) {
          console.error("주소 변환 오류:", error);
          resolve({
            region: "",
            city: `위치 (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
            district: "",
            fullAddress: `위도: ${latitude}, 경도: ${longitude}`,
            latitude,
            longitude,
          });
        }
      },
      (error) => {
        console.error("위치 권한 오류:", error.message);

        // 권한 거부 시 IP 기반으로 대체
        fetchIPLocation()
          .then(resolve)
          .catch(() => resolve(null));
      },
      {
        enableHighAccuracy: true,
        timeout: 1000 * 10, // 10초 타임아웃
        maximumAge: 1000 * 30,
      },
    );
  });
}

/**
 * IP 주소를 기반으로 대략적인 위치 정보를 가져옵니다.
 *
 * @returns {Promise<LocationInfo | null>} 위치 정보 객체 또는 실패 시 null
 */
async function fetchIPLocation(): Promise<LocationInfo | null> {
  try {
    // console.log("IP 기반 위치 정보 요청");

    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    console.log("IP 기반 위치 응답:", data);

    if (!data || !data.latitude || !data.longitude) {
      throw new Error("IP 기반 위치 정보 없음");
    }

    return {
      region: data.region || "",
      city: data.city || "",
      district: "",
      fullAddress: `${data.country_name} ${data.region} ${data.city}`,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch (error) {
    console.error("IP 기반 위치 정보 오류:", error);
    return null;
  }
}

/**
 * GPS 좌표(위도, 경도)를 한국어 주소 정보로 변환하는 함수
 * Google Maps Geocoding API의 역지오코딩 기능을 사용
 *
 * @param latitude - 위도 (예: 37.5665)
 * @param longitude - 경도 (예: 126.9780)
 * @param API_KEY - Google Maps API 키
 * @returns 위치 정보 객체 또는 null (실패 시)
 *
 * 반환 객체 구조:
 * - region: 시/도 (예: "서울특별시")
 * - city: 시/군/구 (예: "강남구")
 * - district: 동/면/읍 (예: "역삼동")
 * - latitude: 위도
 * - longitude: 경도
 */
export async function getLocationFromCoords(
  latitude: number,
  longitude: number,
  API_KEY: string,
): Promise<LocationInfo | null> {
  try {
    const res = await fetch(`${API_URL}?latlng=${latitude},${longitude}&key=${API_KEY}&language=ko`);
    const data = await res.json();

    // API 응답 상태 확인
    if (data.status !== "OK" || !data.results.length) {
      throw new Error("위치 정보를 찾을 수 없습니다");
    }

    // 첫 번째 결과에서 주소 구성요소 추출
    const result = data.results[0];
    const address_component = result.address_components;

    // 한국 주소 체계에 맞는 정보 추출
    let region = ""; // 시/도(administrative_area_level_1)
    let city = ""; // 시/군/구(administrative_area_level_2)
    let district = ""; // 동/면/읍(administrative_area_level_3)

    // 각 주소 구성요소를 순회하며 필요한 정보 추출
    for (const component of address_component) {
      const types = component.types;

      if (types.includes("administrative_area_level_1")) {
        region = component.long_name;
      }
      if (types.includes("administrative_area_level_2")) {
        city = component.long_name;
      }
      if (types.includes("administrative_area_level_3") || types.includes("sublocality_level_1")) {
        district = component.long_name;
      }
    }

    return {
      region,
      city,
      district,
      latitude,
      longitude,
    };
  } catch (error) {
    console.error("위치 정보 오류:", error);
    return null;
  }
}
