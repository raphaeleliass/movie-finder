import Banner from "../components/Carousel/banner";
import CarouselFilmes from "../components/Carousel/filmes";

function Home() {
  return (
    <section className="mx-auto flex w-full max-w-xs flex-col space-y-24 py-12 md:max-w-3xl lg:max-w-6xl">
      <Banner/>
      <CarouselFilmes carouselTitle="Populares" urlParam="popular" />
      <CarouselFilmes
        carouselTitle="Melhores avaliações"
        urlParam="top_rated"
      />
    </section>
  );
}

export default Home;
