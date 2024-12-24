"use client";

import { Layout } from "components/layout";
import { Loader } from "components/common";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importar useRouter
import { TabelaProdutos } from "./tabela";
import { Produto } from "pasta/models/produtos";
import { httpCliente } from "pasta/http";
import { AxiosResponse } from "axios";
import useSWR from "swr";

const fetcher = (url: string) => httpCliente.get(url);

export const ListagemProdutos: React.FC = () => {
    const router = useRouter(); // Inicializar o router

    const { data: result, error } = useSWR<AxiosResponse<Produto[]>>(
        "/api/produtos",
        fetcher
    );

    if (error) {
        return <Layout titulo="Produtos">Erro ao carregar os produtos.</Layout>;
    }

    const editar = (produto: Produto) => {
        const url = `/cadastros/produtos?id=${produto.id}`;
        router.push(url); // Redirecionar para a URL
    };

    const deletar = (produto: Produto) => {
        console.log(`Excluindo o ${produto.nome}`);
    };

    return (
        <Layout titulo="Produtos">
            <Link href="/cadastros/produtos">
                <button className="button is-info">Novo</button>
            </Link>
            <br />
            <br />
            <Loader show={!result} />
            <TabelaProdutos
                onEdit={editar}
                onDelete={deletar}
                produtos={result?.data || []}
            />
        </Layout>
    );
};
