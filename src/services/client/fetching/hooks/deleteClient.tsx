const baseUrl = 'http://localhost:4321/api/misc/profile/email';
import axios from "axios";
import type { Client } from "@/models/types";

const deactivateClient = async (client: Client) => {
    const url = `${baseUrl}/${client.email}`;
    try {
        if(!client.email) throw new Error('Client email is required');
        const response = await axios.put(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error: any) { // Explicitly type error as any
        throw new Error(error.message || 'Unknown error occurred');
    }
};

export default deactivateClient;