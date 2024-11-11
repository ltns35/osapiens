import {useContext} from "react";
import {WeatherServiceContext} from "@/services/WeatherServiceProvider";

export const useWeatherService = () => {
    return useContext(WeatherServiceContext).service;
};
