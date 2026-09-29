import { Link } from "react-router-dom";
import { formatarPreco } from "../utils/formatar";
import imagemSemCarro from "../assets/carro-sem-imagem.svg";

export default function CarroCard({ carro, favorito, onFavoritoClick }) {
  return (
    <div className="card h-100">
      <Link to={`/carros/${carro.id}`}>
        <img
          className="card-img-top carro-imagem"
          src={carro.imagem || imagemSemCarro}
          alt={carro.nome}
        />
      </Link>

      <div className="card-body">
        <h2 className="h5 card-title">
          <Link to={`/carros/${carro.id}`}>{carro.nome}</Link>
        </h2>
        <p className="text-secondary small mb-2">
          {carro.categoria} · {carro.localizacao}
        </p>
        <p className="small mb-0">Avaliação: {carro.avaliacao}</p>
      </div>

      <div className="card-footer d-flex justify-content-between align-items-center">
        <strong>{formatarPreco(carro.precoDia)} / dia</strong>
        <button
          type="button"
          className={`btn btn-sm ${favorito ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => onFavoritoClick(carro.id)}
          aria-label={
            favorito
              ? `Remover ${carro.nome} dos favoritos`
              : `Adicionar ${carro.nome} aos favoritos`
          }
        >
          {favorito ? "Remover favorito" : "Adicionar favorito"}
        </button>
      </div>
    </div>
  );
}
