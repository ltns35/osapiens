import {StyleSheet, View} from 'react-native';
import React, {useState} from "react";
import { SearchBar } from '@rneui/themed';

export default function WeatherScreen(){

    const [search, setSearch] = useState("");

    const updateSearch = (search: string) => {
        setSearch(search);
    };

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Search by city..."
                onChangeText={updateSearch}
                value={search}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
