import { useEffect, useState } from "react";
import { fetchWeather } from "@/lib/api/weather";

export function useWeather() {
  const [weather, setWeather] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather()
      .then(setWeather)
      .catch((e) => {
        console.error("[날씨 오류]", e); // 반드시 추가!
        setError(e.message || "날씨 정보 에러");
      })
      .finally(() => setLoading(false));
  }, []);

  return { weather, loading, error };
}
