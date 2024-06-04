const url = 'http://localhost:4321/api/studentsubjectfaults/studentsubjectfaults';
import axios from "axios";

const postFault = async (studentsubjectfaults: any) => {
    try {
      console.log(studentsubjectfaults);
      const response = await axios.post(url, JSON.stringify(studentsubjectfaults), {
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