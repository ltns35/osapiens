import { BetaAPIClient, BetaGetCitiesByNameParams, BetaGetCitiesByNameResponse, BetaGetWeatherDataParams, BetaGetWeatherDataResponse } from "@/api/BetaAPIClient";
import { mockGetCitiesByNameResponse, mockGetWeatherDataResponse } from "@/api/BetaAPIClientMockData";

jest.mock("@/utils/sleep", () => ({
	sleep: jest.fn(() => Promise.resolve())
}));

describe("BetaAPIClient", () => {
	const apiClient = new BetaAPIClient();

	describe("getCitiesByName", () => {
		it("should return filtered cities based on the name parameter", async () => {

			const params: BetaGetCitiesByNameParams = { name: "madrid" };
			const expectedResponse: BetaGetCitiesByNameResponse[] = [
				{
					id: "1",
					name: "Madrid"
				}
			]

			const response = await apiClient.getCitiesByName(params);

			expect(response).toEqual(expectedResponse);
		});

		it("should return an empty array if no city names match the parameter", async () => {

			const params: BetaGetCitiesByNameParams = { name: "notfound" };
			const expectedResponse: BetaGetCitiesByNameResponse[] = [];

			const response = await apiClient.getCitiesByName(params);

			expect(response).toEqual(expectedResponse);
		});
	});

	describe("getWeatherData", () => {
		it("should return the weather data response for the specific location", async () => {

			const params: BetaGetWeatherDataParams = { location: "madrid" };
			const expectedResponse: BetaGetWeatherDataResponse[] = mockGetWeatherDataResponse;

			const response = await apiClient.getWeatherData(params);

			expect(response).toEqual(expectedResponse);
		});
	});
});
