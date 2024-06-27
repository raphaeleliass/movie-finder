import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Api from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";
import Title from "../ui/title";
import { Button } from "../ui/button";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

interface Filme {
  id: string;
  backdrop_path: string;
  title: string;
}

function Banner() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const navigate = useNavigate();
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    async function getFilmes() {
      await Api.get("/movie/now_playing", {
        params: {
          api_key: apiKey,
          language: "pt-BR",
          page: 1,
        },
      })
        .then((res) => {
          setFilmes(res.data.results.slice(0, 5));
        })
        .catch((error) => {
          console.error(error);
          navigate("/", { replace: true });
        });
    }
    getFilmes();
  }, [navigate]);

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent>
        {filmes.map((item) => (
          <CarouselItem key={item.id} className="lg:basis-2/3">
            <img
              src={`https://tmdb.org/t/p/original${item.backdrop_path}`}
              alt={item.title}
              className="aspect-square max-w-xs rounded-lg object-cover object-center shadow-xl brightness-50 md:aspect-video md:max-w-3xl"
            />
            <div className="absolute bottom-1/3 z-50 flex translate-x-[70px] flex-col items-center justify-center space-y-2 text-center md:bottom-8 md:w-full md:translate-x-8 md:items-start md:justify-normal md:text-left">
              <Title className="text-lg text-white drop-shadow-xl md:text-2xl">
                {item.title}
              </Title>
              <div className="flex flex-row space-x-2">
                <Button variant={"secondary"} className="">
                  <Link to={`/filme/${item.id}`}>Ver mais</Link>
                </Button>
                <Button variant={"destructive"}>
                  <a
                    target="blank"
                    rel="external"
                    href={`https://youtube.com/results?search_query=${item.title}+Trailer`}
                  >
                    Trailer
                  </a>
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Banner;
