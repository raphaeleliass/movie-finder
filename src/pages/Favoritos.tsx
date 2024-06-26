import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { toast } from "react-toastify";

interface Filme {
  id: string;
  title: string;
  [key: string]: string | number | boolean;
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
    <section>
      <h1>Meus Filmes</h1>
      {filmes.length === 0 && <p>nenhum filme salvo</p>}

      <ul>
        {filmes.map((item) => (
          <li key={item.id}>
            <p>{item.title}</p>
            <div>
              <Button>
                <Link to={`/filme/${item.id}`}>ver mais</Link>
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => excluirFilme(item.id)}
              >
                excluir
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Favoritos;
