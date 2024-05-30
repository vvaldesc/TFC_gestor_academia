export const deleteCookieLoacalStorage = () => {
  if (
    typeof document !== "undefined" &&
    typeof localStorage !== "undefined"
  ) {
    document.cookie = `sessionInfoState=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    localStorage.removeItem('profilePhotoSrc');
  }
};