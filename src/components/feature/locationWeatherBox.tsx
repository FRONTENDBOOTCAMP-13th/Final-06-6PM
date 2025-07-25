"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import ServerLocation from "@/components/feature/serverLocation";
import WeatherItem from "@/components/feature/weatherApi";
import { convertLatLngToGrid } from "@/lib/togrid";
import { getLocationData } from "@/lib/api/weather";

interface LocationInfo {
  region: string;
  city: string;
  latitude: number;
  longitude: number;
}

export default function LocationWeatherBox() {
  const [weatherData, setWeatherData] = useState<LocationInfo | null>(null);
  const [coords, setCoords] = useState<{ nx: string; ny: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLocationData();
      if (!data) return;

      setWeatherData(data);

      const { latitude, longitude } = data;
      const { nx, ny } = convertLatLngToGrid(latitude, longitude);
      setCoords({ nx: String(nx), ny: String(ny) });
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-center gap-1 text-16">
        <MapPin className="w-4 h-4 mr-1" />
        <ServerLocation
          region={weatherData?.region || ""}
          city={weatherData?.city ?? "위치 정보 없음"}
        />
      </div>
      <div className="absolute right-4 top-3">
        {coords ? (
          <WeatherItem nx={coords.nx} ny={coords.ny} />
        ) : (
          <span>날씨 정보 없음</span>
        )}
      </div>
    </>
  );
}
