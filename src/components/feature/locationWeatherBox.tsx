"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Loader2, MapPin } from "lucide-react";
import { LocationInfo, WeatherItem } from "@/types/weather";
import ServerLocation from "@/components/feature/serverLocation";
import WeatherItemComponent from "@/components/feature/weatherApi";
import { getCurrentLocationWeather } from "@/lib/api/weather";

type FullWeatherData = {
  location: LocationInfo;
  weatherData: WeatherItem[];
  gridCoords: { nx: string; ny: string };
};

export default function LocationWeatherBox() {
  const [weatherData, setWeatherData] = useState<FullWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getCurrentLocationWeather();
        if (data) {
          // console.log("위치:", data.location.city);
          // console.log("날씨:", data.weatherData);
          setWeatherData(data);
        } else {
          setError("위치 정보를 가져올 수 없습니다");
        }
      } catch (err) {
        console.error("날씨 데이터 로딩 오류:", err);
        setError("데이터 로딩 중 오류가 발생했습니다");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  // 로딩 중일 때
  if (loading) {
    return (
      <>
        <div className="flex items-center gap-2 text-16">
          <Loader2 className="size-4 animate-spin text-white ml-1" />
          <span>위치 확인 중</span>
        </div>
        <div className="absolute right-4 top-3 flex items-center gap-2">
          <Loader2 className="size-4 animate-spin text-white" />
          <span>날씨 로딩 중</span>
        </div>
      </>
    );
  }

  // 에러가 있을 때
  if (error) {
    return (
      <>
        <div className="flex items-center gap-1">
          <AlertTriangle className="size-4 text-white90" />
          <span className="text-white/90">{error}</span>
        </div>
        <div className="absolute right-4 top-3 flex items-center gap-1">
          <AlertTriangle className="size-4 text-white90" />
          <span className="text-white90">날씨 정보 없음</span>
        </div>
      </>
    );
  }

  // 데이터가 있을 때
  return (
    <>
      <div className="flex items-center gap-1">
        <MapPin className="size-4" />
        <ServerLocation
          region={weatherData?.location.region || ""}
          city={weatherData?.location.city ?? "위치 정보 없음"}
        />
      </div>
      <div className="absolute right-4 top-3">
        {weatherData?.gridCoords ? (
          <WeatherItemComponent nx={weatherData.gridCoords.nx} ny={weatherData.gridCoords.ny} />
        ) : (
          <span>날씨 정보 없음</span>
        )}
      </div>
    </>
  );
}
