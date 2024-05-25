import { useEffect, useState } from 'react';
import axios from 'axios';

import type { Weather_res } from '@/models/types';
import { WeatherParams } from '@/consts/consts';

const useGetforecast = () => {
    const [forecast, setForecast] = useState({} as Weather_res);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log({"useGetforecast": WeatherParams});
    
    const options = {
      method: 'GET',
      url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily',
      params: {
        lat: '39.9',
        lon: '-5.53',
        units: 'metric',
        lang: 'en'
      },
      headers: {
        'X-RapidAPI-Key': '48567d431cmsh583fa88451108d8p1363d5jsn75f4e6b8c599',
        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
      }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
              console.log({"useGetforecast entra": options});
                const response = await axios.request(options);
                setForecast(response.data);
                console.log("useGetforecast response", response);
                setLoading(false);
            } catch (error) {
                setError(error);
                console.log("useGetforecast error", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return { forecast: forecast, loadingForecast: loading, errorForecast: error };
};

export default useGetforecast;