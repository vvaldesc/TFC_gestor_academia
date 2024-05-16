import { useState } from 'react';
import axios from 'axios';
import type {Client} from "@/models/types"; // prettier-ignore

const url = 'http://localhost:4321/clients';

export const usePostClient = (client: Client) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (body: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { sentData: client,
     postClientLoading: isLoading ,
     postClientError: error,
    postData: postData };
};

export default usePostClient;