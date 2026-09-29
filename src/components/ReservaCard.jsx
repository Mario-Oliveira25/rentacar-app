import { Link } from "react-router-dom";
import { calcularDias, formatarData } from "../utils/datas";
import { formatarPreco } from "../utils/formatar";
import { ESTADOS_RESERVA, estadoReserva } from "../utils/reservas";

export default function ReservaCard({ reserva, onCancelar, cancelando, desativado }) {
  const dias = calcularDias(reserva.dataInicio, reserva.dataFim);
  const chaveEstado = estadoReserva(reserva);
  const estado = ESTADOS_RESERVA[chaveEstado];

  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <h2 className="h5 card-title mb-0">
            <Link to={`/carros/${reserva.itemId}`}>{reserva.itemNome}</Link>
          </h2>
          <span className={`badge text-bg-${estado.cor}`}>{estado.texto}</span>
        </div>

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
        {chaveEstado !== "terminada" && (
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => onCancelar(reserva)}
            disabled={desativado}
          >
            {cancelando ? "A cancelar…" : "Cancelar"}
          </button>
        )}
      </div>
    </div>
  );
}
