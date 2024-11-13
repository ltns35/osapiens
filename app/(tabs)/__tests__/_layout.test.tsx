import {useThemedStyles} from '@/hooks/useThemedStyles';
import TabLayout from "@/app/(tabs)/_layout";
import {renderRouter, screen} from 'expo-router/testing-library';
import WeatherScreen from "@/app/(tabs)";
import SettingsScreen from "@/app/(tabs)/settings";
import {StyleSheet} from "react-native";

jest.mock('@/hooks/useThemedStyles');

const mockThemeStyles = {
	tabBar: {
		backgroundColor: 'white',
		item: {
			unselectedTintColor: 'gray',
			selectedTintColor: 'blue',
		},
	},
	navigationBar: {
		backgroundColor: 'blue',
		color: 'white',
	},
};

(useThemedStyles as jest.Mock).mockReturnValue(mockThemeStyles);

describe('TabLayout', () => {
	it('renders the TabLayout with the Weather and Settings tabs visible and correct initial route', () => {

		const {getAllByText} = renderRouter(
			{
				_layout: () => <TabLayout/>,
				index: () => <WeatherScreen/>,
				settings: () => <SettingsScreen/>
			},
			{
				initialUrl: '/',
			},
		);

		expect(screen).toHavePathname('/');

		const weatherElements = getAllByText('Weather');
		expect(weatherElements.length).toBe(2);

		const settingsElements = getAllByText('Settings');
		expect(settingsElements.length).toBe(1);
	});

	it('applies correct theme-based styles to the Weather and Settings tab labels', () => {
		const {getAllByText} = renderRouter(
			{
				_layout: () => <TabLayout/>,
				index: () => <WeatherScreen/>,
				settings: () => <SettingsScreen/>
			},
			{
				initialUrl: '/',
			},
		);

		const weatherElements = getAllByText('Weather');
		const weatherTabText = weatherElements[1];
		const weatherStyle = StyleSheet.flatten(weatherTabText.props.style);

		expect(weatherStyle).toMatchObject({
			textAlign: 'center',
			color: mockThemeStyles.tabBar.item.selectedTintColor,
			fontSize: 10
		});

		const settingsElements = getAllByText('Settings');
		const settingsTabText = settingsElements[0];
		const settingsStyle = StyleSheet.flatten(settingsTabText.props.style);
		expect(settingsStyle).toMatchObject({
			textAlign: 'center',
			color: mockThemeStyles.tabBar.item.unselectedTintColor,
			fontSize: 10
		});
	});
});
