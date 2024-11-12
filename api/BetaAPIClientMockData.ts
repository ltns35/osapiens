import {BetaGetCitiesByNameResponse, BetaGetWeatherDataResponse} from "@/api/BetaAPIClient";

export const mockGetCitiesByNameResponse: BetaGetCitiesByNameResponse[] = [
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

export const mockGetWeatherDataResponse: BetaGetWeatherDataResponse[] = [
	{
		date: "2025-01-01",
		value: "sunny"
	},
	{
		date: "2025-01-02",
		value: "rainy"
	},
	{
		date: "2025-01-03",
		value: "windy"
	},
	{
		date: "2025-01-04",
		value: "sunny"
	}
]
