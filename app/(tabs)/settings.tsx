import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from "react";
import {Picker} from "@react-native-picker/picker";
import {alphaWeatherService} from "@/api/AlphaWeatherService";
import {betaWeatherService} from "@/api/BetaWeatherService";
import {WeatherServiceContext} from "@/services/WeatherServiceProvider";
import {ThemeName} from "@/themes/Theme";
import WeatherService from "@/api/WeatherService";
import {ThemeContext} from "@/themes/ThemeProvider";

type AvailableService = {
    id: string;
    label: string;
    value: {
        service: WeatherService,
        theme: ThemeName
    };
    default: boolean;
}

export default function SettingsScreen() {
    const {updateTheme} = useContext(ThemeContext);
    const {updateService} = useContext(WeatherServiceContext)

    // This could be retrieved from local or cloud storage.
    const defaultService = availableServices.find((s) => s.default);
    const [selectedServiceId, setSelectedServiceId] = useState(defaultService?.id);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (defaultService) {
            updateTheme(defaultService.value.theme)
        } else {
            setError(true);
        }
    }, [defaultService, updateTheme])

    useEffect(() => {
        const selectedService = availableServices.find((s) => s.id === selectedServiceId);
        if (selectedService) {
            updateService(selectedService.value.service);
            updateTheme(selectedService.value.theme);
            setError(false);
        } else {
            setError(true);
        }
    }, [selectedServiceId, updateService, updateTheme]);

    const pickerItems = availableServices.map((service) => {
        return <Picker.Item key={service.id}
                            label={service.label}
                            value={service.id}/>
    })

    const onPickerValueChange = (selectedId: string) => {
        setSelectedServiceId(selectedId);
    };

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: No valid service found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Weather Service:</Text>
            <Picker
                selectedValue={selectedServiceId}
                onValueChange={onPickerValueChange}
            >
                {pickerItems}
            </Picker>
        </View>
    );
};

const availableServices: AvailableService[] = [
    {
        id: 'alpha',
        label: "Alpha",
        value: {
            service: alphaWeatherService,
            theme: "alpha"
        },
        default: true,
    },
    {
        id: 'beta',
        label: "Beta",
        value: {
            service: betaWeatherService,
            theme: "beta"
        },
        default: false,
    }
]

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
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 18,
        color: '#721c24',
    },
});
