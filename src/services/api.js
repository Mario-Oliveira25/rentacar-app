// Todos os pedidos à API passam por este ficheiro.
// Os componentes nunca usam fetch diretamente: importam estas funções.
// Em caso de erro, as funções lançam um Error cuja message é a mensagem da API
// (ex.: "Sem disponibilidade para as datas escolhidas."), pronta a mostrar.

export const API = "http://localhost:3001/rentacar";

async function pedido(url, opcoes) {
  let resposta;
  try {
    resposta = await fetch(url, opcoes);
  } catch {
    throw new Error("Não foi possível ligar à API. Confirma que está a correr (npm start).");
  }

  // DELETE responde 204 sem corpo: não se pode chamar .json()
  if (resposta.status === 204) return null;

  let dados = null;
  try {
    dados = await resposta.json();
  } catch {
    // resposta sem JSON válido
  }

  if (!resposta.ok) {
    // 400, 404 ou 409: a API manda sempre { erro: "mensagem" }
    throw new Error(dados?.erro ?? `Erro ${resposta.status} ao comunicar com a API.`);
  }
  return dados;
}

// ---------- Carros ----------

/** Lista todos os carros (a pesquisa, filtros e ordenação fazem-se no frontend). */
export function getItens() {
  return pedido(`${API}/itens`);
}

/** Detalhe de um carro. Lança erro "Item não encontrado." se não existir. */
export function getItem(id) {
  return pedido(`${API}/itens/${id}`);
}

/**
 * Verifica se o carro está disponível.
 * @returns {Promise<boolean>} true se estiver disponível
 */
export async function verificarDisponibilidade(id, dataInicio, dataFim, quantidade) {
  const params = new URLSearchParams({
    inicio: dataInicio,
    fim: dataFim,
    quantidade: String(quantidade),
  });
  const dados = await pedido(`${API}/itens/${id}/disponibilidade?${params}`);
  return dados.disponivel;
}

// ---------- Reservas ----------

/** Lista todas as reservas. */
export function getReservas() {
  return pedido(`${API}/reservas`);
}

/**
 * Cria uma reserva. Devolve a reserva criada, com o total calculado pela API.
 * @param {{ itemId, dataInicio, dataFim, quantidade, nome, email }} reserva
 */
export function criarReserva(reserva) {
  return pedido(`${API}/reservas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...reserva,
      // itemId e quantidade têm de ir como números (os inputs e o useParams dão texto)
      itemId: Number(reserva.itemId),
      quantidade: Number(reserva.quantidade),
    }),
  });
}

/** Cancela uma reserva (a API responde 204, sem corpo). */
export function cancelarReserva(id) {
  return pedido(`${API}/reservas/${id}`, { method: "DELETE" });
}
