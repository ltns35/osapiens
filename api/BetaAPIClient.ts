import {mockGetCitiesByNameResponse, mockGetWeatherDataResponse} from "@/api/BetaAPIClientMockData";

export class BetaAPIClient {
	async getCitiesByName(params: BetaGetCitiesByNameParams): Promise<BetaGetCitiesByNameResponse[]> {
		return mockGetCitiesByNameResponse
	}

	async getWeatherData(params: BetaGetWeatherDataParams): Promise<BetaGetWeatherDataResponse[]> {
		return mockGetWeatherDataResponse
	}
}

export interface BetaGetCitiesByNameParams {
	name: string;
}

export interface BetaGetCitiesByNameResponse {
	id: string
	name: string
}

export interface BetaGetWeatherDataParams {
	location: string;
}

export interface BetaGetWeatherDataResponse {
	value: string;
	date: string;
}

export const betaAPIClient = new BetaAPIClient();
