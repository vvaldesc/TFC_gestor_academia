//import type { Client } from "@/consts/types";
import type { Session } from "@auth/core/types";
import type { Client, Teacher, Student, ProfileSession } from "@/models/types";
import { SessionState } from "@/models/types";

import {
  fetchProfileByEmail,
  fetchClientById,
  fetchStudentById,
  fetchTeacherById,
} from "@/services/server/fetching/fetch";

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

export const sessionHandler = async (
  session: Session | null
): Promise<ProfileSession> => {
  let result: ProfileSession = {
    OAuth: {} as Session,
    profile: {} as Client | Student | Teacher,
    role: "" as string,
    profilePhotoSrc: "" as string,
  };

  if (!validateOAuth(session)) {
    console.log("Google login didn't return valid data.");
    return result;
  }

  result.OAuth = session as Session;
  result.profilePhotoSrc = result.OAuth.user?.image as string;

  // Fetch profile by email from web database
  console.log("Fetching profile by email...");
  console.log("Session email: ", session?.user?.email);
  const { profileResut } = await fetchProfileByEmail(
    session?.user?.email as string
  ); // BD petition
  console.log("Profile fetched: ");
  console.log(profileResut);
  // If client is registered
  if (profileResut) {
    let profile: Client | Student | Teacher | undefined = undefined;
    console.log(profileResut.result.data.tableName)
    switch (profileResut.result.data.tableName) {
      case "Clients":
        profile = await fetchClientById(profileResut.result.data.id);
        break;
      case "Teachers":
        profile = await fetchTeacherById(profileResut.result.data.id);
        break;
      case "Students":
        profile = await fetchStudentById(profileResut.result.data.id);
        break;
      default:
        break;
    }

    result.profile = profile;
    result.role = profileResut.result.data.tableName;
    return result;
  } else {
    console.log("Profile is not registered in web database.");
    return result;
  }
};

export async function sessionStateCheck(
  sessionInfo: ProfileSession
): Promise<SessionState> {
  try {
    if (
      !sessionInfo.OAuth ||
      !sessionInfo.OAuth.user?.name ||
      !sessionInfo.OAuth.user.email
    ) {
      console.error("No hay sesión activa OAuth.");
      return SessionState.WithoutSession;
    }
    if (
      sessionInfo.profile == null ||
      !sessionInfo.profile.id ||
      !sessionInfo.profile.email
    ) {
      console.error("El cliente tiene sesión OAuth pero necesita registrarse");
      return SessionState.NeedsRegister;
    }
    return SessionState.Registered;
  } catch (error) {
    console.error(error);
    throw new Error("Error al verificar el estado de la sesión");
  }
}

export const parseRole = (role: string): string => {
  switch (role) {
    case "Clients":
      return "Cliente";
    case "Students":
      return "Estudiante";
    case "Teachers":
      return "Profesor";
    default:
      return "Cliente";
  }
};
