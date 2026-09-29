import { hojeISO } from "./datas";

export const ESTADOS_RESERVA = {
  proxima: { texto: "Próxima", cor: "primary" },
  aDecorrer: { texto: "A decorrer", cor: "success" },
  terminada: { texto: "Terminada", cor: "secondary" },
};

export function estadoReserva(reserva) {
  const hoje = hojeISO();
  if (reserva.dataFim < hoje) return "terminada";
  if (reserva.dataInicio > hoje) return "proxima";
  return "aDecorrer";
}
