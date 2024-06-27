import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../services/Api";
import Loader from "../components/ui/loader";
import Tag from "../components/ui/tag";
import { Button } from "../components/ui/button";
import Title from "../components/ui/title";
import { StarIcon } from "@radix-ui/react-icons";
import CarouselFilmes from "../components/Carousel/filmes";
import { toast } from "react-toastify";

interface Genre {
  id: number;
  name: string;
}

interface Filme {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  genres: Genre[];
}

interface FilmeSalvo {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  genres: Genre[];
}

function Filme() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [filme, setFilme] = useState<Filme | null>(null);
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
        })
        .finally(() => {
          setLoading(false);
        });
    }
    loadFilme();
  }, [id, navigate]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@moviefinder");
    let filmesSalvos: FilmeSalvo[] = [];

    if (minhaLista) {
      filmesSalvos = JSON.parse(minhaLista);
    }

    const hasFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme?.id,
    );

    if (hasFilme) {
      toast.warning("Este filme já existe na sua lista!");
      return;
    }

    // Converter o filme atual para o formato esperado de FilmeSalvo
    const filmeASalvar: FilmeSalvo = {
      id: filme?.id || "",
      title: filme?.title || "",
      overview: filme?.overview || "",
      poster_path: filme?.poster_path || "",
      vote_average: filme?.vote_average || 0,
      genres: filme?.genres || [],
    };

    filmesSalvos.push(filmeASalvar);
    localStorage.setItem("@moviefinder", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
  }

  return (
    <section className="flex flex-col items-center justify-center space-y-24 py-12">
      {loading ? (
        <Loader />
      ) : (
        <section className="flex w-full max-w-xs flex-col space-y-6 md:max-w-3xl md:flex-row md:space-y-0 lg:max-w-6xl">
          <img
            src={`https://tmdb.org/t/p/original${filme?.poster_path}`}
            alt={filme?.title}
            className="max-w-xs rounded-3xl object-cover object-center shadow md:max-w-sm"
          />

          <div className="flex flex-col justify-center space-y-6 md:px-12">
            <Title className="text-center text-3xl drop-shadow-xl md:text-left">
              {filme?.title}
            </Title>
            <div className="flex flex-col space-y-2">
              <Title>Sinopse</Title>
              <p className="text-lg text-slate-800">{filme?.overview}</p>
            </div>
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                <Title>Nota geral</Title>
                <div className="flex flex-row items-center space-x-1">
                  <StarIcon className="size-4" />
                  <p className="text-lg">{filme?.vote_average.toFixed(1)}/10</p>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Title>Gênero</Title>
                <div className="flex flex-row space-x-2">
                  {filme?.genres.map((genero) => (
                    <Tag key={genero.id} text={genero.name} />
                  ))}
                </div>
              </div>
              <div className="flex flex-row space-x-2">
                <Button onClick={salvarFilme}>Salvar</Button>
                <Button variant={"destructive"}>
                  <a
                    target="blank"
                    rel="external"
                    href={`https://youtube.com/results?search_query=${filme?.title}+Trailer`}
                  >
                    Trailer
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
      <div className="">
        <CarouselFilmes key={1} urlParam="popular" carouselTitle="Populares" />
      </div>
    </section>
  );
}

export default Filme;
