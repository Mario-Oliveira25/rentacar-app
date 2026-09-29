export default function Loading({ texto = "A carregar…" }) {
  return (
    <div className="d-flex align-items-center justify-content-center gap-2 py-5 text-secondary">
      <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
      <span>{texto}</span>
    </div>
  );
}
