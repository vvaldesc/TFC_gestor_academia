export function checkRenderParameter(url) {
    console.log(url);
    if (url.includes("render=true")) {
      console.log("Contiene");
      return true;
    } else {
      console.log("No contiene");
      return false;
    }
  }