"use server";
import { fetchWeather } from "@/data/functions/weatherWeather";

export async function getWeatherData() {
  return await fetchWeather();
}
