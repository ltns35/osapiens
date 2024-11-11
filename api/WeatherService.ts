interface WeatherService {
    getWeatherData(): Promise<WeatherDataResponse>;
}

interface WeatherDataResponse {
}
