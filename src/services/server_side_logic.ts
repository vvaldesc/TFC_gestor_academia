//import type { Client } from "@/consts/types";
import type { Session } from "@auth/core/types";
import type { ClientSession, Client } from "@/consts/types";
import { SessionState } from "@/consts/types";

import { fetchClientByEmail } from "@/services/server_side_fetch";

export function validateOAuth(session: Session | null): boolean {
  if (!session) {
    console.log("No session data.");
    return false;
  }

  if (!session.user) {
    console.log("No user data in session.");
    return false;
  }

  if (!session.user.name) {
    console.log("No user name in session.");
    return false;
  }

  if (!session.user.email) {
    console.log("No user email in session.");
    return false;
  }

  return true;
}


export const sessionHandler = async (session: Session | null): Promise<ClientSession> => {
  let result: ClientSession = {
    OAuth: {} as Session,
    client: {} as Client,
    role: "client" as string,
    profilePhotoSrc: "" as string,
  };
  // If google login doesn't return name or email
  if (!validateOAuth(session)) {
    console.log("Google login didn't return valid data.");
    return result;
  }
  result.OAuth = session as Session;
  // Fetch client by email from web database
  const client = await fetchClientByEmail(session?.user?.email as string);
  // If client is registered
  if (client) {
    const profilePhotoSrc: string = client.image || session?.user?.image || "/images/default_profile.png";
    result.client = client;
    result.profilePhotoSrc = profilePhotoSrc;
    return result;
  } else {
    console.log("Client is not registered in web database.");
    return result;
  }
};

export async function sessionStateCheck(sessionInfo: ClientSession): Promise<SessionState> {
  try {
    if (!sessionInfo.OAuth) {
      console.error("No hay sesión activa OAuth.");
      return SessionState.WithoutSession;
    }

    if (sessionInfo.client == null || !sessionInfo.client.id || !sessionInfo.client.email) {
      console.error("El cliente tiene sesión OAuth pero necesita registrarse");
      return SessionState.NeedsRegister;
    }

    return SessionState.Registered;
  } catch (error) {
    console.error(error);
    throw new Error("Error al verificar el estado de la sesión");
  }
}
