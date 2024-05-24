import { useState, useEffect } from "react";
import axios from "axios";
import type { ServicePredictionPost_type } from "@/models/types";

const url = "http://localhost:4321/api/misc/mailer/mailer";

export const usePostMailer = (serviceConsumption: ServicePredictionPost_type) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (body: ServicePredictionPost_type) => {
    console.log("usePostMailer entra", body);
    debugger;
    setIsLoading(true);
    try {
      const response = await axios.post(url, JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    } catch (error: any) {
      // Explicitly type error as any
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("usePostBooking", serviceConsumption);
    if (serviceConsumption.reserved_at && serviceConsumption.employee_salary) {
      postData(serviceConsumption);
    }
  }, [serviceConsumption]);

  return {
    mailResponse: data,
    loadingMailing: isLoading,
    errorMailing: error,
  };
};

export default usePostMailer;