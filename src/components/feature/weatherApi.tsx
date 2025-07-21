import { getWeatherData } from "@/data/actions/weather";
import { WeatherItem as WeatherItemType } from "@/types/weather";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
} from "lucide-react";

function WeatherIcon({ sky, pty }: { sky: string; pty: string }) {
  if (pty === "1" || pty === "4")
    return <CloudRain className="inline w-5 h-5 mr-1" />;
  if (pty === "2") return <CloudLightning className="inline w-5 h-5 mr-1" />;
  if (pty === "3") return <Snowflake className="inline w-5 h-5 mr-1" />;
  if (sky === "1") return <Sun className="inline w-5 h-5 mr-1" />;
  if (sky === "3") return <CloudSun className="inline w-5 h-5 mr-1" />;
  if (sky === "4") return <Cloud className="inline w-5 h-5 mr-1" />;
  return <Sun className="inline w-5 h-5 mr-1" />;
}

// 한글 텍스트 변환
function skyText(sky: string, pty: string) {
  if (pty === "1" || pty === "4") return "비";
  if (pty === "2") return "비/눈";
  if (pty === "3") return "눈";
  if (sky === "1") return "맑음";
  if (sky === "3") return "구름 많음";
  if (sky === "4") return "흐림";
  return "-";
}

// 메인 컴포넌트
export default async function WeatherItem() {
  let weather: WeatherItemType[] = [];
  try {
    weather = await getWeatherData();
  } catch {
    return null;
  }
  const tmp = weather.find((w) => w.category === "TMP");
  const sky = weather.find((w) => w.category === "SKY");
  const pty = weather.find((w) => w.category === "PTY");

  if (!tmp || !sky || !pty) return null;

  return (
    <div className="flex items-center gap-1 text-travel-text100 text-base">
      <WeatherIcon sky={sky.fcstValue} pty={pty.fcstValue} />
      <span>{skyText(sky.fcstValue, pty.fcstValue)}</span>
      <span>{tmp.fcstValue}℃</span>
    </div>
  );
}
