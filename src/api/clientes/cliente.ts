//import type { APIRoute } from "astro";

//api/clientes/id
export const GET = async () => {
    return new Response(JSON.stringify({ msg: "ola mundo" }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  };