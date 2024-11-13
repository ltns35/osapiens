import {AlphaWeatherService} from "@/services/AlphaWeatherService";
import {alphaAPIClient, AlphaGetCitiesByNameResponse, AlphaGetWeatherDataResponse} from "@/api/AlphaAPIClient";
import {WeatherGetCitiesByNameModel, WeatherGetWeatherDataModel} from "@/services/WeatherService";

jest.mock("@/api/AlphaAPIClient", () => ({
	alphaAPIClient: {
		getCitiesByName: jest.fn(),
		getWeatherData: jest.fn(),
	},
}));

describe("AlphaWeatherService", () => {
	let weatherService: AlphaWeatherService;
	let mockGetCitiesByName: jest.Mock;
	let mockGetWeatherData: jest.Mock;

	beforeEach(() => {
		mockGetCitiesByName = alphaAPIClient.getCitiesByName as jest.Mock;
		mockGetWeatherData = alphaAPIClient.getWeatherData as jest.Mock;
		weatherService = new AlphaWeatherService(alphaAPIClient);
	});

	describe("getCitiesByName", () => {
		it("should return mapped cities data when the API call is successful", async () => {
			const mockApiResponse: AlphaGetCitiesByNameResponse = {
				data: [
					{id: "1", name: "Madrid"},
					{id: "2", name: "MadMadMad"}
				],
			};
			mockGetCitiesByName.mockResolvedValue(mockApiResponse);

			const params = {name: "Mad"};
			const expectedResult: WeatherGetCitiesByNameModel = {
				cities: [
					{id: "1", name: "Madrid"},
					{id: "2", name: "MadMadMad"}
				],
			};

			const result = await weatherService.getCitiesByName(params);

			expect(result).toEqual(expectedResult);
			expect(mockGetCitiesByName).toHaveBeenCalledWith({name: "Mad"});
		});

		it("should throw an error when the API call fails", async () => {
			mockGetCitiesByName.mockRejectedValue(new Error("API Error"));

			const params = {name: "notfound"};

			await expect(weatherService.getCitiesByName(params))
				.rejects
				.toThrow("Failed fetching cities: API Error");

			expect(mockGetCitiesByName).toHaveBeenCalledWith({name: "notfound"});
		});
	});

	describe("getWeatherData", () => {
		it("should return mapped weather data when the API call is successful", async () => {
			const mockApiResponse: AlphaGetWeatherDataResponse = {
				data: [
					{
						id: "1",
						date: "2025-1-1",
						rainProbability: 10,
						weather: "sunny"
					}
				],
			};
			mockGetWeatherData.mockResolvedValue(mockApiResponse);

			const params = {location: "Madrid"};
			const expectedResult: WeatherGetWeatherDataModel = {
				data: [
					{
						id: "1",
						date: "2025-1-1",
						rainProbability: 10,
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

			const params = {location: "notfound"};

			await expect(weatherService.getWeatherData(params))
				.rejects
				.toThrow("Failed fetching weather data for notfound");

			expect(mockGetWeatherData).toHaveBeenCalledWith({location: "notfound"});
		});
	});
});
