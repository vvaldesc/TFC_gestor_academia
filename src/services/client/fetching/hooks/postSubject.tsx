const url = 'http://localhost:4321/api/subjects/subjects';
import axios from "axios";
import type { Subject } from "@/models/types";

const postSubject = async (subject: Subject) => {
    try {
      console.log(subject);
      const response = await axios.post(url, JSON.stringify(subject), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error: any) { // Explicitly type error as any
      return error.message || 'Unknown error occurred';
    }
  };

  export default postSubject;