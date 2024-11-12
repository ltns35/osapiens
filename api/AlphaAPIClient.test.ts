import {
	AlphaAPIClient,
	AlphaGetCitiesByNameParams,
	AlphaGetCitiesByNameResponse,
	AlphaGetWeatherDataParams,
	AlphaGetWeatherDataResponse
} from "@/api/AlphaAPIClient";
import {mockGetWeatherDataResponse} from "@/api/AlphaAPIClientMockData";

jest.mock("@/utils/sleep", () => ({
	sleep: jest.fn(() => Promise.resolve())
}));

describe("AlphaAPIClient", () => {
	const apiClient = new AlphaAPIClient();

	describe("getCitiesByName", () => {
		it("should return filtered cities based on name parameter", async () => {

			const params: AlphaGetCitiesByNameParams = {name: "madrid"};
			const expectedResponse: AlphaGetCitiesByNameResponse = {
				data: [
					{
						id: "1",
						name: "Madrid"
					}
				],
			};

			const response = await apiClient.getCitiesByName(params);

			expect(response).toEqual(expectedResponse);
		});

		it("should return an empty array if no city names match the parameter", async () => {

			const params: AlphaGetCitiesByNameParams = {name: "notfound"};
			const expectedResponse: AlphaGetCitiesByNameResponse = {data: []};

			const response = await apiClient.getCitiesByName(params);

			expect(response).toEqual(expectedResponse);
		});
	});

	describe("getWeatherData", () => {
		it("should return the weather data response for the specific location", async () => {

			const params: AlphaGetWeatherDataParams = {location: "madrid"};
			const expectedResponse: AlphaGetWeatherDataResponse = mockGetWeatherDataResponse;

			const response = await apiClient.getWeatherData(params);

			expect(response).toEqual(expectedResponse);
		});
	});
});
