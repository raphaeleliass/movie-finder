import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex flex-row items-center justify-center bg-white text-red-500">
      <div className="flex w-full max-w-xs flex-row items-center justify-between py-4 md:max-w-3xl lg:max-w-6xl">
        <Link to={"/"} className="text-2xl font-bold">
          Movie Finder
        </Link>
        <nav>
          <ul>
            <li>
              <Link to={"/favoritos"}>Meus filmes</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
