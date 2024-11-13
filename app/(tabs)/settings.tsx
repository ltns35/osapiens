import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {WeatherServiceContext} from '@/services/WeatherServiceProvider';
import {Theme, ThemeName} from '@/themes/Theme';
import {ThemeContext} from '@/themes/ThemeProvider';
import {useThemedStyles} from '@/hooks/useThemedStyles';
import {alphaWeatherService} from '@/services/AlphaWeatherService';
import {betaWeatherService} from '@/services/BetaWeatherService';
import {Picker} from '@react-native-picker/picker';
import WeatherService from "@/services/WeatherService";
import NamedStyles = StyleSheet.NamedStyles;

type AvailableService = {
	id: string;
	label: string;
	value: {
		service: WeatherService;
		theme: ThemeName;
	};
	default: boolean;
};

export default function SettingsScreen() {
	const {updateTheme} = useContext(ThemeContext);
	const {updateService} = useContext(WeatherServiceContext);
	const style = useThemedStyles(styles);

	// This could be retrieved from local or cloud storage.
	const defaultService = availableServices.find((s) => s.default);
	const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(defaultService?.id);
	const [error, setError] = useState(false);

	const updateServiceAndTheme = (service: AvailableService) => {
		updateService(service.value.service);
		updateTheme(service.value.theme);
	}

	useEffect(() => {
		if (defaultService) {
			updateServiceAndTheme(defaultService);
		} else {
			setError(true);
		}
	}, [defaultService, updateTheme]);

	useEffect(() => {
		const selectedService = availableServices.find((s) => s.id === selectedServiceId);
		if (selectedService) {
			updateServiceAndTheme(selectedService);
			setError(false);
		} else {
			setError(true);
		}
	}, [selectedServiceId, updateService, updateTheme]);

	const pickerItems = useMemo(
		() =>
			availableServices.map((service) => (
				<Picker.Item key={service.id}
							 label={service.label}
							 value={service.id}/>
			)),
		[]
	);

	const onPickerValueChange = (selectedId: string) => {
		setSelectedServiceId(selectedId);
	};

	if (error) {
		return (
			<View testID="errorMessage"
				  style={style.errorContainer}>
				<Text style={style.errorText}>Error: No valid service found.</Text>
			</View>
		);
	}

	return (
		<View style={style.container}>
			<Text style={style.title}>Select Weather Service:</Text>
			<Picker testID="picker"
					selectedValue={selectedServiceId}
					onValueChange={onPickerValueChange}>
				{pickerItems}
			</Picker>
		</View>
	);
}

const availableServices: AvailableService[] = [
	{
		id: 'alpha',
		label: 'Alpha',
		value: {
			service: alphaWeatherService,
			theme: 'alpha',
		},
		default: true,
	},
	{
		id: 'beta',
		label: 'Beta',
		value: {
			service: betaWeatherService,
			theme: 'beta',
		},
		default: false,
	},
];

const styles = (theme: Theme): NamedStyles<SettingsStyle> => ({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.backgroundColor,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: theme.primaryColor,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
	errorContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	errorText: {
		fontSize: 18,
		color: theme.errorColor,
	},
});

interface SettingsStyle {
	container: ViewStyle;
	title: TextStyle;
	separator: ViewStyle;
	errorContainer: ViewStyle;
	errorText: TextStyle;
}
