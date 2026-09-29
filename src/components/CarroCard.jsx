export default function CarroCard({carro,favorito,onFavoritoClick,}) {
    
  function clickFavorito() {
    onFavoritoClick(carro.id);
  }

  return (
    <article className="carro-card">

      <button
        type="button"
        className="botao-favorito"
        onClick={clickFavorito}
        aria-label={
          favorito
            ? `Remover ${carro.nome} dos favoritos`
            : `Adicionar ${carro.nome} aos favoritos`
        }
      >
        {favorito ? "★ Remover favorito" : "☆ Adicionar aos favoritos"}
      </button>

      <img
        className="carro-imagem"
        src={carro.imagem || "/imagem-carro-placeholder.jpg"}
        alt={`Imagem do ${carro.nome}`}
      />

      <h2>{carro.nome}</h2>

      <p>
        <strong>Categoria:</strong> {carro.categoria}
      </p>

      <p>
        <strong>Localização:</strong> {carro.localizacao}
      </p>

      <p>
        <strong>Preço:</strong> {carro.precoDia} € / dia
      </p>

      <p>
        <strong>Avaliação:</strong> ⭐ {carro.avaliacao}
      </p>

    </article>
  );
}