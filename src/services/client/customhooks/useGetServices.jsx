import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetServices = () => {
    const [services, setServices] = useState([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [errorServices, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4321/api/services/services');
                setServices(response.data);
                setLoadingServices(false);
            } catch (error) {
                setError(error);
                setLoadingServices(false);
            }
        };
        fetchData();
    }, []);

    return { services, loadingServices, errorServices };
};

export default useGetServices;