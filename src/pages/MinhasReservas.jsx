import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReservas } from "../services/api";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import EstadoVazio from "../components/EstadoVazio";
import { formatarData } from "../utils/datas";

// Lista as reservas do tema rentacar (o GET /reservas já devolve só as nossas).
// TODO (Pessoa 3): mostrar mais detalhes de cada reserva e permitir cancelar.
export default function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        setReservas(await getReservas());
      } catch (e) {
        setErro(e.message);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  if (loading) return <Loading texto="A carregar reservas…" />;

  return (
    <>
      <h1 className="h3 mb-3">As minhas reservas</h1>
      <MensagemErro mensagem={erro} />

      {!erro && reservas.length === 0 && (
        <EstadoVazio mensagem="Ainda não tens reservas.">
          <Link to="/" className="btn btn-primary">
            Ver carros
          </Link>
        </EstadoVazio>
      )}

      {reservas.length > 0 && (
        <ul className="list-group">
          {reservas.map((reserva) => (
            <li key={reserva.id} className="list-group-item">
              <strong>{reserva.itemNome}</strong> —{" "}
              {formatarData(reserva.dataInicio)} a {formatarData(reserva.dataFim)}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
