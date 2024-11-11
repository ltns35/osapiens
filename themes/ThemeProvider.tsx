import React, {useState} from "react";
import {Theme, themes} from "@/themes/Theme";

type ThemeName = keyof typeof themes;

interface ThemeContextType {
    theme: Theme
    updateTheme: (theme: ThemeName) => void
}

export const ThemeContext = React.createContext<ThemeContextType>({
    theme: themes.default,
    updateTheme(theme: ThemeName): void {
    }
});

export const ThemeProvider = ({children}: { children: React.ReactNode }) => {
    const [themeName, setTheme] = useState<ThemeName>('default');

    const updateTheme = (theme: ThemeName) => {
        setTheme(theme);
    };

    const theme = themes[themeName];

    return (
        <ThemeContext.Provider value={{theme, updateTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
