const url = 'http://localhost:4321/api/studentsubjectenrolments/studentsubjectenrolments';
import axios from "axios";

const postFault = async (enrolment: any) => {
    try {
      console.log(enrolment);
      const response = await axios.post(url, JSON.stringify(enrolment), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error: any) { // Explicitly type error as any
      return error.message || 'Unknown error occurred';
    }
  };

  export default postFault;