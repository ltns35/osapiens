import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {ListItem} from "@rneui/themed";

interface CityModel {
	id: string;
	name: string;
}

type CitySearchResultsProps = {
	loading: boolean;
	error: boolean;
	cities: CityModel[];
	onCitySelected: (id: string) => void;
}

export default function CitySearchResults({loading, error, cities, onCitySelected}: CitySearchResultsProps) {
	if (loading) {
		return (
			<View>
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
			data={cities ?? []}
			renderItem={({item}) => (
				<ListItem onPress={() => onCitySelected(item.id)}>
					<ListItem.Content>
						<ListItem.Title>{item.name}</ListItem.Title>
					</ListItem.Content>
				</ListItem>
			)}
			keyExtractor={(item) => item.id.toString()}
		/>
	);
}
