import { useEffect, useState } from "react";
import axios from "axios";

import type { Weather_res } from "@/models/types";
import { WeatherParams } from "@/consts/consts";

const getforecast = () => {
  console.log({ useGetforecast: WeatherParams });
  const forecast = {} as Weather_res;
  const options = {
    method: 'GET',
    url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',
    params: {
      lat: '39.8',
      lon: '5.5',
      units: 'imperial',
      lang: 'en'
    },
    headers: {
      'x-rapidapi-key': import.meta.env.PUBLIC_OPENWEATHER_API_KEY,
      'x-rapidapi-host': import.meta.env.PUBLIC_OPENWEATHER_API_HOST
    }
  };

  const fetchData = async () => {
    try {
      console.log({ "useGetforecast entra": options });
      const response = await axios.request(options);
      console.log("useGetforecast response", response);
    } catch (error) {
      console.log("useGetforecast error", error);
    }
  };

  fetchData();
  return forecast;
};

export default getforecast;
