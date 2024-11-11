import WeatherService, {WeatherDataResponse} from "@/api/WeatherService";

export class BetaWeatherService implements WeatherService {
    async getWeatherData(location: string): Promise<WeatherDataResponse> {
        throw new Error("Method not implemented.");
    }
}

export const betaWeatherService = new BetaWeatherService();

