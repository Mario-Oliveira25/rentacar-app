// Para listas sem resultados: "Nenhum carro encontrado", "Ainda não tens reservas"…
// O children permite pôr um botão ou link por baixo da mensagem.
export default function EstadoVazio({ mensagem, children }) {
  return (
    <div className="text-center text-secondary py-5">
      <p className="mb-3">{mensagem}</p>
      {children}
    </div>
  );
}
