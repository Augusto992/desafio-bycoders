import { fetchWeatherApi } from "openmeteo";
import { CardInfo, Coordinates } from "../types/general";

export const fetchWeatherData = async (coordinates:Coordinates) => {
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, coordinates);

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const hourly = response.hourly()!;

  const weatherData = {
    time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
      (t) => new Date((t + utcOffsetSeconds) * 1000)
    ),
    temperature2m: hourly.variables(0)!.valuesArray()!,
  };
  const cardInfo: CardInfo = {
    coordinates,
    weatherData
  }
  return cardInfo;
}