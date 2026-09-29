export default function FiltrosCarros({
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
  onRecarregar,
}) {
  return (
    <div className="painel-filtros">
      <div className="row g-3">
        <div className="col-md-6 col-lg-3">
          <label htmlFor="pesquisa-carros" className="form-label small">
            Pesquisar
          </label>
          <input
            id="pesquisa-carros"
            type="search"
            className="form-control"
            placeholder="Nome do carro"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>

        <div className="col-6 col-md-3 col-lg-2">
          <label htmlFor="localizacao-carros" className="form-label small">
            Localização
          </label>
          <select
            id="localizacao-carros"
            className="form-select"
            value={filtroLocalizacao}
            onChange={(e) => setFiltroLocalizacao(e.target.value)}
          >
            <option value="">Todas</option>
            {localizacoes.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="col-6 col-md-3 col-lg-2">
          <label htmlFor="categoria-carros" className="form-label small">
            Categoria
          </label>
          <select
            id="categoria-carros"
            className="form-select"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="">Todas</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 col-lg-3">
          <label htmlFor="ordenacao-carros" className="form-label small">
            Ordenar por
          </label>
          <select
            id="ordenacao-carros"
            className="form-select"
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
          >
            <option value="">Sem ordenação</option>
            <option value="preco-asc">Preço: menor para maior</option>
            <option value="preco-desc">Preço: maior para menor</option>
            <option value="avaliacao-desc">Melhor avaliados</option>
          </select>
        </div>

        <div className="col-md-6 col-lg-2 d-flex align-items-end">
          <button type="button" className="btn btn-outline-primary w-100" onClick={onRecarregar}>
            Recarregar lista
          </button>
        </div>
      </div>
    </div>
  );
}
