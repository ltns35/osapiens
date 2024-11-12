import {useTheme} from "@/hooks/useTheme";
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from "react-native";
import {Theme} from "@/themes/Theme";

type ThemedStyle<T> = (theme: Theme) => T;
type NamedStyles<T = any> = {
	[P in keyof T]: ViewStyle | TextStyle | ImageStyle | NamedStyles;
};

export const useThemedStyles = <T extends NamedStyles<T> & NamedStyles>(styles: ThemedStyle<T>): T => {
	const theme = useTheme();
	return StyleSheet.create(styles(theme))
};
