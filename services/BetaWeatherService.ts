import {BetaAPIClient, betaAPIClient, BetaGetCitiesByNameResponse, BetaGetWeatherDataResponse} from "@/api/BetaAPIClient";
import WeatherService, {
	WeatherDataParams,
	WeatherGetCitiesByNameModel,
	WeatherGetCitiesByNameParams,
	WeatherGetWeatherDataModel
} from "@/services/WeatherService";

export class BetaWeatherService implements WeatherService {
	constructor(private client: BetaAPIClient = betaAPIClient) {
		this.client = client;
	}

	async getCitiesByName(params: WeatherGetCitiesByNameParams): Promise<WeatherGetCitiesByNameModel> {
		try {
			const response = await this.client.getCitiesByName({
				name: params.name,
			});
			return mapCitiesResponse(response);
		} catch (err) {
			if (err instanceof Error) {
				throw new Error(`Failed fetching cities: ${err.message}`);
			}
			throw new Error(`Failed fetching cities with an unknown error: ${err}`);
		}
	}

	async getWeatherData(params: WeatherDataParams): Promise<WeatherGetWeatherDataModel> {
		try {
			const response = await this.client.getWeatherData({
				location: params.location
			});
			return mapWeatherResponse(response);
		} catch (err) {
			if (err instanceof Error) {
				throw new Error(`Failed fetching weather data for ${params.location}`);
			}
			throw new Error(`Failed fetching weather data with an unknown error: ${err}`);
		}
	}
}

export const betaWeatherService = new BetaWeatherService();

// Mappers for API responses

function mapCitiesResponse(response: BetaGetCitiesByNameResponse[]): WeatherGetCitiesByNameModel {
	const cities = response.map((city) => ({
		id: city.id,
		name: city.name,
	}));

	return {
		cities: cities,
	};
}

function mapWeatherResponse(response: BetaGetWeatherDataResponse[]): WeatherGetWeatherDataModel {
	const weatherData = response.map((weather, index) => ({
		id: (index + 1).toString(),
		date: weather.date,
		weather: weather.value,
		rainProbability: 0,
	}));

	return {
		data: weatherData,
	};
}
