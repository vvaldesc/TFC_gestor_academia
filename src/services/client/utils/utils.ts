export const deleteCookieLoacalStorage = (name: string) => {
  if (
    typeof document !== "undefined" &&
    typeof localStorage !== "undefined"
  ) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    localStorage.removeItem(name);
  }
};