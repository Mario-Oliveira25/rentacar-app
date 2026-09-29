import CarroCard from "./CarroCard";

export default function ListaCarros({ carros, isFavorito, onFavoritoClick }) {
  if (carros.length === 0) {
    return (
      <div className="alert alert-info">
        Nenhum carro encontrado com os filtros selecionados.
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {carros.map((carro) => (
        <div key={carro.id} className="col">
          <CarroCard
            carro={carro}
            favorito={isFavorito(carro.id)}
            onFavoritoClick={onFavoritoClick}
          />
        </div>
      ))}
    </div>
  );
}