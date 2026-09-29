# hooks/

Hooks próprios da aplicação. Regras:

- O nome começa sempre por `use` (ex.: `useFavoritos`, `useCarros`, `useCarro`).
- Só são hooks se usarem outros hooks (`useState`, `useEffect`…). Funções que só fazem
  pedidos à API ficam em `services/api.js` e **não** levam `use`.
- Chamam-se só no topo de componentes ou de outros hooks (nunca dentro de `if`, ciclos ou handlers).
