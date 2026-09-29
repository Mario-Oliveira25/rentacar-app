import { hojeISO } from "./datas";

// Estados possíveis de uma reserva, com o texto a mostrar e a cor do badge (Bootstrap).
export const ESTADOS_RESERVA = {
  proxima: { texto: "Próxima", cor: "primary" },
  aDecorrer: { texto: "A decorrer", cor: "success" },
  terminada: { texto: "Terminada", cor: "secondary" },
};

/**
 * Devolve "proxima", "aDecorrer" ou "terminada", comparando as datas com hoje.
 * As datas "AAAA-MM-DD" podem ser comparadas como texto: a ordem alfabética
 * é a mesma que a ordem das datas.
 */
export function estadoReserva(reserva) {
  const hoje = hojeISO();
  if (reserva.dataFim < hoje) return "terminada";
  if (reserva.dataInicio > hoje) return "proxima";
  return "aDecorrer";
}
