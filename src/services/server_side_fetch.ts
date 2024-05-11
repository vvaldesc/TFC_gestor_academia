import type { Client } from "@/consts/types";

export const fetchClientById = async (id: number): Promise<Client | undefined> => {
    try {
        const response = await fetch(`http://localhost:4321/api/clients/${id}`);
        const data: any = await response.json();
        const client: Client = await data.result[0];
        return client;
    } catch (error) {
        console.error("Error fetching client data:", error);
    }
};
