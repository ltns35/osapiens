import React, {useCallback, useState} from "react";
import {Theme, ThemeName, themes} from "@/themes/Theme";

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

    const updateTheme = useCallback((theme: ThemeName) => {
        setTheme(theme);
    }, []);

    const theme = themes[themeName];

    return (
        <ThemeContext.Provider value={{theme, updateTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
