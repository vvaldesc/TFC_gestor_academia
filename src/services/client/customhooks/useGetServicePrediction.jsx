import { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'http://127.0.0.1:5000/api/estimatedtime';

const useGetServicePrediction = (body) => {
    debugger
    const [estimatedTime, setEstimatedTime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async (dateString) => {
        try {
            const body = {
                date: dateString
            };
            const response = await axios.post(url, body);
            setEstimatedTime(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        dateString && fetchData(body);
    }, []);

    return { estimatedTime, loading, error };
};

export default useGetServicePrediction;