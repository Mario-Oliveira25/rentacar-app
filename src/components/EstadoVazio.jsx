export default function EstadoVazio({ mensagem, children }) {
  return (
    <div className="estado-vazio text-center text-secondary py-5 px-3">
      <p className="mb-3">{mensagem}</p>
      {children}
    </div>
  );
}
