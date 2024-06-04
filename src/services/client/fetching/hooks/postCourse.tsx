const url = 'http://localhost:4321/api/courses/courses';
import axios from "axios";
import type { Courses } from "@/models/types";

const postCourse = async (courses: Courses) => {
    try {
      console.log(courses);
      const response = await axios.post(url, JSON.stringify(courses), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error: any) { // Explicitly type error as any
      return error.message || 'Unknown error occurred';
    }
  };

  export default postCourse;