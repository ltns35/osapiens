import {Stack} from 'expo-router';
import React from 'react';
import 'react-native-reanimated';
import {ThemeProvider} from "@/themes/ThemeProvider";

function Layout() {
    return (
        <ThemeProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{headerShown: true}}/>
            </Stack>
        </ThemeProvider>
    );
}
