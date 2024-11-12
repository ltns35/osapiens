import {mockGetCitiesByNameResponse, mockGetWeatherDataResponse} from "@/api/AlphaAPIClientMockData";
import {sleep} from "@/utils/sleep";

export class AlphaAPIClient {
	async getCitiesByName(params: AlphaGetCitiesByNameParams): Promise<AlphaGetCitiesByNameResponse> {
		await sleep(2)
		return mockGetCitiesByNameResponse
	}

	async getWeatherData(params: AlphaGetWeatherDataParams): Promise<AlphaGetWeatherDataResponse> {
		await sleep(2)
		return mockGetWeatherDataResponse
	}
}

export interface AlphaGetCitiesByNameParams {
	name: string;
}

export interface AlphaGetCitiesByNameResponse {
	data: {
		id: string
		name: string
	}[];
}

export interface AlphaGetWeatherDataParams {
	location: string;
}

export interface AlphaGetWeatherDataResponse {
	data: {
		id: string;
		date: string;
		weather: string;
		rainProbability: number;
	}[]
}

export const alphaAPIClient = new AlphaAPIClient();
