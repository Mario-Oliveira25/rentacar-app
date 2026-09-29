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

export default function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [erroCancelar, setErroCancelar] = useState(null);
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

    resultado.sort((a, b) => {
      const comparacao = a.dataInicio.localeCompare(b.dataInicio);
      return ordem === "asc" ? comparacao : -comparacao;
    });
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
      setReservas((atuais) => atuais.filter((r) => r.id !== reserva.id));
    } catch (e) {
      setErroCancelar(e.message);
    } finally {
      setACancelar(null);
    }
  }

  if (loading) return <Loading texto="A carregar reservas…" />;

  return (
    <>
      <header className="pagina-cabecalho">
        <h1 className="h3 mb-1">As minhas reservas</h1>
        <p className="text-secondary mb-0">Consulta e gere as reservas feitas.</p>
      </header>
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
