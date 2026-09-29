// Mostra uma mensagem de erro (ex.: a que vem da API). Não mostra nada se não houver erro.
export default function MensagemErro({ mensagem }) {
  if (!mensagem) return null;

  return (
    <div className="alert alert-danger" role="alert">
      {mensagem}
    </div>
  );
}
