import { useEffect, useState } from "react";
import Api from "../../services/Api";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Loader from "../ui/loader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Title from "../ui/title";

interface Filme {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface FilmesProps {
  urlParam: string;
  carouselTitle: string;
}

function CarouselFilmes({ urlParam, carouselTitle }: FilmesProps) {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;

    async function getFilmes() {
      const response = await Api.get(`movie/${urlParam}`, {
        params: {
          api_key: apiKey,
          language: "pt-BR",
          page: 1,
        },
      });
      setFilmes(response.data.results.slice(0, 5));
      setLoading(false);
    }
    getFilmes();
  }, [urlParam]);
  return (
    <section className="flex flex-col items-center justify-center space-y-4">
      <div className="flex w-full max-w-xs flex-row items-center justify-between md:max-w-3xl lg:max-w-6xl">
        <Title className="border-l-4 border-l-red-500 pl-1">
          {carouselTitle}
        </Title>
        <Button variant={"secondary"}>Ver todos</Button>
      </div>
      <article className="flex flex-col items-center justify-center space-y-12">
        {loading ? (
          <Loader />
        ) : (
          <Carousel className="w-full max-w-xs md:max-w-3xl lg:max-w-6xl">
            <CarouselContent>
              {filmes.map((filme) => {
                return (
                  <CarouselItem
                    key={filme.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <Card>
                      <CardHeader className="flex items-center">
                        <Link to={`/filme/${filme.id}`}>
                          <img
                            className="w-full rounded-xl shadow"
                            src={`https://image.tmdb.org/t/p/original${filme.poster_path}`}
                            alt={filme.title}
                          />
                        </Link>
                      </CardHeader>
                      <CardContent>
                        <Link to={`/filme/${filme.id}`}>
                          <CardTitle>{filme.title}</CardTitle>
                        </Link>
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
    </section>
  );
}

export default CarouselFilmes;
