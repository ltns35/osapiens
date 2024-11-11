export default class WeatherService {
    async getWeatherData(location: string): Promise<WeatherDataResponse> {
        throw new Error('Method not implemented.');
    }
}

export const defaultWeatherService = new WeatherService();

export interface WeatherDataResponse {
}
