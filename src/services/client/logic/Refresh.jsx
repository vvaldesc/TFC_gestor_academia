import React, { useEffect } from 'react';

function Refresh() {
  useEffect(() => {
    console.log("hola");

    setTimeout(() => {
      console.log("onload");
      var url = new URL(window.location.href); // get the current url of page into variable
      var reloaded = url.searchParams.get("reloaded"); // get the 'reloaded' parameter from the url
      if (!reloaded) {
        // 'reloaded' parameter does not exist
        url.searchParams.set("reloaded", "true"); // add the 'reloaded' parameter to the url
        console.log(url.href);
        window.location = url.href; // "reload" the page
      }
    }, 4000);
  }, []); // empty dependency array means this effect runs once on mount

  return null; // return null if you don't want to render anything
}

export default Refresh;