import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetWeeklieReport = () => {
    const [weeklieReports, setWeeklieReport] = useState([]);
    const [loadingWeeklieReport, setLoadingWeeklieReport] = useState(true);
    const [errorWeeklieReport, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4321/api/misc/weekly_details_report/weekly_details_report');
                setWeeklieReport(response.data);
                setLoadingWeeklieReport(false);
            } catch (error) {
                setError(error);
                setLoadingWeeklieReport(false);
            }
        };

        fetchData();
    }, []);

    return { weeklieReports, loadingWeeklieReport, errorWeeklieReport };
};

export default useGetWeeklieReport;