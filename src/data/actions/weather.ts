"use server";
import { fetchWeather } from "@/data/functions/fetchWeather";

export async function getWeatherData(nx: string, ny: string) {
  return await fetchWeather(nx, ny);
}
