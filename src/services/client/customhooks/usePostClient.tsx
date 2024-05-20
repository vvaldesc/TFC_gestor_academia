import { useState, useEffect } from 'react';
import axios from 'axios';
import type {Client} from "@/models/types"; // prettier-ignore

const url = 'http://localhost:4321/api/clients/clients';

export const usePostClient = (client: Client, validPhoto: boolean, submit: boolean) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (body: any) => {
    setIsLoading(true);
    console.log("carga foto deberia ser true"+isLoading);
    
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
      console.log("carga foto deberia ser false"+isLoading);
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
      postData(client);
    }
  }, [validPhoto, submit]);

  return { sentData: client,
     postClientLoading: isLoading ,
     postClientError: error,
    postData: data };
};

export default usePostClient;