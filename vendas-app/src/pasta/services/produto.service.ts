import { httpCliente } from "pasta/http";
import { Produto } from "pasta/models/produtos";
import { AxiosResponse } from "axios";
import axios from "axios";

const resouceURL: string = "/api/produtos"

export const useProdutoService = () => {

    const salvar = async (produto: Produto): Promise<Produto> => {
        const response: AxiosResponse<Produto> = await httpCliente.post<Produto>(resouceURL, produto)
        return response.data;
    }

    const atualizar = async (produto: Produto): Promise<void> => {
        const url: string = `${resouceURL}/${produto.id}`
        await httpCliente.put<Produto>(url, produto)
    }

    const carregarProduto = async (id) : Promise<Produto> => {
        const url: string = `${resouceURL}/${id}`;
        const response: AxiosResponse<Produto> = await httpCliente.get(url)
        return response.data;
    }

    // const deletar = async (id) : Promise<void> => {
    //     const url: string = `${resouceURL}/${id}`;
    //     await httpCliente.delete(url);
    // }
 

    return {
        salvar,
        atualizar,
        carregarProduto,
        // deletar
    }
}