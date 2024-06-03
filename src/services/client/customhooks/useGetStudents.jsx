import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetStudents = () => {
    const [students, setStudents] = useState([]);
    const [loadingStudents, setLoadingStudents] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4321/api/students/students');
                setStudents(response.data);
                setLoadingStudents(false);
            } catch (error) {
                setError(error);
                setLoadingStudents(false);
            }
        };

        fetchData();
    }, []);

    return { students, loadingStudents, error };
};

export default useGetStudents;