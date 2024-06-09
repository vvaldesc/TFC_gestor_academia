import { useEffect, useState } from "react";
import axios from "axios";
import { Role } from "@/models/types";

const useGetDetailsProfile = (role, id) => {
  const [details, setDetails] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = null;
        switch (role) {
          case 'Clients':
            response = await axios.get(
              `http://localhost:4321/api/serviceConsumptions/client/${id}`
            );
            break;
          case 'Students':
            response = await axios.get(
              `http://localhost:4321/api/serviceConsumptions/student/${id}`
            );
            break;

          case 'Teachers':
            response = await axios.get(
              `http://localhost:4321/api/serviceConsumptions/teacher/${id}`
            );
            break;
          default:
            break;
        }

        setDetails(response.data);
        console.log(response);
        setLoadingDetails(false);
      } catch (error) {
        setError(error);
        setLoadingDetails(false);
      }
    };

    id && fetchData();
  }, []);

  return { details, loadingDetails, error };
};

export default useGetDetailsProfile;
