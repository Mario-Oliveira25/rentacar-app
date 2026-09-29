import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import {
  criarReserva,
  getItem,
  verificarDisponibilidade,
} from "../services/api";
import { calcularDias, hojeISO } from "../utils/datas";
import { formatarPreco } from "../utils/formatar";
import imagemSemCarro from "../assets/carro-sem-imagem.svg";

export default function DetalheCarro() {
  const { id } = useParams();

  const [carro, setCarro] = useState(null);
  const [aCarregar, setACarregar] = useState(true);
  const [erro, setErro] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erroReserva, setErroReserva] = useState("");
  const [aReservar, setAReservar] = useState(false);
  const [reservaConfirmada, setReservaConfirmada] = useState(null);

  useEffect(() => {
    async function carregarCarro() {
      setACarregar(true);
      setErro("");

      try {
        const dados = await getItem(id);
        setCarro(dados);
      } catch (e) {
        setErro(e.message);
      } finally {
        setACarregar(false);
      }
    }

    carregarCarro();
  }, [id]);

  const diasEstimados = calcularDias(dataInicio, dataFim);
  const totalEstimado =
    carro && diasEstimados > 0 ? diasEstimados * carro.precoDia : 0;

  async function submeterReserva(evento) {
    evento.preventDefault();

    setErroReserva("");
    setReservaConfirmada(null);

    if (!dataInicio || !dataFim) {
      setErroReserva("Preenche as datas de levantamento e devolução.");
      return;
    }

    if (dataFim < dataInicio) {
      setErroReserva(
        "A data de devolução não pode ser anterior à data de levantamento.",
      );
      return;
    }

    const quantidadeNumerica = Number(quantidade);

    if (
      !Number.isInteger(quantidadeNumerica) ||
      quantidadeNumerica < 1 ||
      quantidadeNumerica > carro.capacidade
    ) {
      setErroReserva(
        `A quantidade deve estar entre 1 e ${carro.capacidade} passageiros.`,
      );
      return;
    }

    setAReservar(true);

    try {
      const disponivel = await verificarDisponibilidade(
        Number(id),
        dataInicio,
        dataFim,
        quantidadeNumerica,
      );

      if (!disponivel) {
        setErroReserva("O carro não está disponível para as datas escolhidas.");
        return;
      }

      const reserva = await criarReserva({
        itemId: Number(id),
        dataInicio,
        dataFim,
        quantidade: quantidadeNumerica,
        nome: nome.trim(),
        email: email.trim(),
      });

      setReservaConfirmada(reserva);
    } catch (e) {
      setErroReserva(e.message);
    } finally {
      setAReservar(false);
    }
  }

  if (aCarregar) {
    return <Loading texto="A carregar carro..." />;
  }

  if (erro) {
    return (
      <section className="container py-4">
        <MensagemErro mensagem={erro} />
        <Link to="/" className="btn btn-outline-primary">
          Voltar aos carros
        </Link>
      </section>
    );
  }

  if (!carro) {
    return (
      <section className="container py-4">
        <MensagemErro mensagem="Carro não encontrado." />
        <Link to="/" className="btn btn-outline-primary">
          Voltar aos carros
        </Link>
      </section>
    );
  }

  return (
    <main className="container py-4">
      <Link to="/" className="btn btn-link px-0 mb-3">
        ← Voltar aos carros
      </Link>

      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={carro.imagem || imagemSemCarro}
            alt={carro.nome}
            className="img-fluid rounded w-100"
          />
        </div>

        <div className="col-md-6">
          <h1>{carro.nome}</h1>

          <p className="text-secondary">{carro.descricao}</p>

          <p className="fs-4 fw-bold">{formatarPreco(carro.precoDia)} / dia</p>

          <dl className="row">
            <dt className="col-sm-5">Localização</dt>
            <dd className="col-sm-7">{carro.localizacao}</dd>

            <dt className="col-sm-5">Categoria</dt>
            <dd className="col-sm-7">{carro.categoria}</dd>

            <dt className="col-sm-5">Avaliação</dt>
            <dd className="col-sm-7">{carro.avaliacao}</dd>

            <dt className="col-sm-5">Capacidade</dt>
            <dd className="col-sm-7">{carro.capacidade} passageiros</dd>

            <dt className="col-sm-5">Caixa</dt>
            <dd className="col-sm-7">{carro.caixa}</dd>

            <dt className="col-sm-5">Combustível</dt>
            <dd className="col-sm-7">{carro.combustivel}</dd>

            <dt className="col-sm-5">Portas</dt>
            <dd className="col-sm-7">{carro.portas}</dd>

            <dt className="col-sm-5">Malas</dt>
            <dd className="col-sm-7">{carro.malas}</dd>
          </dl>
        </div>

        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h4">Fazer reserva</h2>

              <MensagemErro mensagem={erroReserva} />

              {reservaConfirmada ? (
                <div className="alert alert-success" role="alert">
                  <h3 className="h5">Reserva criada com sucesso!</h3>
                  <p className="mb-1">
                    Total da reserva:{" "}
                    <strong>{formatarPreco(reservaConfirmada.total)}</strong>
                  </p>
                  <p className="mb-0">Este é o valor calculado pela API.</p>
                </div>
              ) : (
                <form onSubmit={submeterReserva}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="dataInicio" className="form-label">
                        Data de levantamento
                      </label>
                      <input
                        id="dataInicio"
                        type="date"
                        className="form-control"
                        min={hojeISO()}
                        value={dataInicio}
                        onChange={(evento) => {
                          setDataInicio(evento.target.value);

                          if (dataFim && evento.target.value > dataFim) {
                            setDataFim("");
                          }
                        }}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="dataFim" className="form-label">
                        Data de devolução
                      </label>
                      <input
                        id="dataFim"
                        type="date"
                        className="form-control"
                        min={dataInicio || hojeISO()}
                        value={dataFim}
                        onChange={(evento) => setDataFim(evento.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="quantidade" className="form-label">
                        Passageiros
                      </label>
                      <input
                        id="quantidade"
                        type="number"
                        className="form-control"
                        min="1"
                        max={carro.capacidade}
                        value={quantidade}
                        onChange={(evento) =>
                          setQuantidade(evento.target.value)
                        }
                        required
                      />
                      <div className="form-text">
                        Máximo: {carro.capacidade} passageiros.
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="nome" className="form-label">
                        Nome
                      </label>
                      <input
                        id="nome"
                        type="text"
                        className="form-control"
                        value={nome}
                        onChange={(evento) => setNome(evento.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(evento) => setEmail(evento.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {diasEstimados > 0 && (
                    <p className="mt-3 mb-2">
                      Estimativa: {diasEstimados}{" "}
                      {diasEstimados === 1 ? "dia" : "dias"} ×{" "}
                      {formatarPreco(carro.precoDia)} ={" "}
                      <strong>{formatarPreco(totalEstimado)}</strong>
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary mt-2"
                    disabled={aReservar}
                  >
                    {aReservar ? "A verificar..." : "Confirmar reserva"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
