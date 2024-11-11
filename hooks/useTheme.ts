import {useContext} from "react";
import {ThemeContext} from "@/themes/ThemeProvider";
import {themes} from "@/themes/Theme";

export const useTheme = () => {
    return useContext(ThemeContext)?.theme ?? themes.default;
};
