import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetDetails = () => {
    const [details, setDetails] = useState([]);
    const [loadingDetails, setLoadingDetails] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4321/api/serviceConsumptions/serviceConsumptions');
                setDetails(response.data);
                setLoadingDetails(false);
            } catch (error) {
                setError(error);
                setLoadingDetails(false);
            }
        };

        fetchData();
    }, []);

    return { details, loadingDetails, error };
};

export default useGetDetails;