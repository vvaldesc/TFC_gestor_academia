import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetEnrolments = () => {
    const [enrolments, setEnrolments] = useState([]);
    const [loadingEnrolments, setLoadingEnrolments] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4321/api/stundentsubjectenrollments/stundentsubjectenrollments');
                setEnrolments(response.data);
                console.log('Enrolments',response.data);
                setLoadingEnrolments(false);
            } catch (error) {
                setError(error);
                setLoadingEnrolments(false);
            }
        };
        fetchData();
    }, []);
    return { enrolments, loadingEnrolments, error };
};

export default useGetEnrolments;