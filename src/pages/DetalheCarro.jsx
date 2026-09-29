import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import {
  criarReserva,
  getItem,
  verificarDisponibilidade,
} from "../services/api";
import { calcularDias, formatarData, hojeISO } from "../utils/datas";
import { formatarPreco } from "../utils/formatar";
import imagemSemCarro from "../assets/carro-sem-imagem.svg";

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const [errosCampos, setErrosCampos] = useState({});
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

  function validar() {
    const erros = {};
    const quantidadeNumerica = Number(quantidade);

    if (!dataInicio) {
      erros.dataInicio = "Escolhe a data de levantamento.";
    } else if (dataInicio < hojeISO()) {
      erros.dataInicio = "A data de levantamento não pode ser anterior a hoje.";
    }

    if (!dataFim) {
      erros.dataFim = "Escolhe a data de devolução.";
    } else if (dataInicio && dataFim < dataInicio) {
      erros.dataFim = "A data de devolução não pode ser anterior à de levantamento.";
    }

    if (
      !Number.isInteger(quantidadeNumerica) ||
      quantidadeNumerica < 1 ||
      quantidadeNumerica > carro.capacidade
    ) {
      erros.quantidade = `Escolhe entre 1 e ${carro.capacidade} passageiros.`;
    }

    if (!nome.trim()) {
      erros.nome = "Indica o teu nome.";
    }

    if (!EMAIL_VALIDO.test(email.trim())) {
      erros.email = "Indica um email válido (ex.: ana@exemplo.pt).";
    }

    return erros;
  }

  function classeCampo(campo) {
    return errosCampos[campo] ? "form-control is-invalid" : "form-control";
  }

  function novaReserva() {
    setReservaConfirmada(null);
    setDataInicio("");
    setDataFim("");
    setQuantidade(1);
  }

  async function submeterReserva(evento) {
    evento.preventDefault();

    setErroReserva("");

    const erros = validar();
    setErrosCampos(erros);
    if (Object.keys(erros).length > 0) return;

    const quantidadeNumerica = Number(quantidade);
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

  if (erro || !carro) {
    return (
      <>
        <MensagemErro mensagem={erro || "Carro não encontrado."} />
        <Link to="/" className="btn btn-outline-primary">
          Voltar aos carros
        </Link>
      </>
    );
  }

  return (
    <>
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
                <div className="alert alert-success mb-0" role="alert">
                  <h3 className="h5">Reserva criada com sucesso!</h3>
                  <p className="mb-1">
                    {formatarData(reservaConfirmada.dataInicio)} a{" "}
                    {formatarData(reservaConfirmada.dataFim)} ·{" "}
                    {reservaConfirmada.quantidade}{" "}
                    {reservaConfirmada.quantidade === 1 ? "passageiro" : "passageiros"}
                  </p>
                  <p className="mb-3">
                    Total da reserva:{" "}
                    <strong>{formatarPreco(reservaConfirmada.total)}</strong>
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <Link to="/reservas" className="btn btn-success">
                      Ver as minhas reservas
                    </Link>
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={novaReserva}
                    >
                      Fazer outra reserva
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submeterReserva} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="dataInicio" className="form-label">
                        Data de levantamento
                      </label>
                      <input
                        id="dataInicio"
                        type="date"
                        className={classeCampo("dataInicio")}
                        min={hojeISO()}
                        value={dataInicio}
                        onChange={(evento) => {
                          setDataInicio(evento.target.value);

                          if (dataFim && evento.target.value > dataFim) {
                            setDataFim("");
                          }
                        }}
                      />
                      <div className="invalid-feedback">{errosCampos.dataInicio}</div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="dataFim" className="form-label">
                        Data de devolução
                      </label>
                      <input
                        id="dataFim"
                        type="date"
                        className={classeCampo("dataFim")}
                        min={dataInicio || hojeISO()}
                        value={dataFim}
                        onChange={(evento) => setDataFim(evento.target.value)}
                      />
                      <div className="invalid-feedback">{errosCampos.dataFim}</div>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="quantidade" className="form-label">
                        Passageiros
                      </label>
                      <input
                        id="quantidade"
                        type="number"
                        className={classeCampo("quantidade")}
                        min="1"
                        max={carro.capacidade}
                        value={quantidade}
                        onChange={(evento) =>
                          setQuantidade(evento.target.value)
                        }
                      />
                      <div className="invalid-feedback">{errosCampos.quantidade}</div>
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
                        className={classeCampo("nome")}
                        value={nome}
                        onChange={(evento) => setNome(evento.target.value)}
                      />
                      <div className="invalid-feedback">{errosCampos.nome}</div>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={classeCampo("email")}
                        value={email}
                        onChange={(evento) => setEmail(evento.target.value)}
                      />
                      <div className="invalid-feedback">{errosCampos.email}</div>
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
    </>
  );
}
