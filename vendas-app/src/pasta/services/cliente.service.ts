import { AxiosResponse } from "axios";
import { httpCliente } from "pasta/http";
import { Cliente } from "pasta/models/clientes";

const resouceURL: string = "/api/clientes";

export const useClientService = () => {
  const salvar = async (cliente: Cliente): Promise<Cliente> => {
    const response: AxiosResponse<Cliente> = await httpCliente.post<Cliente>(
      resouceURL,
      cliente
    );
    return response.data;
  };

  const atualizar = async (cliente: Cliente): Promise<void> => {
    const url: string = `${resouceURL}/${cliente.id}`;
    await httpCliente.put<Cliente>(url, cliente);
  };

  const carregarCliente = async (id: string): Promise<Cliente> => {
    const url: string = `${resouceURL}/${id}`;
    const response: AxiosResponse<Cliente> = await httpCliente.get(url);
    return response.data;
  };

  const listarCliente = async (): Promise<Array<Cliente>> => {
    const response: AxiosResponse<Array<Cliente>> = await httpCliente.get(resouceURL);
    return response.data.content;
  };

  const deletar = async (id: string): Promise<void> => {
    const url: string = `${resouceURL}/${id}`;
    await httpCliente.delete(url);
  };

  const mock = async (): Promise<void> => {
    const clientes = [
      {
        nascimento: "1995-03-15",
        cpf: "12345678901",
        nome: "João Silva",
        endereco: "Rua das Flores, 123",
        telefone: "11999999999",
        email: "joao.silva@example.com",
      },
      {
        nascimento: "1988-07-22",
        cpf: "98765432109",
        nome: "Maria Oliveira",
        endereco: "Avenida Brasil, 456",
        telefone: "21888888888",
        email: "maria.oliveira@example.com",
      },
      {
        nascimento: "1976-11-30",
        cpf: "45678912345",
        nome: "Carlos Souza",
        endereco: "Travessa das Palmeiras, 789",
        telefone: "31777777777",
        email: "carlos.souza@example.com",
      },
      {
        nascimento: "1992-05-10",
        cpf: "32165498700",
        nome: "Ana Costa",
        endereco: "Alameda dos Anjos, 101",
        telefone: "41666666666",
        email: "ana.costa@example.com",
      },
      {
        nascimento: "1985-09-18",
        cpf: "65432198711",
        nome: "Pedro Rocha",
        endereco: "Praça da Liberdade, 202",
        telefone: "51555555555",
        email: "pedro.rocha@example.com",
      },
      {
        nascimento: "1998-12-25",
        cpf: "78912345622",
        nome: "Fernanda Lima",
        endereco: "Rua F, 303",
        telefone: "61444444444",
        email: "fernanda.lima@example.com",
      },
      {
        nascimento: "1975-04-14",
        cpf: "23456789033",
        nome: "Ricardo Almeida",
        endereco: "Avenida G, 404",
        telefone: "71333333333",
        email: "ricardo.almeida@example.com",
      },
      {
        nascimento: "1992-06-20",
        cpf: "56789012344",
        nome: "Juliana Santos",
        endereco: "Travessa H, 505",
        telefone: "81222222222",
        email: "juliana.santos@example.com",
      },
      {
        nascimento: "1980-02-28",
        cpf: "89012345655",
        nome: "Lucas Pereira",
        endereco: "Alameda I, 606",
        telefone: "91111111111",
        email: "lucas.pereira@example.com",
      },
      {
        nascimento: "1997-10-12",
        cpf: "34567890166",
        nome: "Patrícia Gomes",
        endereco: "Praça J, 707",
        telefone: "02999998888",
        email: "patricia.gomes@example.com",
      },
      {
        nascimento: "1987-08-05",
        cpf: "67890123477",
        nome: "Marcos Ribeiro",
        endereco: "Rua K, 808",
        telefone: "02888887777",
        email: "marcos.ribeiro@example.com",
      },
    ];

    const url: string = `${resouceURL}/mock`;
    await httpCliente.post(url, clientes);
  };

  return {
    salvar,
    atualizar,
    carregarCliente,
    deletar,
    mock,
    listarCliente
  };
};
