import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="container py-4 py-lg-5">
        <Outlet />
      </main>
      <footer className="app-footer text-center py-3 small">
        © {new Date().getFullYear()} Rent-a-car. Todos os direitos reservados.
      </footer>
    </>
  );
}
