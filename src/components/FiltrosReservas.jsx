import { ESTADOS_RESERVA } from "../utils/reservas";

export default function FiltrosReservas({
  pesquisa,
  onPesquisaChange,
  estado,
  onEstadoChange,
  ordem,
  onOrdemChange,
}) {
  return (
    <div className="painel-filtros">
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="pesquisa-reservas" className="form-label small">
            Pesquisar
          </label>
          <input
            id="pesquisa-reservas"
            type="search"
            className="form-control"
            placeholder="Carro, nome ou email"
            value={pesquisa}
            onChange={(e) => onPesquisaChange(e.target.value)}
          />
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="estado-reservas" className="form-label small">
            Estado
          </label>
          <select
            id="estado-reservas"
            className="form-select"
            value={estado}
            onChange={(e) => onEstadoChange(e.target.value)}
          >
            <option value="todas">Todas</option>
            {Object.entries(ESTADOS_RESERVA).map(([chave, { texto }]) => (
              <option key={chave} value={chave}>
                {texto}
              </option>
            ))}
          </select>
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="ordem-reservas" className="form-label small">
            Ordenar por levantamento
          </label>
          <select
            id="ordem-reservas"
            className="form-select"
            value={ordem}
            onChange={(e) => onOrdemChange(e.target.value)}
          >
            <option value="asc">Mais próximas primeiro</option>
            <option value="desc">Mais afastadas primeiro</option>
          </select>
        </div>
      </div>
    </div>
  );
}
