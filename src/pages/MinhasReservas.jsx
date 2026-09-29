import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cancelarReserva, getReservas } from "../services/api";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import EstadoVazio from "../components/EstadoVazio";
import ReservaCard from "../components/ReservaCard";
import { formatarData } from "../utils/datas";

// Lista as reservas do tema rentacar (o GET /reservas já devolve só as nossas)
// e permite cancelá-las.
export default function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [erroCancelar, setErroCancelar] = useState(null);
  // id da reserva que está a ser cancelada (null quando não há nenhuma)
  const [aCancelar, setACancelar] = useState(null);

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

  async function aoCancelar(reserva) {
    const confirmou = window.confirm(
      `Cancelar a reserva do ${reserva.itemNome} de ${formatarData(reserva.dataInicio)} ` +
        `a ${formatarData(reserva.dataFim)}?`
    );
    if (!confirmou) return;

    setErroCancelar(null);
    setACancelar(reserva.id);
    try {
      await cancelarReserva(reserva.id);
      // Tira a reserva da lista sem voltar a pedir tudo à API
      setReservas(reservas.filter((r) => r.id !== reserva.id));
    } catch (e) {
      setErroCancelar(e.message);
    } finally {
      setACancelar(null);
    }
  }

  if (loading) return <Loading texto="A carregar reservas…" />;

  return (
    <>
      <h1 className="h3 mb-3">As minhas reservas</h1>
      <MensagemErro mensagem={erro} />
      <MensagemErro mensagem={erroCancelar} />

      {!erro && reservas.length === 0 && (
        <EstadoVazio mensagem="Ainda não tens reservas.">
          <Link to="/" className="btn btn-primary">
            Ver carros
          </Link>
        </EstadoVazio>
      )}

      {reservas.length > 0 && (
        <div className="row g-3">
          {reservas.map((reserva) => (
            <div key={reserva.id} className="col-md-6 col-lg-4">
              <ReservaCard
                reserva={reserva}
                onCancelar={aoCancelar}
                cancelando={aCancelar === reserva.id}
                desativado={aCancelar !== null}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
