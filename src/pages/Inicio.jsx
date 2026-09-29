import { useEffect, useState, useMemo } from "react";
import { getItens } from "../services/api";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import FiltrosCarro from "../components/FiltrosCarros";
import ListaCarros from "../components/ListaCarros";
import useFavoritos from "../hooks/useFavoritos";

export default function Inicio() {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const [pesquisa, setPesquisa] = useState("");
  const [filtroLocalizacao, setFiltroLocalizacao] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [ordenacao, setOrdenacao] = useState("");

  const { toggleFavorito, isFavorito } = useFavoritos();

  function carregar() {
    setLoading(true);
    setErro(null);

    setTimeout(async () => {
      try {
        const dados = await getItens();
        setCarros(dados);
      } catch (e) {
        setErro(e.message);
      } finally {
        setLoading(false);
      }
    }, 1500);
  }

  useEffect(() => {
    carregar();
  }, []);

  const localizacoesUnicas = useMemo(() => {
    const lista = carros.map((c) => c.localizacao).filter(Boolean);
    return [...new Set(lista)];
  }, [carros]);

  const categoriasUnicas = useMemo(() => {
    const lista = carros.map((c) => c.categoria).filter(Boolean);
    return [...new Set(lista)];
  }, [carros]);

  const carrosFiltrados = useMemo(() => {
    return carros
      .filter((carro) => {
        const correspondeTexto = carro.nome
          ?.toLowerCase()
          .includes(pesquisa.toLowerCase());

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

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="h3 mb-3">Carros Disponíveis</h1>

      <MensagemErro mensagem={erro} />

      {!erro && (
        <>
          <FiltrosCarro
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
          />

          <ListaCarros
            carros={carrosFiltrados}
            isFavorito={isFavorito}
            onFavoritoClick={toggleFavorito}
          />

          <div className="d-flex justify-content-center my-4">
            <button
              type="button"
              className="btn btn-outline-primary d-flex align-items-center gap-2"
              onClick={carregar}
            >
              🔄 Recarregar Lista
            </button>
          </div>
        </>
      )}
    </div>
  );
}