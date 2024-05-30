import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Client } from "@/models/types"; // prettier-ignore
import imageCompression from 'browser-image-compression';

const url = 'http://localhost:4321/api/clients/clients';

async function handleImageUpload(img): Promise<string | ArrayBuffer> {
  const imageFile = img;
  const options = {
    maxSizeMB: 0.2, // (max file size in MB)
    maxWidthOrHeight: 1920, // (max width or height in pixel)
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);
    return new Promise((resolve, reject) => {
      reader.onloadend = function() {
        const base64data = reader.result;
        resolve(base64data);
      };
      reader.onerror = reject;
    });
  } catch (error) {
    console.log(error);
  }
}

export const usePostClient = (client: Client, validPhoto: boolean, submit: boolean) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ok, setOk] = useState(false as boolean);

  const postData = async (body: Client) => {
    setIsLoading(true);
    try {
      client.image = await handleImageUpload(client.image) as string;
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
