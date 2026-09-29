const API ="http://localhost:3001/rentacar";

async function pedido(url, opcoes) {
  let resposta;
  try {
    resposta = await fetch(url, opcoes);
  } catch {
    throw new Error("Não foi possível ligar à API. Confirma que está a correr (npm start).");
  }

  if (resposta.status === 204) return null;

  const dados = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    throw new Error(dados?.erro ?? `Erro ${resposta.status} ao comunicar com a API.`);
  }
  return dados;
}

export function getItens() {
  return pedido(`${API}/itens`);
}

export function getItem(id) {
  return pedido(`${API}/itens/${id}`);
}

export async function verificarDisponibilidade(id, dataInicio, dataFim, quantidade) {
  const params = new URLSearchParams({
    inicio: dataInicio,
    fim: dataFim,
    quantidade: String(quantidade),
  });
  const dados = await pedido(`${API}/itens/${id}/disponibilidade?${params}`);
  return dados.disponivel;
}

export function getReservas() {
  return pedido(`${API}/reservas`);
}

export function criarReserva(reserva) {
  return pedido(`${API}/reservas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...reserva,
      itemId: Number(reserva.itemId),
      quantidade: Number(reserva.quantidade),
    }),
  });
}

export function cancelarReserva(id) {
  return pedido(`${API}/reservas/${id}`, { method: "DELETE" });
}
