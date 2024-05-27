import { useState, useEffect } from "react";
import axios from "axios";
import type { ServiceConsumption_type, Result } from "@/models/types";

const url = "http://localhost:4321/api/serviceConsumptions/serviceConsumptions";

export const usePostBooking = (booking: ServiceConsumption_type) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (body: ServiceConsumption_type) => {
    console.log("usePostBooking entra", body);
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
    console.log("usePostBooking", booking);
    if (booking.employee_id && booking.service_id) {
      postData(booking);
    }
  }, [booking]);

  return {
    sentData: booking,
    postClientLoading: isLoading,
    postClientError: error,
    postData: data
  };
};

export default usePostBooking;