import { httpCliente } from "pasta/http";
import { Produto } from "pasta/models/produtos";
import { AxiosResponse } from "axios";
import axios from "axios";

const resouceURL: string = "/api/produtos";

export const useProdutoService = () => {
  const salvar = async (produto: Produto): Promise<Produto> => {
    const response: AxiosResponse<Produto> = await httpCliente.post<Produto>(
      resouceURL,
      produto
    );
    return response.data;
  };

  const atualizar = async (produto: Produto): Promise<void> => {
    const url: string = `${resouceURL}/${produto.id}`;
    await httpCliente.put<Produto>(url, produto);
  };

  const carregarProduto = async (id: string): Promise<Produto> => {
    const url: string = `${resouceURL}/${id}`;
    const response: AxiosResponse<Produto> = await httpCliente.get(url);
    return response.data;
  };

  const deletar = async (id: string): Promise<void> => {
    const url: string = `${resouceURL}/${id}`;
    await httpCliente.delete(url);
  };

  const mock = async (): Promise<void> => {
    const produtos = [
      {
        nome: "Smartphone XYZ",
        descricao:
          "Smartphone com tela de 6.5 polegadas, 128GB de armazenamento e câmera tripla.",
        preco: 1500.0,
        sku: "SKU123456",
      },
      {
        nome: "Notebook Ultrafino",
        descricao: "Notebook com processador i7, 16GB de RAM e SSD de 512GB.",
        preco: 4500.0,
        sku: "SKU789012",
      },
      {
        nome: "Fone de Ouvido Sem Fio",
        descricao:
          "Fone de ouvido Bluetooth com cancelamento de ruído e 20h de bateria.",
        preco: 350.0,
        sku: "SKU345678",
      },
      {
        nome: "Smart TV 4K",
        descricao: "TV 4K de 55 polegadas com HDR e smart features integradas.",
        preco: 3000.0,
        sku: "SKU901234",
      },
      {
        nome: "Câmera DSLR Profissional",
        descricao: "Câmera DSLR com lente 18-55mm, 24.2MP e gravação em 4K.",
        preco: 5000.0,
        sku: "SKU567890",
      },
      {
        nome: "Console de Videogame",
        descricao:
          "Console de última geração com 1TB de armazenamento e controle sem fio.",
        preco: 2500.0,
        sku: "SKU112233",
      },
      {
        nome: "Tablet Android",
        descricao:
          "Tablet com tela de 10 polegadas, 64GB de armazenamento e caneta stylus.",
        preco: 1200.0,
        sku: "SKU445566",
      },
      {
        nome: "Impressora Multifuncional",
        descricao: "Impressora com scanner, copiadora e conexão Wi-Fi.",
        preco: 800.0,
        sku: "SKU778899",
      },
      {
        nome: "Monitor Gamer",
        descricao: "Monitor de 27 polegadas, 144Hz e resolução QHD.",
        preco: 1800.0,
        sku: "SKU990011",
      },
      {
        nome: "Teclado Mecânico",
        descricao: "Teclado mecânico com switches azuis e iluminação RGB.",
        preco: 400.0,
        sku: "SKU223344",
      },
      {
        nome: "Mouse Gamer",
        descricao: "Mouse com sensor de 16000 DPI e 7 botões programáveis.",
        preco: 250.0,
        sku: "SKU556677",
      },
    ];

    const url: string = `${resouceURL}/mock`;
    await httpCliente.post(url, produtos);
  };

  return {
    salvar,
    atualizar,
    carregarProduto,
    deletar,
    mock
  };
};
