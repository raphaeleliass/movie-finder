import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../services/Api";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import Title from "../components/ui/title";
import { StarIcon } from "@radix-ui/react-icons";
import { Button } from "../components/ui/button";

interface Lista {
  id: string;
  title: string;
  poster_path: string;
  vote_average: number;
  genres: Genre[];
}

interface Genre {
  id: string;
  name: string;
}

function ListaFilme() {
  const { urlParam } = useParams<{ urlParam: string }>();
  const [lista, setLista] = useState<Lista[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getList() {
      try {
        const response = await Api.get(`movie/${urlParam}`, {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            language: "pt-BR",
            page: 1,
          },
        });
        setLista(response.data.results);
      } catch (err) {
        navigate("/", { replace: true });
        return;
      }
    }
    getList();
  }, [urlParam, navigate]);

  return (
    <section className="mx-auto flex max-w-xs flex-col space-y-4 py-12 md:max-w-3xl lg:max-w-6xl">
      <Title className="border-l-8 border-l-red-600 pl-2 capitalize md:text-4xl">
        {urlParam?.split("_").join(" ")}
      </Title>
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lista.map((item) => (
          <Card key={item.id} className="flex flex-col items-center">
            <CardHeader>
              <Link to={`filme/${item.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  alt={item.title}
                  className="w-full rounded-xl shadow-lg"
                />
              </Link>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <Link to={`/filme/${item.id}`}>
                <Title className="text-center">{item.title}</Title>
              </Link>
              <div className="flex flex-row items-center gap-1">
                <StarIcon />
                <CardDescription>
                  {item.vote_average.toFixed(1)}/10
                </CardDescription>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-row gap-2">
                <Button>
                  <Link to={`/filme/${item.id}`}>Ver mais</Link>
                </Button>
                <Button variant={"destructive"}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://youtube.com/results?search_query=${item.title}+Trailer`}
                  >
                    Trailer
                  </a>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default ListaFilme;
