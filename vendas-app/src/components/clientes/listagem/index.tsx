"use client";

import { Input } from "components/common";
import { Layout } from "components/layout";
import { useClientService } from "pasta/services";
import { useState } from "react";

interface ConsultaClientesForm {
  nome?: string;
  cpf?: string;
}

export const ListagemClientes: React.FC = () => {
  const service = useClientService();
  const [nome, setNome] = useState<string | undefined>("");
  const [cpf, setCpf] = useState<string | undefined>("");

  const submit = () => {
    const filtro = {
      nome,
      cpf,
    };

    console.log(filtro);
  };

  return (
    <Layout titulo="Clientes">
      <form>
        <div className="columns">
          <Input
            label="Nome:"
            id="nome"
            name="nome"
            columnClasses="is-half"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
          />
          <Input
            label="CPF:"
            id="cpf"
            name="cpf"
            columnClasses="is-half"
            value={cpf}
            onChange={(e) => {
              setCpf(e.target.value);
            }}
          />
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button onClick={submit} className="button is-link">
              Consultar
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};
