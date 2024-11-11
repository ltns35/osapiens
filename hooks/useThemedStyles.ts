import {useTheme} from "@/hooks/useTheme";
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";
import {Theme} from "@/themes/Theme";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
type ThemedStyle<T> = (theme: Theme) => NamedStyles<T>;

export const useThemedStyles = <T extends NamedStyles<T>>(styles: ThemedStyle<T>): NamedStyles<T> => {
    const theme = useTheme();
    return StyleSheet.create(styles(theme));
};
