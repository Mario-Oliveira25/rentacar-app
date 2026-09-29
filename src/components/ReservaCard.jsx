import { Link } from "react-router-dom";
import { calcularDias, formatarData } from "../utils/datas";
import { formatarPreco } from "../utils/formatar";

// Mostra os dados de uma reserva. Recebe a reserva por props.
export default function ReservaCard({ reserva }) {
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
        <span className="text-secondary small">Reserva n.º {reserva.id}</span>
        <strong>{formatarPreco(reserva.total)}</strong>
      </div>
    </div>
  );
}
