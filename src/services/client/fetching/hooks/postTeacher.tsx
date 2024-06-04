const url = 'http://localhost:4321/api/teachers/teachers';
import axios from "axios";
import type { Teacher } from "@/models/types";

const postTeacher = async (teacher: Teacher) => {
    try {
      console.log(teacher);
      const response = await axios.post(url, JSON.stringify(teacher), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error: any) { // Explicitly type error as any
      return error.message || 'Unknown error occurred';
    }
  };

  export default postTeacher;