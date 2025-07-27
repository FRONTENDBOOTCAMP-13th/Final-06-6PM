export async function getLocationData() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    console.log("data", data);

    if (!data || !data.latitude || !data.longitude) {
      throw new Error("위치 정보 없음");
    }

    return {
      region: data.region || "",
      city: data.city || "",
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch (err) {
    console.error("서버 액션 위치 오류:", err);
    return null;
  }
}
