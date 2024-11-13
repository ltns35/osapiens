import {ThemeContext} from '@/themes/ThemeProvider';
import {themes} from '@/themes/Theme';
import {useTheme} from '@/hooks/useTheme';
import {renderHook} from "@testing-library/react-native";
import React from "react";

describe('useTheme hook', () => {
	it('returns the theme from ThemeContext if available', () => {
		const mockTheme = themes.alpha;

		const wrapper = ({children}: { children: React.ReactNode }) => (
			<ThemeContext.Provider value={{
				theme: mockTheme, updateTheme: () => {
				}
			}}>
				{children}
			</ThemeContext.Provider>
		);

		const {result} = renderHook(() => useTheme(), {wrapper});
		expect(result.current).toBe(mockTheme);
	});

	it('returns the default theme if ThemeContext is not available', () => {
		const {result} = renderHook(() => useTheme());
		expect(result.current).toBe(themes.default);
	});
});
