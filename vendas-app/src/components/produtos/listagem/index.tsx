"use client";

import { useEffect } from "react";
import { Layout } from "components/layout";
import { Loader } from "components/common";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importar useRouter
import { TabelaProdutos } from "./tabela";
import { Produto } from "pasta/models/produtos";
import { httpCliente } from "pasta/http";
import { AxiosResponse } from "axios";
import useSWR from "swr";
import { useProdutoService } from "pasta/services";
import { useState } from "react";
import { Alert } from "components/common/message";

const fetcher = (url: string) => httpCliente.get(url);

export const ListagemProdutos: React.FC = () => {

    const router = useRouter(); // Inicializar o router

    const [messages, setMessages] = useState<Array<Alert>>([]);
    const service = useProdutoService();

    const { data: result, error } = useSWR<AxiosResponse<Produto[]>>(
        "/api/produtos",
        fetcher
    );

    if (error) {
        return <Layout titulo="Produtos">Erro ao carregar os produtos.</Layout>;
    }

    const [lista, setLista] = useState<Produto[]>([]);

    useEffect(() => {
        setLista(result?.data || [])
    }, [result])

    const editar = (produto: Produto) => {
        const url = `/cadastros/produtos?id=${produto.id}`;
        router.push(url); // Redirecionar para a URL
    };

    const deletar = (produto: Produto) => {
        const url = `/cadastros/produtos?id=${produto.id}`;
        service.deletar(produto.id)
            .then(data => {
                setMessages([
                    { tipo: "success", texto: "Produto excluído com sucesso!" }
                ])
                const listaAlterada: Produto[] = lista?.filter(p => p.id != produto.id)
                setLista(listaAlterada);
            })
    }

    return (
        <Layout titulo="Produtos" mensagens={messages}>

            <Link href="/cadastros/produtos">
                <button className="button is-info">Novo</button>
            </Link>
            <br />
            <br />
            <Loader show={!result} />
            <TabelaProdutos
                onEdit={editar}
                onDelete={deletar}
                produtos={lista || []}
            />
            
        </Layout>
    );
};

