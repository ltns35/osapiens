import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useTheme } from '@/hooks/useTheme';
import { themes } from '@/themes/Theme';
import { Theme } from '@/themes/Theme';
import {renderHook} from "@testing-library/react-native";

jest.mock('@/hooks/useTheme');

type TestStyle = {
	container: ViewStyle;
	text: TextStyle;
};

describe('useThemedStyles', () => {
	const mockStyles = (theme: Theme): TestStyle => ({
		container: {
			backgroundColor: theme.backgroundColor,
		},
		text: {
			color: theme.primaryColor,
			fontSize: 16,
		},
	});

	it('applies styles based on the current theme', () => {
		(useTheme as jest.Mock).mockReturnValue(themes.alpha);

		const { result } = renderHook(() => useThemedStyles(mockStyles));
		const expectedStyles = StyleSheet.create({
			container: {
				backgroundColor: themes.alpha.backgroundColor,
			},
			text: {
				color: themes.alpha.primaryColor,
				fontSize: 16,
			},
		});

		expect(result.current).toEqual(expectedStyles);
	});

	it('updates styles when the theme changes', () => {
		const { rerender, result } = renderHook(() => useThemedStyles(mockStyles), {
			initialProps: themes.alpha,
		});

		(useTheme as jest.Mock).mockReturnValue(themes.beta);
		rerender(themes.beta);

		const expectedStyles = StyleSheet.create({
			container: {
				backgroundColor: themes.beta.backgroundColor,
			},
			text: {
				color: themes.beta.primaryColor,
				fontSize: 16,
			},
		});

		expect(result.current).toEqual(expectedStyles);
	});
});
