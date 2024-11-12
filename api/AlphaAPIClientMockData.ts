import {AlphaGetCitiesByNameResponse, AlphaGetWeatherDataResponse} from "@/api/AlphaAPIClient";

export const mockGetCitiesByNameResponse: AlphaGetCitiesByNameResponse = {
	data: [
		{
			id: "1",
			name: "Madrid"
		},
		{
			id: "2",
			name: "Paris"
		},
		{
			id: "3",
			name: "Berlin"
		},
		{
			id: "4",
			name: "Roma"
		},
		{
			id: "5",
			name: "London"
		}
	]
}

export const mockGetWeatherDataResponse: AlphaGetWeatherDataResponse = {
	data: [
		{
			id: "1",
			date: "2025-01-01",
			weather: "cloudy",
			rainProbability: 25
		},
		{
			id: "1",
			date: "2025-01-02",
			weather: "cloudy",
			rainProbability: 30
		},
		{
			id: "1",
			date: "2025-01-03",
			weather: "sunny",
			rainProbability: 5
		},
		{
			id: "1",
			date: "2025-01-04",
			weather: "sunny",
			rainProbability: 10
		}
	]
}
