import type { Client, Result, Teacher, Student } from "@/models/types";

export const fetchClientById = async (id: number): Promise<Client | undefined> => {
    try {
        const response = await fetch(`http://localhost:4321/api/clients/id/${id}`);// BD petition
        const data = await response.json();
        const result: Result = data.result as Result;
        const client: Client = await result.data[0];
        return client;
    } catch (error) {
        console.error("Error fetching client data:", error);
    }
};

export const fetchClientByEmail = async (email: string): Promise<Client | Teacher | Student | undefined> => {
    try {
        const response = await fetch(`http://localhost:4321/api/clients/email/${email}`);// BD petition
        const data = await response.json();
        const result: Result = data.result as Result;
        if (data.count > 1) 
            throw new Error("Query by unique key returned more than one registers.");
        const client: Client = await result.data[0];
        return client;
    } catch (error) {
        console.error("Error fetching client data:", error);
    }
};

export const fetchProfileByEmail = async (email: string): Promise<{profile: Client | Student | Teacher | undefined; table: string}> => {
    try {
        const response = await fetch(`http://localhost:4321/api/misc/profile/email/${email}`);// BD petition
        let data = await response.json();
        const result: Result = data.result as Result;
        if (data.count > 1) 
            throw new Error("Query by unique key returned more than one registers.");
        const id: number = result.data.rows[0][0] as number;
        const table: string = result.data.rows[0][1] as string;
        console.log("Profile fetched by email: ", id, table);
        switch (table) {
            case "Clients":
                return {
                    profile: await fetchClientById(id),
                    table: table
                };// BD petition
            default:
                throw new Error("Role not found.");
        }
    } catch (error) {
        console.error("Error fetching client data:", error);
    }
    return {profile: undefined, table: ""};
};

export const servicecheck = async (): Promise<Boolean> => {
    try {
        const response = await fetch(`http://localhost:4321/api/misc/ping/ping`);// BD petition
        let data = await response.json();
        const result: Result = data.result as Result;
        return result.data === "ping" ? false : true;
    } catch (error) {
        console.error("Error fetching ping data:", error);
        return false;
    }
};