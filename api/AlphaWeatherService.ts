import WeatherService, {WeatherDataResponse} from "@/api/WeatherService";

export class AlphaWeatherService implements WeatherService {
    async getWeatherData(location: string): Promise<WeatherDataResponse> {
        throw new Error("Method not implemented.");
    }
}

export const alphaWeatherService = new AlphaWeatherService();
