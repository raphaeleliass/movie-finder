import { TbError404 } from "react-icons/tb";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl bg-slate-300 p-12 text-slate-700 shadow-lg">
        <TbError404 className="size-32 drop-shadow-2xl" />
        <h1 className="text-2xl font-bold">Página não encontrada</h1>
        <p>
          Tente recarregar ou volte para a {""}
          <Link
            className="font-semibold underline transition-all hover:text-slate-500"
            to={"/"}
          >
            página inicial
          </Link>
        </p>
      </div>
    </section>
  );
}

export default NotFoundPage;
