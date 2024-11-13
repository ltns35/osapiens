import {ActivityIndicator, FlatList, StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React, {useCallback, useEffect, useState} from "react";
import {ListItem, SearchBar} from '@rneui/themed';
import {Theme} from "@/themes/Theme";
import {useThemedStyles} from "@/hooks/useThemedStyles";
import {useWeatherService} from "@/hooks/useWeatherService";
import {WeatherGetCitiesByNameModel, WeatherGetWeatherDataModel} from "@/services/WeatherService";
import {debounce} from "lodash";
import NamedStyles = StyleSheet.NamedStyles;

export default function WeatherScreen() {
	const style = useThemedStyles(styles);
	const weatherService = useWeatherService();
	const [search, setSearch] = useState("");
	const [citySelected, setCitySelected] = useState("");
	const [citiesResponse, setCitiesResponse] = useState<WeatherGetCitiesByNameModel | undefined>();
	const [weatherResponse, setWeatherResponse] = useState<WeatherGetWeatherDataModel | undefined>();
	const [overlayVisible, setOverlayVisible] = useState(false);
	const [loading, setLoading] = useState({cities: false, weather: false});
	const [error, setError] = useState({cities: false, weather: false});

	const debouncedUpdateSearch = useCallback(
		debounce(async (searchTerm: string) => {
			setLoading(prev => ({...prev, cities: true}));
			setError(prev => ({...prev, cities: false}));
			try {
				const response = await weatherService.getCitiesByName({name: searchTerm});
				setCitiesResponse(response);
			} catch (err) {
				setError(prev => ({...prev, cities: true}));
			} finally {
				setLoading(prev => ({...prev, cities: false}));
			}
		}, 500),
		[weatherService]
	);

	const updateSearch = (searchTerm: string) => {
		setSearch(searchTerm);
		setOverlayVisible(true);
		setCitiesResponse(undefined);
		debouncedUpdateSearch(searchTerm);
	};

	const onSearchCityTapped = useCallback((id: string) => {
		if (citySelected !== id) {
			setOverlayVisible(false);
			setCitySelected(id);
		}
	}, [citySelected]);

	useEffect(() => {
		let isCancelled = false;

		const fetchWeatherData = async () => {
			if (!citySelected) return;

			setLoading(prev => ({...prev, weather: true}));
			setError(prev => ({...prev, weather: false}));
			setWeatherResponse(undefined);
			try {
				const response = await weatherService.getWeatherData({location: citySelected});
				if (!isCancelled) {
					setWeatherResponse(response);
				}
			} catch (err) {
				if (!isCancelled) {
					setError(prev => ({...prev, weather: true}));
				}
			} finally {
				if (!isCancelled) {
					setLoading(prev => ({...prev, weather: false}));
				}
			}
		};

		fetchWeatherData();

		return () => {
			isCancelled = true;
		};
	}, [citySelected]);

	const renderCitySearchResults = () => (
		loading.cities ? (
			<View style={style.loaderContainer} testID="loadingCities">
				<ActivityIndicator size="large" color="#0000ff"/>
				<Text>Loading cities...</Text>
			</View>
		) : error.cities ? (
			<Text
				testID="errorCities"
				style={style.errorText}>Error loading cities.</Text>
		) : (
			<FlatList
				data={citiesResponse?.cities ?? []}
				renderItem={({item}) => (
					<ListItem onPress={() => onSearchCityTapped(item.id)}>
						<ListItem.Content>
							<ListItem.Title>{item.name}</ListItem.Title>
						</ListItem.Content>
					</ListItem>
				)}
				keyExtractor={(item) => item.id.toString()}
			/>
		)
	);

	const renderWeatherData = () => (
		loading.weather ? (
			<View style={style.loaderContainer}>
				<ActivityIndicator size="large" color="#0000ff"/>
				<Text>Loading weather data...</Text>
			</View>
		) : error.weather ? (
			<Text style={style.errorText}>Error loading weather data.</Text>
		) : (
			<FlatList
				data={weatherResponse?.data ?? []}
				renderItem={({item}) => (
					<ListItem bottomDivider onPress={() => onSearchCityTapped(item.id)}>
						<ListItem.Content>
							<ListItem.Title>{item.weather}</ListItem.Title>
							<ListItem.Subtitle>{item.date}</ListItem.Subtitle>
						</ListItem.Content>
					</ListItem>
				)}
				keyExtractor={(item) => item.id.toString()}
			/>
		)
	);

	return (
		<View style={style.container}>
			<SearchBar
				testID="searchBar"
				placeholder="Search by city..."
				onChangeText={updateSearch}
				value={search}
			/>
			{overlayVisible ? renderCitySearchResults() : renderWeatherData()}
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
