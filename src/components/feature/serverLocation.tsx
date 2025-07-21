import axios from "axios";

export default async function ServerLocation() {
  let region = "위치 정보 없음";
  let city = "";
  try {
    const res = await axios.get("https://ipapi.co/json/");
    region = res.data.region || "위치 정보 없음";
    city = res.data.city || "";
  } catch {
    region = "위치 정보 없음";
  }

  return (
    <span>
      {region} {city}
    </span>
  );
}
