const UM_DIA_MS = 24 * 60 * 60 * 1000;

function paraUTC(dataISO) {
  const [ano, mes, dia] = dataISO.split("-").map(Number);
  return Date.UTC(ano, mes - 1, dia);
}

export function calcularDias(dataInicio, dataFim) {
  if (!dataInicio || !dataFim) return 0;
  const dias = (paraUTC(dataFim) - paraUTC(dataInicio)) / UM_DIA_MS + 1;
  return dias > 0 ? dias : 0;
}

export function hojeISO() {
  const hoje = new Date();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${hoje.getFullYear()}-${mes}-${dia}`;
}

export function formatarData(dataISO) {
  if (!dataISO) return "";
  const [ano, mes, dia] = dataISO.slice(0, 10).split("-");
  return `${dia}/${mes}/${ano}`;
}
