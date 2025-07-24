"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import ServerLocation from "@/components/feature/serverLocation";
import WeatherItem from "@/components/feature/weatherApi";
import { convertLatLngToGrid } from "@/lib/togrid";
import { getLocationData } from "@/data/functions/weather";

export default function LocationWeatherBox() {
  const [location, setLocation] = useState("위치 정보 없음");
  const [coords, setCoords] = useState<{ nx: string; ny: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLocationData();

      console.log("하이", data);

      if (!data) {
        setLocation("위치 정보 없음");
        return;
      }

      const { region, city, latitude, longitude } = data;
      setLocation(region && city ? `${region} ${city}` : "위치 정보 없음");

      const { nx, ny } = convertLatLngToGrid(latitude, longitude);
      setCoords({ nx: String(nx), ny: String(ny) });
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-center gap-1 text-16">
        <MapPin className="w-4 h-4 mr-1" />
        <ServerLocation location={location} />
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
