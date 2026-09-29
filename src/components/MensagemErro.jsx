export default function MensagemErro({ mensagem }) {
  if (!mensagem) return null;

  return (
    <div className="alert alert-danger" role="alert">
      {mensagem}
    </div>
  );
}
