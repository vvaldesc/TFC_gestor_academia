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
        method: 'POST',
        url: 'https://open-weather13.p.rapidapi.com/city/landon/EN',
        headers: {
          'X-RapidAPI-Key': import.meta.env.PUBLIC_OPENWEATHER_API_KEY,
          'X-RapidAPI-Host': import.meta.env.PUBLIC_OPENWEATHER_API_HOST,
          // No necesitas establecer 'Content-Type': 'multipart/form-data'
          // Axios lo hará automáticamente cuando pases un objeto FormData
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