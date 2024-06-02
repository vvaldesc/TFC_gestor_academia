import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetBalances = () => {
    const [balances, setBalances] = useState([]);
    const [loadingBalances, setLoadingBalances] = useState(true);
    const [errorBalances, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4321/api/misc/balance/balance');
                setBalances(response.data);
                setLoadingBalances(false);
            } catch (error) {
                setError(error);
                setLoadingBalances(false);
            }
        };

        fetchData();
    }, []);

    return { balances, loadingBalances, errorBalances };
};

export default useGetBalances;