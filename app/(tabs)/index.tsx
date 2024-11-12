import {FlatList, StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React, {useState} from "react";
import {Overlay, SearchBar} from '@rneui/themed';
import {Theme} from "@/themes/Theme";
import {useThemedStyles} from "@/hooks/useThemedStyles";
import {useWeatherService} from "@/hooks/useWeatherService";
import NamedStyles = StyleSheet.NamedStyles;
import {WeatherGetCitiesByNameModel, WeatherGetWeatherDataModel} from "@/services/WeatherService";

export default function WeatherScreen() {
	const style = useThemedStyles(styles)
	const weatherService = useWeatherService();
	const [search, setSearch] = useState("");
	const [citiesResponse, setCitiesResponse] = useState<WeatherGetCitiesByNameModel | undefined>();
	const [weatherResponse, setWeatherResponse] = useState<WeatherGetWeatherDataModel | undefined>();
	const [overlayVisible, setOverlayVisible] = useState(false);

	const updateSearch = async (search: string) => {
		setSearch(search);
		setOverlayVisible(true);
		try {
			const response = await weatherService.getCitiesByName({
				name: search,
			})
			setCitiesResponse(response)
		} catch (error) {
			console.error("Error getting weather cities", error);
		}
		setOverlayVisible(false);
	};

	const toggleOverlay = () => {
		setOverlayVisible(!overlayVisible);
	};

	return (
		<View style={style.container}>
			<SearchBar
				placeholder="Search by city..."
				onChangeText={updateSearch}
				value={search}
			/>
			<Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay}>
				<FlatList data={citiesResponse?.cities ?? []}
						  renderItem={({item}) => <Text>{item.name}</Text>}>
				</FlatList>
			</Overlay>
			<FlatList data={weatherResponse?.data ?? []}
					  renderItem={({item}) => {
						  return (
							  <View>
								  <Text>{item.date.toLocaleString()}</Text>
								  <Text>{item.weather}</Text>
							  </View>
						  )
					  }}>
			</FlatList>
		</View>
	);
}

const styles = (theme: Theme): NamedStyles<WeatherStyle> => {
	return {
		container: {
			flex: 1,
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: theme.backgroundColor
		},
		title: {
			fontSize: 20,
			fontWeight: 'bold',
			color: theme.primaryColor,
		},
	}
}

interface WeatherStyle {
	container: ViewStyle;
	title: TextStyle;
}
