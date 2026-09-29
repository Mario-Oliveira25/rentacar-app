// Funções de datas partilhadas. As datas andam sempre no formato "AAAA-MM-DD",
// que é o que os <input type="date"> dão e o que a API espera.

const UM_DIA_MS = 24 * 60 * 60 * 1000;

/** Converte "AAAA-MM-DD" num Date em UTC (evita problemas com a hora de verão). */
function paraUTC(dataISO) {
  const [ano, mes, dia] = dataISO.split("-").map(Number);
  return Date.UTC(ano, mes - 1, dia);
}

/**
 * N.º de dias de aluguer, contando o primeiro e o último (de 10 a 13 = 4 dias).
 * Devolve 0 se faltar alguma data ou se o fim for antes do início.
 */
export function calcularDias(dataInicio, dataFim) {
  if (!dataInicio || !dataFim) return 0;
  const dias = (paraUTC(dataFim) - paraUTC(dataInicio)) / UM_DIA_MS + 1;
  return dias > 0 ? dias : 0;
}

/** Data de hoje em "AAAA-MM-DD" (hora local, para usar no min do input). */
export function hojeISO() {
  const hoje = new Date();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${hoje.getFullYear()}-${mes}-${dia}`;
}

/** "2026-10-10" -> "10/10/2026" */
export function formatarData(dataISO) {
  if (!dataISO) return "";
  const [ano, mes, dia] = dataISO.slice(0, 10).split("-");
  return `${dia}/${mes}/${ano}`;
}
