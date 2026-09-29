# rentacar-app

Frontend em React do Projeto Final da UC00621 (tema **Rent-a-car**): pesquisa de carros,
reserva e gestão de reservas, a comunicar com a API do projeto final.

## Arrancar

1. Arrancar a API (noutro terminal, na pasta da API): `npm start` → http://localhost:3001
2. Nesta pasta:

   ```bash
   npm install
   npm run dev
   ```

3. Abrir o endereço que aparece no terminal (normalmente http://localhost:5173).
   A página inicial mostra a lista de carros.

Bibliotecas: React, React Router (`react-router-dom`) e Bootstrap (só o CSS).

## Estrutura

```
src/
├── main.jsx                  # BrowserRouter + CSS do Bootstrap
├── App.jsx                   # definição das rotas
├── index.css                 # tema escuro (cores em variáveis) e estilos próprios
├── assets/
│   └── carro-sem-imagem.svg  # imagem de substituição quando carro.imagem é null
├── components/
│   ├── Layout.jsx            # Navbar + <Outlet /> + rodapé
│   ├── Navbar.jsx
│   ├── Loading.jsx           # <Loading texto="…" />
│   ├── MensagemErro.jsx      # <MensagemErro mensagem={erro} />
│   ├── EstadoVazio.jsx       # <EstadoVazio mensagem="…">botão opcional</EstadoVazio>
│   ├── CarroCard.jsx         # card de um carro (link para o detalhe + favorito)
│   ├── ListaCarros.jsx       # grelha de CarroCard (listagem e favoritos)
│   ├── FiltrosCarros.jsx     # pesquisa, localização, categoria, ordenação e recarregar
│   ├── ReservaCard.jsx       # card de uma reserva (estado + cancelar)
│   └── FiltrosReservas.jsx   # pesquisa, estado e ordenação das reservas
├── hooks/
│   └── useFavoritos.js       # favoritos guardados no localStorage
├── pages/
│   ├── Inicio.jsx            # listagem de carros
│   ├── DetalheCarro.jsx      # detalhe + formulário de reserva
│   ├── Favoritos.jsx
│   ├── MinhasReservas.jsx
│   └── PaginaNaoEncontrada.jsx
├── services/
│   └── api.js                # TODOS os pedidos à API
└── utils/
    ├── datas.js              # calcularDias, hojeISO, formatarData
    ├── formatar.js           # formatarPreco
    └── reservas.js           # estadoReserva (próxima, a decorrer, terminada)
```

## Rotas

| Rota | Página | Responsável |
|---|---|---|
| `/` | Listagem, pesquisa, filtros e ordenação | Pessoa 1 |
| `/favoritos` | Carros favoritos | Pessoa 1 |
| `/carros/:id` | Detalhe do carro + formulário de reserva | Pessoa 2 |
| `/reservas` | As minhas reservas (cancelar) | Pessoa 3 |
| `*` | Página 404 | — |

## Regras combinadas

- **Nada de `fetch` nos componentes.** Usar as funções de `services/api.js`:
  `getItens`, `getItem`, `verificarDisponibilidade`, `getReservas`, `criarReserva`, `cancelarReserva`.
  Todas lançam um `Error` com a mensagem da API, por isso usa-se sempre:

  ```js
  try {
    const carro = await getItem(id);
  } catch (e) {
    setErro(e.message); // ex.: "Item não encontrado."
  }
  ```

- **Campos dos carros:** `nome`, `descricao`, `categoria`, `localizacao` (cidade), `precoDia`,
  `capacidade` (máx. de passageiros), `unidades`, `avaliacao`, `imagem` (pode ser `null`),
  `caixa`, `combustivel`, `portas`, `malas`.
- **N.º de dias:** conta o primeiro e o último (`calcularDias("2026-10-10", "2026-10-13")` → 4).
  É só uma estimativa: o total final vem da API em `reserva.total`.
- **Hooks** começam por `use` e ficam em `hooks/`.
- Sem imagem → usar `carro-sem-imagem.svg`.

## Git

- Nunca trabalhar diretamente na `main`. Uma branch por funcionalidade:
  `feat/listagem`, `feat/favoritos`, `feat/detalhe-reserva`, `feat/minhas-reservas`.
- Pull Request revisto por outro elemento do grupo antes de juntar à `main`.
- Antes de começar a trabalhar: `git pull` na `main` e atualizar a branch.

## Base de dados (`dados.db`)

A Pessoa 3 é a "dona" do `dados.db`: adiciona as imagens dos carros (Postman → PATCH) e
partilha o ficheiro com o grupo. Os outros copiam-no para a pasta da API **com a API parada**.
Ninguém corre `npm run seed` depois disso (apaga as imagens e as reservas).

## Entrega

`.zip` com o nome dos elementos (ex.: `primeiro_segundo_terceiro.zip`) com:

- a pasta `rentacar-app` **sem** `node_modules/`;
- o ficheiro `dados.db` da API.
