const url = 'http://localhost:4321/api/clients/clients';
import axios from "axios";
import type { Client } from "@/models/types";

const postData = async (client: Client) => {
    try {
      console.log(client);
      const response = await axios.post(url, JSON.stringify(client), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error: any) { // Explicitly type error as any
      return error.message || 'Unknown error occurred';
    }
  };

  export default postData;