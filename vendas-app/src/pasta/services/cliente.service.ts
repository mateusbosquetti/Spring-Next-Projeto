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
    }

    const carregarCliente = async (cliente: Cliente) : Promise<Cliente> => {
        const url: string = `${resouceURL}/${cliente.id}`;
        const response: AxiosResponse<Cliente> = await httpCliente.get(url);
        return response.data;
    };

    const deletar = async (cliente: Cliente) : Promise<void> {
        const url: string = `${resouceURL}/${cliente.id}`;
        await httpCliente.delete(url);
    };

    return {
        salvar,
        atualizar,
        carregarCliente,
        deletar
    };
};