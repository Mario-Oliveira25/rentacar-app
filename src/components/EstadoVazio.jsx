export default function EstadoVazio({ mensagem, children }) {
  return (
    <div className="text-center text-secondary py-5">
      <p className="mb-3">{mensagem}</p>
      {children}
    </div>
  );
}
