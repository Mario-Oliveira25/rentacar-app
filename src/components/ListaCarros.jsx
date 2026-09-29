import CarroCard from "./CarroCard";

export default function ListaCarros({ carros, isFavorito, onFavoritoClick }) {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
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
