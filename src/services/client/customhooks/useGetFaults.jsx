import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetFaults = () => {
    const [faults, setFaults] = useState([]);
    const [loadingFaults, setLoadingFaults] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4321/api/studentsubjectfaults/studentsubjectfaults');
                setFaults(response.data);
                setLoadingFaults(false);
            } catch (error) {
                setError(error);
                setLoadingFaults(false);
            }
        };

        fetchData();
    }, []);

    return { faults, loadingFaults, error };
};

export default useGetFaults;