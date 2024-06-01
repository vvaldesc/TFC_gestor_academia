import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loadingTeachers, setLoadingTeachers] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4321/api/teachers/teachers');
                setTeachers(response.data);
                setLoadingTeachers(false);
            } catch (error) {
                setError(error);
                setLoadingTeachers(false);
            }
        };

        fetchData();
    }, []);

    return { teachers, loadingTeachers, error };
};

export default useGetTeachers;