import { useState, useEffect } from 'react';
import axios from 'axios';
import type {Client} from "@/models/types"; // prettier-ignore

const url = 'http://localhost:4321/api/clients/clients';

export const usePostClient = (client: Client, validPhoto: boolean, submit: boolean) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let clientAux = {} as Client;
  clientAux = client;

  const postData = async (body: any) => {
    setIsLoading(true);

    async function fetch() {
      console.log('fetching');
      console.log("json"+JSON.stringify(body));
      const response = await axios.post(url, JSON.stringify(body), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData(response.data);
      setIsLoading(false);
    }

    try {
      await fetch();
    } catch (error: any) { // Explicitly type error as any
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (validPhoto && submit) {
      postData(clientAux);
    }
  }, [validPhoto, submit]);

  return { sentData: client,
     postClientLoading: isLoading ,
     postClientError: error,
    postData: postData };
};

export default usePostClient;