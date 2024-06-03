import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetClients = () => {
    const [clients, setClients] = useState([]);
    const [loadingClients, setLoadingClients] = useState(true);
    const [errorClients, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4321/api/clients/clients');
                setClients(response.data);
                setLoadingClients(false);
            } catch (error) {
                setError(error);
                setLoadingClients(false);
            }
        };

        fetchData();
    }, []);

    return { clients, loadingClients, errorClients };
};

export default useGetClients;