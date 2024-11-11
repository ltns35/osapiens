import React, {useState} from "react";
import {alphaWeatherService} from "@/api/AlphaWeatherService";
import WeatherService, {defaultWeatherService} from "@/api/WeatherService";
import {betaWeatherService} from "@/api/BetaWeatherService";

interface WeatherServiceContextType {
    service: WeatherService,
    updateService: (service: WeatherService) => void
}

export const WeatherServiceContext = React.createContext<WeatherServiceContextType>({
    service: defaultWeatherService,
    updateService(service: WeatherService): void {
    }
});

export const WeatherServiceProvider = ({children}: { children: React.ReactNode }) => {
    const [service, setService] = useState(defaultWeatherService);

    const updateService = (service: WeatherService) => {
        setService(service);
    };

    return (
        <WeatherServiceContext.Provider value={{service, updateService}}>
            {children}
        </WeatherServiceContext.Provider>
    );
};
