import type { Client } from "@/consts/types";
import type { Session } from "@auth/core/types";
import type { ClientSession } from "@/consts/types";
import { SessionState } from "@/consts/types";

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
    const profilePhotoSrc: string =
      client.image || session.user.image || "/images/default_profile.png";
    const result: ClientSession = {
      //@ts-ignore
      OAuth: session as Session,
      client: client,
      profilePhotoSrc: profilePhotoSrc,
    };
    return result;
  } else {
    throw new Error("Client is not registered in web database.");
  }
};

export async function sessionStateCheck(sessionInfo: ClientSession): Promise<SessionState> {
  try {
    if (!sessionInfo.OAuth) {
      console.error("No hay sesión activa OAuth.");
      return SessionState.WithoutSession;
    }

    if (sessionInfo.client == null) {
      console.error("El cliente tiene sesión OAuth pero necesita registrarse");
      return SessionState.NeedsRegister;
    }

    return SessionState.Registered;
  } catch (error) {
    console.error(error);
    throw new Error("Error al verificar el estado de la sesión");
  }
}
