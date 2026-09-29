import { useParams } from "react-router-dom";

// TODO (Pessoa 2): carregar o carro com getItem(id), mostrar os detalhes
// (caixa, combustivel, portas, malas, capacidade…) e o formulário de reserva
// com validação, verificação de disponibilidade e criarReserva.
export default function DetalheCarro() {
  const { id } = useParams();

  return <h1 className="h3">Detalhe do carro {id}</h1>;
}
