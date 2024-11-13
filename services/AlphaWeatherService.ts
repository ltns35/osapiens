import WeatherService, {
	WeatherGetCitiesByNameModel,
	WeatherGetCitiesByNameParams,
	WeatherGetWeatherDataModel,
	WeatherDataParams
} from "@/services/WeatherService";
import {AlphaAPIClient, alphaAPIClient, AlphaGetCitiesByNameResponse, AlphaGetWeatherDataResponse} from "@/api/AlphaAPIClient";

export class AlphaWeatherService implements WeatherService {
	constructor(private client: AlphaAPIClient = alphaAPIClient) {
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
				location: params.location,
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

export const alphaWeatherService = new AlphaWeatherService();

// Mappers for API responses

function mapCitiesResponse(response: AlphaGetCitiesByNameResponse): WeatherGetCitiesByNameModel {
	return {
		cities: response.data
	}
}

function mapWeatherResponse(response: AlphaGetWeatherDataResponse): WeatherGetWeatherDataModel {
	return {
		data: response.data,
	};
}
