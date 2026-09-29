import { Link } from "react-router-dom";
import { calcularDias, formatarData } from "../utils/datas";
import { formatarPreco } from "../utils/formatar";

// Mostra os dados de uma reserva. Recebe a reserva por props, e a página decide
// o que acontece ao carregar em "Cancelar" (onCancelar).
export default function ReservaCard({ reserva, onCancelar, cancelando, desativado }) {
  const dias = calcularDias(reserva.dataInicio, reserva.dataFim);

  return (
    <div className="card h-100">
      <div className="card-body">
        <h2 className="h5 card-title">
          <Link to={`/carros/${reserva.itemId}`}>{reserva.itemNome}</Link>
        </h2>

        <p className="mb-2">
          {formatarData(reserva.dataInicio)} a {formatarData(reserva.dataFim)}
          <span className="text-secondary">
            {" "}({dias} {dias === 1 ? "dia" : "dias"})
          </span>
        </p>

        <ul className="list-unstyled small text-secondary mb-0">
          <li>
            {reserva.quantidade} {reserva.quantidade === 1 ? "passageiro" : "passageiros"}
          </li>
          <li>{reserva.nome}</li>
          <li>{reserva.email}</li>
        </ul>
      </div>

      <div className="card-footer d-flex justify-content-between align-items-center">
        <div>
          <strong>{formatarPreco(reserva.total)}</strong>
          <div className="text-secondary small">Reserva n.º {reserva.id}</div>
        </div>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={() => onCancelar(reserva)}
          disabled={desativado}
        >
          {cancelando ? "A cancelar…" : "Cancelar"}
        </button>
      </div>
    </div>
  );
}
