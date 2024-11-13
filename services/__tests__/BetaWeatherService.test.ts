import {BetaWeatherService} from "@/services/BetaWeatherService";
import {betaAPIClient, BetaGetCitiesByNameResponse, BetaGetWeatherDataResponse} from "@/api/BetaAPIClient";
import {
	WeatherDataParams,
	WeatherGetCitiesByNameModel,
	WeatherGetCitiesByNameParams,
	WeatherGetWeatherDataModel
} from "@/services/WeatherService";

jest.mock("@/api/BetaAPIClient", () => ({
	betaAPIClient: {
		getCitiesByName: jest.fn(),
		getWeatherData: jest.fn(),
	},
}));

describe("BetaWeatherService", () => {
	let weatherService: BetaWeatherService;
	let mockGetCitiesByName: jest.Mock;
	let mockGetWeatherData: jest.Mock;

	beforeEach(() => {
		mockGetCitiesByName = betaAPIClient.getCitiesByName as jest.Mock;
		mockGetWeatherData = betaAPIClient.getWeatherData as jest.Mock;
		weatherService = new BetaWeatherService(betaAPIClient); // instantiate the service
	});

	describe("getCitiesByName", () => {
		it("should return mapped cities data when the API call is successful", async () => {
			const mockApiResponse: BetaGetCitiesByNameResponse[] = [
				{
					id: "1",
					name: "Madrid"
				},
			];
			mockGetCitiesByName.mockResolvedValue(mockApiResponse);

			const params: WeatherGetCitiesByNameParams = {name: "Madrid"};
			const expectedResult: WeatherGetCitiesByNameModel = {
				cities: [
					{
						id: "1",
						name: "Madrid"
					}
				],
			};

			const result = await weatherService.getCitiesByName(params);

			expect(result).toEqual(expectedResult);
			expect(mockGetCitiesByName).toHaveBeenCalledWith({name: "Madrid"});
		});

		it("should throw an error when the API call fails", async () => {
			mockGetCitiesByName.mockRejectedValue(new Error("API Error"));

			const params: WeatherGetCitiesByNameParams = {name: "notfound"};

			await expect(weatherService.getCitiesByName(params))
				.rejects
				.toThrow("Failed fetching cities: API Error");

			expect(mockGetCitiesByName).toHaveBeenCalledWith({name: "notfound"});
		});
	});

	describe("getWeatherData", () => {
		it("should return mapped weather data when the API call is successful", async () => {
			// Mock response from API
			const mockApiResponse: BetaGetWeatherDataResponse[] = [
				{
					date: "2025-1-1",
					value: "sunny"
				},
			];
			mockGetWeatherData.mockResolvedValue(mockApiResponse);

			const params: WeatherDataParams = {location: "Madrid"};
			const expectedResult: WeatherGetWeatherDataModel = {
				data: [
					{
						id: "1",
						date: "2025-1-1",
						rainProbability: 0,
						weather: "sunny"
					}
				],
			};

			const result = await weatherService.getWeatherData(params);

			expect(result).toEqual(expectedResult);
			expect(mockGetWeatherData).toHaveBeenCalledWith({location: "Madrid"});
		});

		it("should throw an error when the API call fails", async () => {
			mockGetWeatherData.mockRejectedValue(new Error("API Error"));

			const params: WeatherDataParams = {location: "notfound"};

			await expect(weatherService.getWeatherData(params))
				.rejects
				.toThrow("Failed fetching weather data for notfound");

			expect(mockGetWeatherData).toHaveBeenCalledWith({location: "notfound"});
		});
	});
});
