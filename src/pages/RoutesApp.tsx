import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Filme from "./Filme";
import Header from "../components/Header/Header";
import NotFoundPage from "./NotFound";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Filme />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
