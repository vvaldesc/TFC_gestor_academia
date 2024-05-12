import type { Client } from "@/consts/types";
import type { Session } from "@auth/core/types";
import type { ClientSession } from "@/consts/types";

import { fetchClientByEmail } from "@/services/server_side_fetch";


export const isRegisteredClient = (Client: Client): boolean => {
        return true;
};

//type ClientSession = { client: Client } & { OAuth: Session } & { profilePhotoSrc: string };

export const sessionHandler = async (session: Session): Promise<ClientSession> => {
    // If google login doesn't return name or email
    if (!session || !session.user || !session.user.name || !session.user.email)
        throw new Error("Google login didn't return valid data.");
    const client = await fetchClientByEmail(session?.user?.email);
    // If client is registered
    if (client) {
        const profilePhotoSrc: string = client.image || session.user.image || "/images/default_profile.png";
        const result: ClientSession = {
            OAuth: session as Session, // Asegúrate de que esto cumpla con las expectativas de ClientSession
            client: client,
            profilePhotoSrc: profilePhotoSrc,
        };
        return result;
    } else {
        throw new Error("Client is not registered.");
    }
};
