import { signOut } from 'auth-astro/client'; // Ajusta la importación según sea necesario
import {deleteCookieLoacalStorage} from "@/services/client/utils/utils_typed";

function Logout_react() {
  return (
      <a className="block border-fuchsia-100 border-e-gray-950 cursor-pointer" onClick={() => {
        deleteCookieLoacalStorage();
        signOut();
      }}>Sign Out</a>
  );
}
export default Logout_react;