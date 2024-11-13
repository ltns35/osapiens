import {useThemedStyles} from '@/hooks/useThemedStyles';
import {fireEvent, renderRouter, screen, waitFor} from 'expo-router/testing-library';
import {useWeatherService} from "@/hooks/useWeatherService";
import WeatherScreen from "@/app/(tabs)";
import {sleep} from "@/utils/sleep";

jest.mock('@/hooks/useWeatherService');
jest.mock('@/hooks/useThemedStyles');

const mockThemeStyles = {
	container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' },
	title: { fontSize: 20, fontWeight: 'bold', color: 'black' },
	loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
};

const mockWeatherService = {
	getCitiesByName: jest.fn(),
	getWeatherData: jest.fn(),
};

(useWeatherService as jest.Mock).mockReturnValue(mockWeatherService);
(useThemedStyles as jest.Mock).mockReturnValue(mockThemeStyles);

describe("WeatherScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the WeatherScreen and search bar", () => {
		const { getByTestId } = renderRouter(
			{
				index: () => <WeatherScreen />,
			},
			{
				initialUrl: '/',
			}
		);

		expect(getByTestId("searchBar")).toBeTruthy();
	});

	it("shows loader when fetching city data", async () => {
		mockWeatherService.getCitiesByName.mockImplementation(
			() => sleep(5)
		);

		const { getByTestId } = renderRouter(
			{
				index: () => <WeatherScreen />,
			},
			{
				initialUrl: '/',
			}
		);

		fireEvent.changeText(getByTestId("searchBar"), "Mad");

		await waitFor(() => expect(mockWeatherService.getCitiesByName).toHaveBeenCalled());

		expect(getByTestId("loadingCities")).toBeTruthy();
	});

	it("displays error message if fetching city data fails", async () => {
		mockWeatherService.getCitiesByName.mockRejectedValue(new Error("Network error"));

		const { getByTestId } = renderRouter(
			{
				index: () => <WeatherScreen />,
			},
			{
				initialUrl: '/',
			}
		);

		fireEvent.changeText(getByTestId("searchBar"), "Mad");

		await waitFor(() => expect(getByTestId("errorCities")).toBeTruthy());
	});

	it("displays city search results", async () => {
		const mockCities = [
			{ id: "1", name: "Madrid" },
			{ id: "2", name: "MadMadMad" },
		];
		mockWeatherService.getCitiesByName.mockResolvedValue({ cities: mockCities });

		const { findByText, getByTestId } = renderRouter(
			{
				index: () => <WeatherScreen />,
			},
			{
				initialUrl: '/',
			}
		);

		fireEvent.changeText(getByTestId("searchBar"), "Mad");

		expect(await findByText("Madrid")).toBeTruthy();
		expect(await findByText("MadMadMad")).toBeTruthy();
	});

	it("shows loader when fetching weather data", async () => {
		const mockCities = [{ id: "1", name: "Madrid" }];
		mockWeatherService.getCitiesByName.mockResolvedValue({ cities: mockCities });
		mockWeatherService.getWeatherData.mockImplementation(
			() => sleep(0.5)
		);

		const { getByText, getByTestId, findByText } = renderRouter(
			{
				index: () => <WeatherScreen />,
			},
			{
				initialUrl: '/',
			}
		);

		fireEvent.changeText(getByTestId("searchBar"), "Mad");
		const cityItem = await findByText("Madrid");

		fireEvent.press(cityItem);

		expect(getByText("Loading weather data...")).toBeTruthy();
		await waitFor(() => expect(mockWeatherService.getWeatherData).toHaveBeenCalled());
	});

	it("displays error message if fetching weather data fails", async () => {
		const mockCities = [{ id: "1", name: "Madrid" }];
		mockWeatherService.getCitiesByName.mockResolvedValue({ cities: mockCities });
		mockWeatherService.getWeatherData.mockRejectedValue(new Error("Network error"));

		const { getByText, getByTestId, findByText } = renderRouter(
			{
				index: () => <WeatherScreen />,
			},
			{
				initialUrl: '/',
			}
		);

		fireEvent.changeText(getByTestId("searchBar"), "Mad");
		const cityItem = await findByText("Madrid");

		fireEvent.press(cityItem);

		await waitFor(() => expect(getByText("Error loading weather data.")).toBeTruthy());
	});

	it("displays weather data correctly", async () => {
		const mockCities = [{ id: "1", name: "Madrid" }];
		const mockWeatherData = [
			{ id: "1", weather: "sunny", date: "2025-1-1" },
			{ id: "2", weather: "cloudy", date: "2025-1-2" },
		];

		mockWeatherService.getCitiesByName.mockResolvedValue({ cities: mockCities });
		mockWeatherService.getWeatherData.mockResolvedValue({ data: mockWeatherData });

		const { getByTestId, findByText } = renderRouter(
			{
				index: () => <WeatherScreen />,
			},
			{
				initialUrl: '/',
			}
		);

		fireEvent.changeText(getByTestId("searchBar"), "Mad");
		const cityItem = await findByText("Madrid");

		fireEvent.press(cityItem);

		expect(await findByText("sunny")).toBeTruthy();
		expect(await findByText("cloudy")).toBeTruthy();
	});
});
