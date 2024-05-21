<script>
  import { onMount } from "svelte";
  onMount(() => {
    setTimeout(() => {
      console.log("onload");
      var url = new URL(window.location.href); // get the current url of page into variable
      var render = url.searchParams.get("render"); // get the 'reloaded' parameter from the url
      if (!render) {
        // 'reloaded' parameter does not exist
        url.searchParams.set("render", "true"); // add the 'reloaded' parameter to the url
        console.log(url.href);
        window.location = url.href; // "reload" the page
      }
    }, 40);
  });
</script>
