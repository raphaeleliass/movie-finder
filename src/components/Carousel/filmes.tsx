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
import { StarIcon } from "@radix-ui/react-icons";

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
      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
    }
    getFilmes();
  }, [urlParam]);
  return (
    <section className="flex flex-col items-center justify-center space-y-4">
      <div className="flex w-full max-w-xs flex-row items-center justify-between md:max-w-3xl lg:max-w-6xl">
        <Title className="border-l-8 border-l-red-600 pl-2">
          {carouselTitle}
        </Title>
        <Button variant={"secondary"}>
          <Link to={`/lista/${urlParam}`}>Ver lista</Link>
        </Button>
      </div>
      <article className="flex flex-col items-center justify-center space-y-12">
        {loading ? (
          <Loader />
        ) : (
          <Carousel className="w-full max-w-xs md:max-w-3xl lg:max-w-6xl">
            <CarouselContent>
              {filmes.map((item) => {
                return (
                  <CarouselItem
                    key={item.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <Card>
                      <CardHeader className="flex items-center">
                        <Link to={`/filme/${item.id}`}>
                          <img
                            className="w-full rounded-xl shadow"
                            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                            alt={item.title}
                          />
                        </Link>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center gap-2 text-center">
                        <Link to={`/item/${item.id}`}>
                          <CardTitle>{item.title}</CardTitle>
                        </Link>
                        <CardDescription className="flex flex-row items-center gap-1">
                          <StarIcon />
                          {item.vote_average.toFixed(1)}/10
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex flex-row justify-center gap-1">
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
