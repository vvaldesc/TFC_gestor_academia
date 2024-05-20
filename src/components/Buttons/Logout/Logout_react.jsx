import { signOut } from 'auth-astro/client'; // Ajusta la importación según sea necesario

function Logout_react() {
  return (
      <a className="block border-fuchsia-100 border-e-gray-950 cursor-pointer" onClick={() => {
        document.cookie = "sessionInfoState=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        signOut();
      }}>Sign Out</a>
  );
}
export default Logout_react;