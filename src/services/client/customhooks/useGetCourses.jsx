import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4321/api/courses/courses');
                setCourses(response.data);
                setLoadingCourses(false);
            } catch (error) {
                setError(error);
                setLoadingCourses(false);
            }
        };

        fetchData();
    }, []);

    return { courses, loadingCourses, error };
};

export default useGetCourses;