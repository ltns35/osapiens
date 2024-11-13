import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {ListItem} from "@rneui/themed";

export interface CitySearchResultsProps {
	loading: boolean;
	error: boolean;
	cities: {
		id: string;
		name: string;
	}[];
	onCitySelected: (id: string) => void;
}

export default function CitySearchResults({loading, error, cities, onCitySelected}: CitySearchResultsProps) {
	if (loading) {
		return (
			<View testID="city-loading">
				<ActivityIndicator size="large" color="#0000ff"/>
				<Text>Loading cities...</Text>
			</View>
		);
	}

	if (error) {
		return <Text style={{color: 'red', textAlign: 'center'}}>Error loading cities.</Text>;
	}

	return (
		<FlatList
			testID="city-result"
			data={cities ?? []}
			renderItem={({item}) => (
				<ListItem testID="city-item"
					onPress={() => onCitySelected(item.id)}>
					<ListItem.Content>
						<ListItem.Title>{item.name}</ListItem.Title>
					</ListItem.Content>
				</ListItem>
			)}
			keyExtractor={(item) => item.id.toString()}
		/>
	);
}
