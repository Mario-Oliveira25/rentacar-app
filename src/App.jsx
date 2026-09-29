import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import DetalheCarro from "./pages/DetalheCarro";
import MinhasReservas from "./pages/MinhasReservas";
import Favoritos from "./pages/Favoritos";
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada";

export default function App() {
  return (
    <Routes>
      {/* Todas as páginas partilham o Layout (navbar + rodapé) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/carros/:id" element={<DetalheCarro />} />
        <Route path="/reservas" element={<MinhasReservas />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="*" element={<PaginaNaoEncontrada />} />
      </Route>
    </Routes>
  );
}
