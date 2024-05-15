import { useEffect, useState } from "react";

export const default useCheckProfilePhoto = () => {
  const url = ``;
  const [films, setFilms] = useState(null);
  const [loading, setLoading] = useState("Cargando...");
  useEffect(() => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        console.log(data)
        setFilms(data);
        setLoading(null);
      });
  }, [url]);

  return {
    film: films || [],
    loading: !films,
    error: null,
  };
};