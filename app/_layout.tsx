import {Stack} from 'expo-router';
import React from 'react';
import 'react-native-reanimated';
import {ThemeProvider} from "@/themes/ThemeProvider";
import {WeatherServiceProvider} from "@/services/WeatherServiceProvider";

export default function Layout() {
    return (
        <WeatherServiceProvider>
            <ThemeProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{headerShown: true}}/>
                </Stack>
            </ThemeProvider>
        </WeatherServiceProvider>
    );
}
