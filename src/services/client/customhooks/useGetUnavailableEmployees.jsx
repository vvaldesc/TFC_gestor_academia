import { useEffect, useState } from "react";
import axios from "axios";
const url = "http://localhost:4321/api/employees/availableEmployees";

const useGetUnavailableEmployees = (date) => {
  const [unavailableEmployees, setUnavailableEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {date};
        const response = await axios.post(url, JSON.stringify(body), {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log({unav: response});
        const arr = response.data;
        setUnavailableEmployees(arr);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (date) {
      fetchData();
    }
  }, [date]);

  return { unavailableEmployees, loading, error };
};

export default useGetUnavailableEmployees;
