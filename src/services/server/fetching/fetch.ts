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

export const fetchTeacherById = async (id: number): Promise<Teacher | undefined> => {
    try {
        const response = await fetch(`http://localhost:4321/api/teachers/id/${id}`); // BD petition
        const data = await response.json();
        const result: Result = data.result as Result;
        const teacher: Teacher = await result.data[0];
        return teacher;
    } catch (error) {
        console.error("Error fetching teacher data:", error);
    }
};

export const fetchStudentById = async (id: number): Promise<Student | undefined> => {
    try {
        const response = await fetch(`http://localhost:4321/api/students/id/${id}`); // BD petition
        const data = await response.json();
        const result: Result = data.result as Result;
        const student: Student = await result.data[0];
        return student;
    } catch (error) {
        console.error("Error fetching student data:", error);
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

export const fetchProfileByEmail = async (email: string): Promise<{profileResut: any | undefined; table: string}> => {
    let profileResut: any | undefined = undefined;
    try {
        const response = await fetch(`http://localhost:4321/api/misc/profile/email/${email}`);// BD petition
        profileResut = await response.json();
        console.log("Profile fetched by email: ", profileResut);
    } catch (error) {
        console.error("Error fetching client data:", error);
    }
    return {profileResut: profileResut, table: ""};
};

export const servicecheck = async (): Promise<Boolean> => {
    try {
        const response = await fetch(`http://localhost:4321/api/misc/ping/ping`);// BD petition
        return response.ok ? true : false;
    } catch (error) {
        console.error("Error fetching ping data:", error);
        return false;
    }
};