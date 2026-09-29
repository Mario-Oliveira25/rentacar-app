import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Loading from "../components/Loading";
import MensagemErro from "../components/MensagemErro";
import { getItem } from "../services/api";
import { formatarPreco } from "../utils/formatar";
import imagemSemCarro from "../assets/carro-sem-imagem.svg";

export default function DetalheCarro() {
  const { id } = useParams();

  const [carro, setCarro] = useState(null);
  const [aCarregar, setACarregar] = useState(true);
  const [erro, setErro] = useState("");

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
      </div>
    </main>
  );
}
