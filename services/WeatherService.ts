export default class WeatherService {
	async getCitiesByName(params: WeatherGetCitiesByNameParams): Promise<WeatherGetCitiesByNameModel> {
		throw new Error('Method not implemented.');
	}

	async getWeatherData(params: WeatherDataParams): Promise<WeatherGetWeatherDataModel> {
		throw new Error('Method not implemented.');
	}
}

export const defaultWeatherService = new WeatherService();

export interface WeatherGetCitiesByNameParams {
	name: string;
}

export interface WeatherGetCitiesByNameModel {
	cities: {
		id: string;
		name: string;
	}[]
}

export interface WeatherDataParams {
	location: string;
}

export interface WeatherGetWeatherDataModel {
	data: {
		id: string
		date: string;
		weather: string;
		rainProbability: number;
	}[]
}
