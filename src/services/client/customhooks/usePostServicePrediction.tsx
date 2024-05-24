import { useState, useEffect } from 'react';
import axios from 'axios';

import type {
    ServicePredictionPost_type
  } from "@/models/types";

const url = 'http://127.0.0.1:5000/api/estimatedtime';

const usePostServicePrediction = (booking: ServicePredictionPost_type) => {
    const [estimatedTime, setEstimatedTime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const postData = async (booking) => {
      console.log("usePostServicePrediction entra", booking);
      debugger;
        try {
            const body = booking;
            const response = await axios.post(url, body);
            console.log("usePostServicePrediction response", response);
            setEstimatedTime(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
      console.log("usePostServicePrediction", booking);
        if (booking.reserved_at && booking.employee_salary) {
          postData(booking);
        }
      }, [booking]);

    return { estimatedTime, loading, error };
};

export default usePostServicePrediction;