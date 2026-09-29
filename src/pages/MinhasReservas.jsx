import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { cancelarReserva, getReservas } from "../services/api";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import EstadoVazio from "../components/EstadoVazio";
import ReservaCard from "../components/ReservaCard";
import FiltrosReservas from "../components/FiltrosReservas";
import { formatarData } from "../utils/datas";
import { estadoReserva } from "../utils/reservas";

// Lista as reservas do tema rentacar (o GET /reservas já devolve só as nossas)
// e permite cancelá-las.
export default function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [erroCancelar, setErroCancelar] = useState(null);
  // id da reserva que está a ser cancelada (null quando não há nenhuma)
  const [aCancelar, setACancelar] = useState(null);
  const [pesquisa, setPesquisa] = useState("");
  const [estado, setEstado] = useState("todas");
  const [ordem, setOrdem] = useState("asc");

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

  // Lista a mostrar: só é recalculada quando as reservas ou os filtros mudam
  const reservasFiltradas = useMemo(() => {
    const texto = pesquisa.trim().toLowerCase();

    const resultado = reservas.filter((reserva) => {
      const correspondeTexto =
        reserva.itemNome.toLowerCase().includes(texto) ||
        reserva.nome.toLowerCase().includes(texto) ||
        reserva.email.toLowerCase().includes(texto);
      const correspondeEstado = estado === "todas" || estadoReserva(reserva) === estado;
      return correspondeTexto && correspondeEstado;
    });

    // O filter já devolve um array novo, por isso o sort não mexe no state
    resultado.sort((a, b) =>
      ordem === "asc"
        ? a.dataInicio.localeCompare(b.dataInicio)
        : b.dataInicio.localeCompare(a.dataInicio)
    );
    return resultado;
  }, [reservas, pesquisa, estado, ordem]);

  function limparFiltros() {
    setPesquisa("");
    setEstado("todas");
  }

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
        <>
          <FiltrosReservas
            pesquisa={pesquisa}
            onPesquisaChange={setPesquisa}
            estado={estado}
            onEstadoChange={setEstado}
            ordem={ordem}
            onOrdemChange={setOrdem}
          />

          <p className="text-secondary small">
            A mostrar {reservasFiltradas.length} de {reservas.length}{" "}
            {reservas.length === 1 ? "reserva" : "reservas"}
          </p>

          {reservasFiltradas.length === 0 ? (
            <EstadoVazio mensagem="Nenhuma reserva corresponde aos filtros.">
              <button type="button" className="btn btn-outline-secondary" onClick={limparFiltros}>
                Limpar filtros
              </button>
            </EstadoVazio>
          ) : (
            <div className="row g-3">
              {reservasFiltradas.map((reserva) => (
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
      )}
    </>
  );
}
