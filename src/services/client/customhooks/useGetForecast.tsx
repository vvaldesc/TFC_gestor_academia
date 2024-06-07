import { useEffect, useState } from 'react';
import axios from 'axios';

import type { Weather_res } from '@/models/types';
import { WeatherParams } from '@/consts/consts';

const useGetforecast = () => {
    // const [forecast, setForecast] = useState({} as Weather_res);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // console.log({"useGetforecast": WeatherParams});

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //           console.log({"useGetforecast entra": options});
    //             const response = await axios.request(options);
    //             setForecast(response.data);
    //             console.log("useGetforecast response", response);
    //             setLoading(false);
    //         } catch (error) {
    //             setError(error);
    //             console.log("useGetforecast error", error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);
    // return { forecast: forecast, loadingForecast: loading, errorForecast: error };
    return { forecast: null, loadingForecast: false, errorForecast: null };
};

export default useGetforecast;