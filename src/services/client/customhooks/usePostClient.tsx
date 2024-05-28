import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Client } from "@/models/types"; // prettier-ignore

const url = 'http://localhost:4321/api/clients/clients';

export const usePostClient = (client: Client, validPhoto: boolean, submit: boolean) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ok, setOk] = useState(false as boolean);

  const postData = async (body: Client) => {
    setIsLoading(true);
    try {
      client.image = "";
      const response = await axios.post(url, JSON.stringify(body), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData(response.data);
      setOk(response.status === 201);
    } catch (error: any) { // Explicitly type error as any
      setError(error.message || 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (validPhoto && submit) {
      postData(client);
    }
  }, [validPhoto, submit, client]); // Add client to dependencies

  return {
    sentData: client,
    postClientLoading: isLoading,
    postClientError: error,
    postData: data,
    clientOk: ok,
  };
};

export default usePostClient;
