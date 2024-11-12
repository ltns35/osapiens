import React, {useState} from "react";
import WeatherService, {defaultWeatherService} from "@/services/WeatherService";

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
