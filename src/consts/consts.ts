import type {WeatherParams_req} from "@/models/types";
import { OPENWEATHER, WEB_URL_PORT } from '@/consts/config';

export const MAX_CUSTOMERS_PER_PERIOD: number = 10;
export const MINUTES_IN_A_PERIOD: number = 30;
export const CITY: string = 'Navalmoral de la mata';
export const CITY_LAT: number = 39.9;
export const CITY_LON: number = -5.53;

export const WEB_URL: any = WEB_URL_PORT;


export const WeatherParams: WeatherParams_req = {
    url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily',
    apiKey: OPENWEATHER.OPENWEATHER_KEY as string,
    apiHost: OPENWEATHER.OPENWEATHER_HOST as string,
    body: {
        lat: '39.9',
        lon: '-5.53',
        units: 'metric',
        lang: 'en'
    }
}