import { useState } from 'react';
import axios from 'axios';
import type {Client} from "@/models/types"; // prettier-ignore

const url = 'http://localhost:4321/clients';

export const usePostClient = (client: Client, submit: boolean) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (body: any) => {
    setIsLoading(true);
    async function fetch() {
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData(response.data);
      setIsLoading(false);
    }
    try {
      if (submit) await fetch();
    } catch (error: any) { // Explicitly type error as any
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