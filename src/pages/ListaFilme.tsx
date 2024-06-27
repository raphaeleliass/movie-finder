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
        console.log(response);
        setLista(response.data.results);
      } catch (err) {
        navigate("/", { replace: true });
        return;
      }
    }
    getList();
  }, [urlParam, navigate]);

  return (
    <section className="mx-auto flex max-w-xs flex-col md:max-w-3xl py-12 lg:max-w-6xl">
      <Title className="capitalize md:text-4xl border-l-red-600 border-l-8 pl-2">{urlParam?.split("_").join(` `)}</Title>
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lista.map((item) => (
          <Card key={item.id} className="flex flex-col items-center">
            <CardHeader>
              <img
                src={`https://tmdb.org/t/p/original${item.poster_path}`}
                alt={item.title}
                className="w-full rounded-xl shadow-lg"
              />
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <Title className="text-center">{item.title}</Title>
              <div className="flex flex-row items-center gap-1">
                <StarIcon />
                <CardDescription>
                  {item.vote_average.toFixed(1)}
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
