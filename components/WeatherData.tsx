import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {ListItem} from "@rneui/themed";

interface Data {
	id: string;
	weather: string;
	date: string;
}

type WeatherDataProps = {
	loading: boolean;
	error: boolean;
	data: Data[];
}

export default function WeatherData({loading, error, data}: WeatherDataProps) {
	if (loading) {
		return (
			<View>
				<ActivityIndicator size="large" color="#0000ff"/>
				<Text>Loading weather data...</Text>
			</View>
		);
	}

	if (error) {
		return <Text style={{color: 'red', textAlign: 'center'}}>Error loading weather data.</Text>;
	}

	return (
		<FlatList
			data={data ?? []}
			renderItem={({item}) => (
				<ListItem bottomDivider>
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
