const formatoEuro = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
});

/** 32 -> "32,00 €" */
export function formatarPreco(valor) {
  return formatoEuro.format(valor ?? 0);
}
