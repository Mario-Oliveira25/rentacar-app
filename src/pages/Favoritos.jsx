import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getItens } from "../services/api";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import EstadoVazio from "../components/EstadoVazio";
import ListaCarros from "../components/ListaCarros";
import useFavoritos from "../hooks/useFavoritos";

export default function Favoritos() {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const { favoritos, toggleFavorito, isFavorito } = useFavoritos();

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

  const carrosFavoritos = useMemo(() => {
    return carros.filter((carro) => favoritos.includes(carro.id));
  }, [carros, favoritos]);

  if (loading) return <Loading texto="A carregar favoritos…" />;

  return (
    <>
      <h1 className="h3 mb-3">Os meus favoritos</h1>

      <MensagemErro mensagem={erro} />

      {!erro &&
        (carrosFavoritos.length === 0 ? (
          <EstadoVazio mensagem="Ainda não adicionaste nenhum carro aos favoritos.">
            <Link to="/" className="btn btn-primary">
              Ver carros
            </Link>
          </EstadoVazio>
        ) : (
          <ListaCarros
            carros={carrosFavoritos}
            isFavorito={isFavorito}
            onFavoritoClick={toggleFavorito}
          />
        ))}
    </>
  );
}
