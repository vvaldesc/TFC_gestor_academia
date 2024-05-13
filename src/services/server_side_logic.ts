//import type { Client } from "@/consts/types";
import type { Session } from "@auth/core/types";
import type { ClientSession, Client, Teacher, Student, ProfileSession } from "@/consts/types";
import { SessionState } from "@/consts/types";

import { fetchProfileByEmail } from "@/services/server_side_fetch";

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

export const sessionHandler = async (session: Session | null): Promise<ProfileSession> => {
  let result: ProfileSession = {
    OAuth: {} as Session,
    profile: {} as Client | Student | Teacher,
    role: "" as string,
    profilePhotoSrc: "" as string,
  };
  // If google login doesn't return name or email
  if (!validateOAuth(session)) {
    console.log("Google login didn't return valid data.");
    return result;
  }
  result.OAuth = session as Session;
  console.log("Session data: ", session);
  // Fetch profile by email from web database
  const {profile , table} = await fetchProfileByEmail(session?.user?.email as string);// BD petition
  console.log("Client fetched by email: ", profile);
  // If client is registered
  if (profile) {
    const profilePhotoSrc: string = profile.image || session?.user?.image || "/images/default_profile.png";
    result.profile = profile;
    result.profilePhotoSrc = profilePhotoSrc;
    result.role = table;
    return result;
  } else {
    console.log("Client is not registered in web database.");
    return result;
  }
};

export async function sessionStateCheck(sessionInfo: ProfileSession): Promise<SessionState> {
  try {
    if (!sessionInfo.OAuth || !sessionInfo.OAuth.user?.name || !sessionInfo.OAuth.user.email) {
      console.error("No hay sesión activa OAuth.");
      return SessionState.WithoutSession;
    }
    if (sessionInfo.profile == null || !sessionInfo.profile.id || !sessionInfo.profile.email) {
      console.error("El cliente tiene sesión OAuth pero necesita registrarse");
      return SessionState.NeedsRegister;
    }
    return SessionState.Registered;
  } catch (error) {
    console.error(error);
    throw new Error("Error al verificar el estado de la sesión");
  }
}
