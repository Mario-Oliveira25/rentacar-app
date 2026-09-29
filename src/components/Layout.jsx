import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

// Estrutura comum a todas as páginas. O <Outlet /> é onde aparece a página da rota atual.
export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Outlet />
      </main>
      <footer className="bg-dark text-white-50 text-center py-3 small">
        Rent-a-car · Projeto Final UC00621
      </footer>
    </>
  );
}
