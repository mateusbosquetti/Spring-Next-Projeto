import { httpCliente } from "pasta/http";
import { Produto } from "pasta/models/produtos";
import { AxiosResponse } from "axios";
import axios from "axios";

const resouceURL: string = "/api/produtos"

export const useProdutoService = () => {

    const salvar = async (produto: Produto) : Promise<Produto> => {
        const response: AxiosResponse<Produto> = await httpCliente.post<Produto>(resouceURL, produto)
        return response.data;
    }

    return {
        salvar
    }
}