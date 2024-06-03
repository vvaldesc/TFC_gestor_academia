import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetSubjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [loadingSubjects, setLoadingSubjects] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4321/api/subjects/subjects');
                setSubjects(response.data);
                setLoadingSubjects(false);
            } catch (error) {
                setError(error);
                setLoadingSubjects(false);
            }
        };

        fetchData();
    }, []);

    return { subjects, loadingSubjects, error };
};

export default useGetSubjects;