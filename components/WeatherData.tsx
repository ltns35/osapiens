import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {ListItem} from "@rneui/themed";

export interface WeatherDataProps {
	loading: boolean;
	error: boolean;
	data: {
		id: string;
		weather: string;
		date: string;
	}[];
}

export default function WeatherData({loading, error, data}: WeatherDataProps) {
	if (loading) {
		return (
			<View testID="weather-loading">
				<ActivityIndicator size="large" color="#0000ff"/>
				<Text>Loading weather data...</Text>
			</View>
		);
	}

	if (error) {
		return <Text style={{color: 'red', textAlign: 'center'}}>Error loading weather data.</Text>;
	}

	return (
		<FlatList testID="weather-results"
			data={data ?? []}
			renderItem={({item}) => (
				<ListItem bottomDivider testID="weather-item">
					<ListItem.Content>
						<ListItem.Title>{item.weather}</ListItem.Title>
						<ListItem.Subtitle>{item.date}</ListItem.Subtitle>
					</ListItem.Content>
				</ListItem>
			)}
			keyExtractor={(item) => item.id.toString()}
		/>
	);
}
