const url = 'http://localhost:4321/api/students/students';
import axios from "axios";
import type { Student } from "@/models/types";

const postStudent = async (student: Student) => {
    try {
      console.log(student);
      const response = await axios.post(url, JSON.stringify(student), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error: any) { // Explicitly type error as any
      return error.message || 'Unknown error occurred';
    }
  };

  export default postStudent;