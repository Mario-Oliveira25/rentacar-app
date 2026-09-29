export default function FiltrosCarro({
  pesquisa,
  setPesquisa,
  filtroLocalizacao,
  setFiltroLocalizacao,
  filtroCategoria,
  setFiltroCategoria,
  ordenacao,
  setOrdenacao,
  localizacoes,
  categorias,
}) {
  return (
    <div className="row g-3 mb-4">
      <div className="col-md-3">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar por nome..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </div>

      <div className="col-md-3">
        <select
          className="form-select"
          value={filtroLocalizacao}
          onChange={(e) => setFiltroLocalizacao(e.target.value)}
        >
          <option value="">Todas as Localizações</option>
          {localizacoes.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-3">
        <select
          className="form-select"
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="">Todas as Categorias</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-3">
        <select
          className="form-select"
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
        >
          <option value="">Ordenar por...</option>
          <option value="preco-asc">Preço: Menor para Maior</option>
          <option value="preco-desc">Preço: Maior para Menor</option>
          <option value="avaliacao-desc">Melhor Avaliados</option>
        </select>
      </div>
    </div>
  );
}