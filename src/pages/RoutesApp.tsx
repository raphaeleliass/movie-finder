import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Filme from "./Filme";
import Header from "../components/Header/Header";
import NotFoundPage from "./NotFound";
import ScrollToTop from "../components/ScrollToTop/scrollToTop";
import Favoritos from "./Favoritos";
import ListaFilme from "./ListaFilme";

function RoutesApp() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Filme />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/lista/:urlParam" element={<ListaFilme />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
