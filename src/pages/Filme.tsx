import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../services/Api";
import Loader from "../components/ui/loader";
import { Button } from "../components/ui/button";

interface dataFilme {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

function Filme() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [filme, setFilme] = useState<dataFilme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await Api.get(`/movie/${id}`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: "pt-BR",
        },
      })
        .then((res) => {
          setFilme(res.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/", { replace: true });
          return;
        });
    }
    loadFilme();
  }, [id, navigate]);

  return (
    <section className="flex min-h-screen items-center justify-center">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex max-w-xs flex-col space-y-4">
          <img
            src={`https://tmdb.org/t/p/original${filme?.poster_path}`}
            alt={filme?.title}
            className="rounded-xl"
          />
          <h2 className="text-xl font-bold">{filme?.title}</h2>
          <p className="text-sm text-slate-700">{filme?.overview}</p>
          <p>{filme?.release_date}</p>
          <div className="flex flex-row space-x-2">
            <Button>Salvar</Button>
            <Button variant="secondary">
              <a
                target="blank"
                rel="external"
                href={`https://youtube.com/results?search_query=${filme?.title}+Trailer`}
              >
                Ver trailer
              </a>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Filme;
