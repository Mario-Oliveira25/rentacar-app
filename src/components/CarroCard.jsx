import { Link } from "react-router-dom";
import { formatarPreco } from "../utils/formatar";
import imagemSemCarro from "../assets/carro-sem-imagem.svg";

export default function CarroCard({ carro, favorito, onFavoritoClick }) {
  return (
    <div className="card h-100 carro-card">
      <Link to={`/carros/${carro.id}`} className="carro-imagem-link">
        <img
          className="carro-imagem"
          src={carro.imagem || imagemSemCarro}
          alt={carro.nome}
        />
        <span className="carro-etiqueta">{carro.categoria}</span>
      </Link>

      <div className="card-body">
        <h2 className="h5 card-title mb-1">
          <Link to={`/carros/${carro.id}`}>{carro.nome}</Link>
        </h2>
        <p className="text-secondary small mb-0">
          {carro.localizacao} · {carro.caixa} · Avaliação {carro.avaliacao}
        </p>
      </div>

      <div className="card-footer d-flex justify-content-between align-items-center py-3">
        <span className="preco">
          {formatarPreco(carro.precoDia)} <small>/ dia</small>
        </span>
        <button
          type="button"
          className={`btn btn-sm ${favorito ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => onFavoritoClick(carro.id)}
          aria-label={
            favorito
              ? `Remover ${carro.nome} dos favoritos`
              : `Adicionar ${carro.nome} aos favoritos`
          }
        >
          {favorito ? "Nos favoritos" : "Guardar"}
        </button>
      </div>
    </div>
  );
}
