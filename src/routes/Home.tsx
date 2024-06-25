import { useEffect } from "react";
import Api from "../services/Api";
function Home() {
  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;

    async function getFilmes() {
      const response = await Api.get("movie/now_playing", {
        params: {
          api_key: apiKey,
          language: "pt-BR",
          page: 1,
        },
      });
      console.log(response);
    }
    getFilmes();
  }, []);
  return (
    <div>
      <h1>home</h1>
    </div>
  );
}

export default Home;
