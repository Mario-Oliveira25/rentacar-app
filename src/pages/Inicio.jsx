import { useEffect, useState, useMemo } from "react";
import { getItens } from "../services/api";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import EstadoVazio from "../components/EstadoVazio";
import FiltrosCarros from "../components/FiltrosCarros";
import ListaCarros from "../components/ListaCarros";
import useFavoritos from "../hooks/useFavoritos";

export default function Inicio() {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [pedidoCarregamento, setPedidoCarregamento] = useState(0);

  const [pesquisa, setPesquisa] = useState("");
  const [filtroLocalizacao, setFiltroLocalizacao] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [ordenacao, setOrdenacao] = useState("");

  const { toggleFavorito, isFavorito } = useFavoritos();

  useEffect(() => {
    async function carregar() {
      try {
        setCarros(await getItens());
      } catch (e) {
        setErro(e.message);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [pedidoCarregamento]);

  function recarregar() {
    setLoading(true);
    setErro(null);
    setPedidoCarregamento((atual) => atual + 1);
  }

  const localizacoesUnicas = useMemo(() => {
    const lista = carros.map((c) => c.localizacao).filter(Boolean);
    return [...new Set(lista)];
  }, [carros]);

  const categoriasUnicas = useMemo(() => {
    const lista = carros.map((c) => c.categoria).filter(Boolean);
    return [...new Set(lista)];
  }, [carros]);

  const carrosFiltrados = useMemo(() => {
    const texto = pesquisa.trim().toLowerCase();

    return carros
      .filter((carro) => {
        const correspondeTexto = carro.nome.toLowerCase().includes(texto);
        const correspondeLocalizacao =
          !filtroLocalizacao || carro.localizacao === filtroLocalizacao;
        const correspondeCategoria =
          !filtroCategoria || carro.categoria === filtroCategoria;

        return correspondeTexto && correspondeLocalizacao && correspondeCategoria;
      })
      .sort((a, b) => {
        if (ordenacao === "preco-asc") return a.precoDia - b.precoDia;
        if (ordenacao === "preco-desc") return b.precoDia - a.precoDia;
        if (ordenacao === "avaliacao-desc") return b.avaliacao - a.avaliacao;
        return 0;
      });
  }, [carros, pesquisa, filtroLocalizacao, filtroCategoria, ordenacao]);

  function limparFiltros() {
    setPesquisa("");
    setFiltroLocalizacao("");
    setFiltroCategoria("");
  }

  if (loading) return <Loading texto="A carregar carros…" />;

  return (
    <>
      <header className="pagina-cabecalho pagina-cabecalho-destaque">
        <h1 className="h2 mb-2">Encontra o carro certo para a tua viagem</h1>
        <p className="text-secondary mb-0">
          Compara preços, escolhe as datas e reserva em poucos passos.
        </p>
      </header>

      <MensagemErro mensagem={erro} />

      {erro && (
        <button type="button" className="btn btn-outline-primary" onClick={recarregar}>
          Tentar novamente
        </button>
      )}

      {!erro && (
        <>
          <FiltrosCarros
            pesquisa={pesquisa}
            setPesquisa={setPesquisa}
            filtroLocalizacao={filtroLocalizacao}
            setFiltroLocalizacao={setFiltroLocalizacao}
            filtroCategoria={filtroCategoria}
            setFiltroCategoria={setFiltroCategoria}
            ordenacao={ordenacao}
            setOrdenacao={setOrdenacao}
            localizacoes={localizacoesUnicas}
            categorias={categoriasUnicas}
            onRecarregar={recarregar}
          />

          {carrosFiltrados.length === 0 ? (
            <EstadoVazio mensagem="Nenhum carro encontrado com os filtros selecionados.">
              <button type="button" className="btn btn-outline-secondary" onClick={limparFiltros}>
                Limpar filtros
              </button>
            </EstadoVazio>
          ) : (
            <ListaCarros
              carros={carrosFiltrados}
              isFavorito={isFavorito}
              onFavoritoClick={toggleFavorito}
            />
          )}
        </>
      )}
    </>
  );
}
