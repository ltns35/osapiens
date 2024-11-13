import { ActivityIndicator, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import React, { useCallback, useEffect, useState, Suspense } from "react";
import { SearchBar } from '@rneui/themed';
import { Theme } from "@/themes/Theme";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useWeatherService } from "@/hooks/useWeatherService";
import { WeatherGetCitiesByNameModel, WeatherGetWeatherDataModel } from "@/services/WeatherService";
import { debounce } from "lodash";
import NamedStyles = StyleSheet.NamedStyles;

const CitySearchResults = React.lazy(() => import('@/components/CitySearchResults'));
const WeatherData = React.lazy(() => import('@/components/WeatherData'));

export default function WeatherScreen() {
	const style = useThemedStyles(styles);
	const weatherService = useWeatherService();
	const [search, setSearch] = useState("");
	const [citySelected, setCitySelected] = useState("");
	const [citiesResponse, setCitiesResponse] = useState<WeatherGetCitiesByNameModel | undefined>();
	const [weatherResponse, setWeatherResponse] = useState<WeatherGetWeatherDataModel | undefined>();
	const [isSearching, setIsSearching] = useState(false);
	const [loading, setLoading] = useState({ cities: false, weather: false });
	const [error, setError] = useState({ cities: false, weather: false });

	const validateInput = (search: string) => {
		return search.trim().length > 0;
	};

	const debouncedUpdateSearch = useCallback((search: string) => {
		const debounceFunc = debounce(async () => {
			if (!validateInput(search)) {
				return;
			}

			setLoading((prev) => ({ ...prev, cities: true }));
			setError((prev) => ({ ...prev, cities: false }));
			try {
				const response = await weatherService.getCitiesByName({ name: search });
				setCitiesResponse(response);
			} catch {
				setError((prev) => ({ ...prev, cities: true }));
			} finally {
				setLoading((prev) => ({ ...prev, cities: false }));
			}
		}, 500);
		debounceFunc();
	}, [weatherService]);

	const updateSearch = (searchTerm: string) => {
		setSearch(searchTerm);
		setIsSearching(true);
		setCitiesResponse(undefined);
		debouncedUpdateSearch(searchTerm);
	};

	const onSearchCityTapped = useCallback((id: string) => {
		if (citySelected !== id) {
			setIsSearching(false);
			setCitySelected(id);
		}
	}, [citySelected]);

	useEffect(() => {
		let isCancelled = false;

		const fetchWeatherData = async () => {
			if (!citySelected) return;

			setLoading((prev) => ({ ...prev, weather: true }));
			setError((prev) => ({ ...prev, weather: false }));
			setWeatherResponse(undefined);
			try {
				const response = await weatherService.getWeatherData({ location: citySelected });
				if (!isCancelled) {
					setWeatherResponse(response);
				}
			} catch {
				if (!isCancelled) {
					setError((prev) => ({ ...prev, weather: true }));
				}
			} finally {
				if (!isCancelled) {
					setLoading((prev) => ({ ...prev, weather: false }));
				}
			}
		};

		fetchWeatherData();

		return () => {
			isCancelled = true;
		};
	}, [citySelected, weatherService]);

	return (
		<View style={style.container}>
			<SearchBar
				testID="searchbar"
				placeholder="Search by city..."
				onChangeText={updateSearch}
				value={search}
			/>
			<Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
				{isSearching ? (
					<CitySearchResults
						loading={loading.cities}
						error={error.cities}
						cities={citiesResponse?.cities ?? []}
						onCitySelected={onSearchCityTapped}/>
				) : (
					<WeatherData
						loading={loading.weather}
						error={error.weather}
						data={(weatherResponse?.data ?? []).map((e) => {
							return {
								id: e.id,
								weather: e.weather,
								date: e.date
							}
						})}
					/>
				)}
			</Suspense>
		</View>
	);
}

const styles = (theme: Theme): NamedStyles<WeatherStyle> => ({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.backgroundColor,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: theme.primaryColor,
	},
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	errorText: {
		color: 'red',
		textAlign: 'center',
		margin: 10,
	},
});

interface WeatherStyle {
	container: ViewStyle;
	title: TextStyle;
	loaderContainer: ViewStyle;
	errorText: TextStyle;
}
