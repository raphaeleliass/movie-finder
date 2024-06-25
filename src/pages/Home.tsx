import { useEffect, useState } from "react";
import Api from "../services/Api";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import Loader from "../components/ui/loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

interface Filme {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
    }
    getFilmes();
  }, []);
  return (
    <div className="flex items-center justify-center space-y-2">
      <article className="flex min-h-screen flex-col items-center justify-center space-y-12">
        <h2 className="w-full text-4xl font-semibold">Lançamentos</h2>
        {loading ? (
          <Loader />
        ) : (
          <Carousel className="w-full max-w-xs md:max-w-3xl lg:max-w-6xl">
            <CarouselContent>
              {filmes.map((filme) => {
                return (
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <Card key={filme.id}>
                      <CardHeader className="flex items-center">
                        <img
                          className="w-full rounded-xl shadow"
                          src={`https://image.tmdb.org/t/p/original${filme.poster_path}`}
                          alt={filme.title}
                        />
                      </CardHeader>
                      <CardContent>
                        <CardTitle>{filme.title}</CardTitle>
                        <CardDescription>
                          {filme.vote_average.toFixed(1)}/10
                        </CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button>
                          <Link to={`/filme/${filme.id}`}>Ver mais</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
        )}
      </article>
    </div>
  );
}

export default Home;
