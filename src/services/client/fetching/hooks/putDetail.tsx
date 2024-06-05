const url = 'http://localhost:4321/api/serviceConsumptions/serviceConsumptions';
import axios from "axios";
import type { ServiceConsumption_type } from "@/models/types";

const postDetail = async (serviceConsumption: ServiceConsumption_type) => {
    try {
      console.log(serviceConsumption);
      serviceConsumption.state = 'Cancelled';
      const response = await axios.put(url, JSON.stringify(serviceConsumption), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error: any) { // Explicitly type error as any
      return error.message || 'Unknown error occurred';
    }
  };

  export default postDetail;