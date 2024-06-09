const url = 'http://localhost:4321/api/employees/employees';
import axios from "axios";
import type { Employee } from "@/models/types";

const postEmployee = async (employee: Employee) => {

        const employeeAux = {
          salary: employee.salary,
          teacher_id: employee.teacher_id,
          student_id: employee.student_id,
          social_security: employee.social_security,
        }

    try {
      console.log(employeeAux);
      const response = await axios.post(url, JSON.stringify(employeeAux), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error: any) { // Explicitly type error as any
      return error.message || 'Unknown error occurred';
    }
  };

  export default postEmployee;