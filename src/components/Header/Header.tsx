import { FaRegHeart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Header() {
  return (
    <header className="flex flex-row items-center justify-center bg-white">
      <div className="flex w-full max-w-xs flex-row items-center justify-between py-4 md:max-w-3xl lg:max-w-6xl">
        <Link
          to={"/"}
          className="flex flex-row items-center gap-1 font-Poppins text-2xl font-bold md:text-4xl"
        >
          Movie Finder
          <FaSearch className="size-4" />
        </Link>
        <nav>
          <ul>
            <li>
              <Link to={"/favoritos"}>
                <Button className="flex flex-row items-center gap-1">
                  <FaRegHeart />
                  Minha Lista
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
