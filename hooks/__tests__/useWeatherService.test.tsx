import {useWeatherService} from '@/hooks/useWeatherService';
import {WeatherServiceContext} from '@/services/WeatherServiceProvider';
import React from "react";
import {alphaWeatherService} from "@/services/AlphaWeatherService";
import {renderHook} from "@testing-library/react-native";
import WeatherService from "@/services/WeatherService";
import {betaWeatherService} from "@/services/BetaWeatherService";

describe('useWeatherService', () => {
	it('returns the service from WeatherServiceContext', () => {
		const mockService = alphaWeatherService;

		const wrapper = ({children}: { children: React.ReactNode }) => (
			<WeatherServiceContext.Provider value={{
				service: mockService, updateService: () => {
				}
			}}>
				{children}
			</WeatherServiceContext.Provider>
		);

		const {result} = renderHook(() => useWeatherService(), {wrapper});

		expect(result.current).toBe(mockService);
	});

	it('updates the service if context changes', () => {
		const Wrapper = ({children, service}: { children: React.ReactNode; service: WeatherService }) => (
			<WeatherServiceContext.Provider value={{service, updateService: jest.fn()}}>
				{children}
			</WeatherServiceContext.Provider>
		);

		const {result, rerender} = renderHook(() => useWeatherService(), {
			wrapper: ({children}) => <Wrapper service={alphaWeatherService}>{children}</Wrapper>,
		});

		expect(result.current).toBe(alphaWeatherService);

		rerender({
			wrapper: ({children}: { children: React.ReactNode }) => <Wrapper
				service={betaWeatherService}>{children}</Wrapper>
		});

		expect(result.current).toEqual(betaWeatherService);
	});
});
