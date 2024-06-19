<script lang="ts">
  export let imgPerfil: string;

  import { onMount } from "svelte";

  function updateImgSrcset(src:string) {
    const images = document.querySelectorAll('img[id^="profileThumb"]');
    console.log("images:", images);  

    images.forEach((img) => {
      const currentSrcset = img.getAttribute("srcset");
      img.setAttribute("srcset", `${src} 0.2x ${src} 1x ${src} 2x`);
      img.setAttribute("src", src);
    });
  }

  function manageLocalStorage(imgPerfil: string) {
    if (imgPerfil){
      localStorage.setItem("profilePhotoSrc", imgPerfil);
    }
    else {
      imgPerfil = localStorage.getItem("profilePhotoSrc") as string;
    }
    return imgPerfil;
  }

  onMount(() => {
    (async () => {
      imgPerfil = manageLocalStorage(imgPerfil);
      if(imgPerfil!=null && imgPerfil!=undefined){
        updateImgSrcset(imgPerfil);
      }
    })();
  });
</script>