import {mockGetCitiesByNameResponse, mockGetWeatherDataResponse} from "@/api/BetaAPIClientMockData";
import {sleep} from "@/utils/sleep";

export class BetaAPIClient {
	async getCitiesByName(params: BetaGetCitiesByNameParams): Promise<BetaGetCitiesByNameResponse[]> {
		await sleep(2)

		return mockGetCitiesByNameResponse.filter((item) => {
			return item.name.toLowerCase().includes(params.name.toLowerCase())
		})
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
