import RoutesApp from "./pages/RoutesApp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer autoClose={1000} />
      <RoutesApp />
    </>
  );
}

export default App;
