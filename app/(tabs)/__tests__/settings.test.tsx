import {fireEvent, render, waitFor} from 'expo-router/testing-library';
import {WeatherServiceContext} from '@/services/WeatherServiceProvider';
import SettingsScreen from "@/app/(tabs)/settings";
import {ThemeContext} from '@/themes/ThemeProvider';
import {betaWeatherService} from "@/services/BetaWeatherService";
import {Theme, themes} from "@/themes/Theme";
import {alphaWeatherService} from "@/services/AlphaWeatherService";

const mockUpdateService = jest.fn();
const mockUpdateTheme = jest.fn();

jest.mock('@/services/AlphaWeatherService', () => ({
	alphaWeatherService: {getWeatherData: jest.fn()}
}));

jest.mock('@/services/BetaWeatherService', () => ({
	betaWeatherService: {getWeatherData: jest.fn()}
}));

const renderWithProviders = (service = alphaWeatherService, theme: Theme = themes.alpha) => {
	return render(
		<WeatherServiceContext.Provider value={{ updateService: mockUpdateService, service }}>
			<ThemeContext.Provider value={{ updateTheme: mockUpdateTheme, theme }}>
				<SettingsScreen />
			</ThemeContext.Provider>
		</WeatherServiceContext.Provider>
	);
};

describe('SettingsScreen', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render with default service (Alpha)', async () => {
		const {getByText, getByTestId} = renderWithProviders()

		expect(getByText('Select Weather Service:')).toBeTruthy();

		const picker = getByTestId('picker');
		expect(picker.props.selectedIndex).toBe(0);
	});

	it('should change service when a new service is selected from the Picker', async () => {
		const {getByTestId} = renderWithProviders()

		const picker = getByTestId('picker');

		fireEvent(picker, 'onValueChange', 'beta');

		await waitFor(() => {
			expect(mockUpdateService).toHaveBeenCalledWith(betaWeatherService);
			expect(mockUpdateTheme).toHaveBeenCalledWith('beta');
		});
	});

	it('should show an error message if no valid service is selected', async () => {
		const {getByTestId} = renderWithProviders()

		const picker = getByTestId('picker');

		fireEvent(picker, 'onValueChange', 'invalid');

		// Ensure error message is shown
		expect(getByTestId('errorMessage')).toBeTruthy();
	});

	it('should call updateTheme with the default theme when the component mounts', async () => {
		renderWithProviders()

		await waitFor(() => {
			expect(mockUpdateTheme).toHaveBeenCalledWith('alpha');
		});
	});
});
