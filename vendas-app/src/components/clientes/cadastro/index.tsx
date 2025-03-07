"use client";
import { useClientService } from "pasta/services";
import { useEffect, useState } from "react";
import { Alert } from "components/common/message";
import { useSearchParams } from "next/navigation";
import { Produto } from "pasta/models/produtos";
import { Cliente } from "pasta/models/clientes";
import * as yup from "yup";
import { error } from "console";
import { Layout } from "components/layout";
import { Input } from "components/common";
import Link from "next/link";

const requiredMessage = "Campo Obrigatório";

const validationSchema = yup.object().shape({
  nome: yup.string().trim().required(requiredMessage),
  cpf: yup.string().trim().required(requiredMessage),
  nascimento: yup.string().trim().required(requiredMessage),
  endereco: yup.string().trim().required(requiredMessage),
  email: yup.string().trim().required(requiredMessage),
  telefone: yup.string().trim().required(requiredMessage),
});

interface FormErros {
  nome?: string;
  cpf?: string;
  nascimento?: string;
  endereco?: string;
  email?: string;
  telefone?: string;
}

export const CadastroClientes: React.FC = () => {
  const service = useClientService();
  const [nome, setNome] = useState<string | undefined>("");
  const [cpf, setCpf] = useState<string | undefined>("");
  const [nascimento, setDataNascimento] = useState<string | undefined>("");
  const [endereco, setEndereco] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [telefone, setTelefone] = useState<string | undefined>("");
  const [cadastro, setCadastro] = useState<string | undefined>("");
  const [id, setId] = useState<string | undefined>("");
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const [errors, setErrors] = useState<FormErros>({});

  const searchParams = useSearchParams();
  const idURL = searchParams.get("id");

  useEffect(() => {
    if (idURL) {
      service.carregarCliente(idURL).then((data) => {
        console.log(data);
        setId(data.id);
        setNome(data.nome);
        setCpf(data.cpf);
        setDataNascimento(data.nascimento);
        setEndereco(data.endereco);
        setEmail(data.email);
        setTelefone(data.telefone);
        setCadastro(data.dataCadastro);
      });
    }
  }, [idURL]);

  const submit = () => {
    const cliente: Cliente = {
      id,
      nome,
      cpf: removerMascaraCPF(cpf || ""),
      nascimento: removerMascaraDataNascimento(nascimento || ""),
      endereco,
      email,
      telefone: removerMascaraTelefone(telefone || ""),
    };

    console.log(cliente);

    validationSchema
      .validate(cliente)
      .then((data) => {
        setErrors({});
        if (id) {
          service
            .atualizar(cliente)
            .then((data) =>
              setMessages([
                {
                  texto: "Cliente atualizado com sucesso",
                  tipo: "success",
                },
              ])
            )
            .catch((error) => console.log(error));
        } else {
          service
            .salvar(cliente)
            .then((data) => {
              setId(data.id);
              setCadastro(data.dataCadastro);
              setMessages([
                {
                  texto: "Cliente adicionado com sucesso",
                  tipo: "success",
                },
              ]);
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => {
        const field = error.path;
        const message = error.message;

        setErrors({
          [field]: message,
        });
      });
  };

  const formatarCPF = (value: string): string => {
    // Remove tudo que não é dígito
    const cpf = value.replace(/\D/g, "");

    // Aplica a máscara: XXX.XXX.XXX-XX
    return cpf
      .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o primeiro ponto
      .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o segundo ponto
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona o hífen
  };

  const removerMascaraCPF = (cpf: string) => {
    return cpf.replace(/\D/g, ""); // Remove tudo que não é dígito
  };

  const formatarTelefone = (telefone: string): string => {
    // Remove tudo que não é dígito
    const numeros = telefone.replace(/\D/g, "");

    // Aplica a máscara: (XX) XXXXX-XXXX
    return numeros
      .replace(/^(\d{2})(\d)/, "($1) $2") // Adiciona os parênteses e o espaço
      .replace(/(\d{5})(\d)/, "$1-$2"); // Adiciona o hífen
  };

  const removerMascaraTelefone = (telefone: string): string => {
    // Remove tudo que não é dígito
    return telefone.replace(/\D/g, "");
  };

  const formatarDataNascimento = (data: string): string => {
    // Remove tudo que não é dígito
    const numeros = data.replace(/\D/g, "");

    // Aplica a máscara: dd/MM/yyyy
    return numeros
      .replace(/^(\d{2})(\d)/, "$1/$2") // Adiciona a primeira barra
      .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3") // Adiciona a segunda barra
      .slice(0, 10); // Limita o tamanho máximo da string (10 caracteres)
  };

  const removerMascaraDataNascimento = (data: string): string => {
    // Remove tudo que não é dígito
    const numeros = data.replace(/\D/g, "");

    // Verifica se a data está completa (8 dígitos: ddMMyyyy)
    if (numeros.length === 8) {
      const dia = numeros.slice(0, 2);
      const mes = numeros.slice(2, 4);
      const ano = numeros.slice(4, 8);
      return `${ano}-${mes}-${dia}`; // Formato yyyy-MM-dd
    }

    // Retorna a data sem formatação se não estiver completa
    return numeros;
  };

  return (
    <Layout titulo="Clientes" mensagens={messages}>
      {id && (
        <div className="columns">
          <Input
            label="Código:"
            columnClasses="is-half"
            value={id}
            id="inputId"
            disabled
          />

          <Input
            label="Data Cadastro:"
            columnClasses="is-half"
            value={cadastro}
            id="inputDataCadastro"
            disabled
          />
        </div>
      )}

      <div className="columns">
        <Input
          label="Nome: *"
          columnClasses="is-full"
          onChange={(e) => setNome(e.target.value)}
          value={nome}
          placeholder="Insira o Nome do Cliente"
          id="inputNome"
          error={errors.nome}
        />
      </div>
      <div className="columns">
        <Input
          label="CPF: *"
          columnClasses="is-half"
          onChange={(e) => {
            const valorFormatado = formatarCPF(e.target.value);
            if (valorFormatado.length <= 14) {
              setCpf(valorFormatado);
            }
          }}
          value={cpf}
          placeholder="Insira o CPF do Cliente"
          id="inputCpf"
          error={errors.cpf}
        />

        <Input
          label="Data Nascimento: *"
          columnClasses="is-half"
          onChange={(e) => {
            const dataFormatada = formatarDataNascimento(e.target.value);
            if (dataFormatada.length <= 10) {
              setDataNascimento(dataFormatada);
            }
          }}
          value={nascimento}
          placeholder="Insira a Data de Nascimentodo Cliente"
          id="inputDataNascimento"
          error={errors.nascimento}
        />
      </div>
      <div className="columns">
        <Input
          label="Endereço: *"
          columnClasses="is-full"
          onChange={(e) => setEndereco(e.target.value)}
          value={endereco}
          placeholder="Insira o Endereço do Cliente"
          id="inputEndereco"
          error={errors.endereco}
        />
      </div>
      <div className="columns">
        <Input
          label="Email: *"
          columnClasses="is-half"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Insira o Email do Cliente"
          id="inputEmail"
          error={errors.email}
        />

        <Input
          label="Telefone: *"
          columnClasses="is-half"
          onChange={(e) => {
            const telefoneFormatado = formatarTelefone(e.target.value);
            if (telefoneFormatado.length <= 15) {
              setTelefone(telefoneFormatado);
            }
          }}
          value={telefone}
          placeholder="Insira o Telefone do Cliente"
          id="inputTelefone"
          error={errors.telefone}
        />
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button onClick={submit} className="button is-link">
            {id ? "Atualizar" : "Salvar"}
          </button>
        </div>
        <div className="control">
          <Link href="/consultas/clientes">
            <button className="button is-link is-light">Voltar</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
