import { useEffect, useState } from "react";
import { getItens } from "../services/api";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";

// TODO (Pessoa 1): listagem de carros com CarroCard, pesquisa por texto,
// ordenação (preço e avaliação), filtros (localizacao e categoria) e favoritos.
//
// Por agora esta página só confirma que a ligação à API funciona.
export default function Inicio() {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

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
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <h1 className="h3 mb-3">Carros</h1>
      <MensagemErro mensagem={erro} />
      {!erro && (
        <div className="alert alert-success">
          Ligação à API OK: {carros.length} carros carregados.
        </div>
      )}
    </>
  );
}
