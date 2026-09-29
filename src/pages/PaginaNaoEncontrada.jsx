import { Link } from "react-router-dom";

export default function PaginaNaoEncontrada() {
  return (
    <div className="text-center py-5">
      <h1 className="display-5">404</h1>
      <p className="text-secondary">Esta página não existe.</p>
      <Link className="btn btn-primary" to="/">
        Voltar aos carros
      </Link>
    </div>
  );
}
