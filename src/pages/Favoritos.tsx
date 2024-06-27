import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { toast } from "react-toastify";
import { StarIcon } from "@radix-ui/react-icons";
import Tag from "../components/ui/tag";
import Title from "../components/ui/title";
import { FaHeartBroken } from "react-icons/fa";
import { Separator } from "../components/ui/separator";

interface Filme {
  id: string;
  title: string;
  vote_average: number;
  poster_path: string;
  genres: Genre[];
}

interface Genre {
  id: string;
  name: string;
}

function Favoritos() {
  const [filmes, setFilmes] = useState<Filme[]>([]);

  function excluirFilme(id: string) {
    const filtroFilmes = filmes.filter((item) => item.id !== id);
    setFilmes(filtroFilmes);
    localStorage.setItem("@moviefinder", JSON.stringify(filtroFilmes));
    toast.success("Filme excluído com sucesso!");
  }

  useEffect(() => {
    const minhaLista = localStorage.getItem("@moviefinder");
    if (minhaLista) {
      setFilmes(JSON.parse(minhaLista));
    }
  }, []);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center space-y-6 py-12">
      {filmes.length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-2">
          <Title className="max-w-xs text-center md:max-w-xl">
            Você não possui nenhum filme salvo
          </Title>
          <FaHeartBroken className="size-6" />
        </div>
      )}

      {filmes.map((item) => (
        <section>
          <div
            key={item.id}
            className="flex w-full max-w-xs items-center justify-center rounded-xl ring-slate-300 md:max-w-3xl lg:max-w-6xl"
          >
            <span className="flex flex-col items-center space-y-8 md:flex-row md:justify-start md:space-x-12">
              <img
                src={`https://tmdb.org/t/p/original/${item.poster_path}`}
                alt={item.title}
                className="w-72 rounded-xl shadow-lg md:w-52"
              />
              <span className="flex flex-col items-center justify-center space-y-4 text-center md:items-start md:text-left">
                <Title>{item.title}</Title>
                <div className="flex flex-row items-center space-x-1">
                  <StarIcon />
                  <p className="text-slate-500">
                    {item.vote_average.toFixed(1)}/10
                  </p>
                </div>
                <div className="flex flex-row space-x-2">
                  {item.genres.map((genre) => (
                    <Tag text={genre.name} />
                  ))}
                </div>
              </span>
              <div className="flex flex-row space-x-2 space-y-0 md:flex-col md:space-x-0 md:space-y-2">
                <Button>
                  <Link to={`/filme/${item.id}`}>ver mais</Link>
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => excluirFilme(item.id)}
                  className="w-full"
                >
                  excluir
                </Button>
              </div>
            </span>
          </div>
          <Separator
            orientation="horizontal"
            className="mt-8 h-1 rounded-full"
          />
        </section>
      ))}
    </section>
  );
}

export default Favoritos;
