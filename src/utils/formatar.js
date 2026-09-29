const formatoEuro = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
});

export function formatarPreco(valor) {
  return formatoEuro.format(valor ?? 0);
}
