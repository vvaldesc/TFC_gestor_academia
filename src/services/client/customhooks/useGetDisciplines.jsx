import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetDisciplines = () => {
    const [disciplines, setDisciplines] = useState([]);
    const [loadingDisciplines, setLoadingDisciplines] = useState(true);
    const [errorDisciplines, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4321/api/disciplines/disciplines');
                setDisciplines(response.data);
                setLoadingDisciplines(false);
            } catch (error) {
                setError(error);
                setLoadingDisciplines(false);
            }
        };

        fetchData();
    }, []);

    return { disciplines, loadingDisciplines, errorDisciplines };
};

export default useGetDisciplines;