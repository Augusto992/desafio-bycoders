export type Coordinates = {
  latitude: number,
  longitude: number,
  hourly: string,
  timezone: string
}

type WeatherData = {
  time: Date[],
  temperature2m: Float32Array
}

export type CardInfo = {
  coordinates: Coordinates,
  weatherData: WeatherData
}

export type InputError = {
  latitude: boolean,
  longitude: boolean,
}