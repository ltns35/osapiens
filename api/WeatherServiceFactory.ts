import {AlphaWeatherService} from "@/api/AlphaWeatherService";

type WeatherServiceType = 'alpha' | 'beta';

export function getWeatherService(provider: WeatherServiceType): WeatherService {

    switch (provider) {
        case 'alpha':
            return new AlphaWeatherService()
        case "beta":
            return new AlphaWeatherService()
    }
}
