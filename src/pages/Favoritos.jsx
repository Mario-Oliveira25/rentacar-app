import { useEffect, useState, useMemo } from "react";
import { getItens } from "../services/api";
import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import CarroCard from "../components/CarroCard";
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

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="h3 mb-3">Meus Favoritos</h1>

      <MensagemErro mensagem={erro} />

      {!erro && (
        <>
          {carrosFavoritos.length === 0 ? (
            <div className="alert alert-info">
              Ainda não adicionaste nenhum veículo aos favoritos.
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {carrosFavoritos.map((carro) => (
                <div key={carro.id} className="col">
                  <CarroCard
                    carro={carro}
                    favorito={isFavorito(carro.id)}
                    onFavoritoClick={toggleFavorito}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}