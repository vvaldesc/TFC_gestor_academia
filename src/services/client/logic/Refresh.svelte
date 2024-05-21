<script>
  import { onMount } from "svelte";
  onMount(() => {
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
    }, 1000);
  });
</script>
