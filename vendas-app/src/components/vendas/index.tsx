"use client"

import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Stack } from '@mui/material';
import { Layout } from 'components';
import { useClientService } from 'pasta/services';
import { useProdutoService } from 'pasta/services';
import { Cliente } from 'pasta/models/clientes';
import { Produto } from 'pasta/models/produtos';

export const Vendas: React.FC = () => {
    const { listarCliente } = useClientService();
    const { listarProduto } = useProdutoService();
    const [listaCliente, setListaCliente] = useState<Cliente[]>([]);
    const [listaProduto, setListaProduto] = useState<Produto[]>([]);
    const [sku, setSKU] = useState<string>("");
    const [valueCliente, setValueCliente] = useState<Cliente | null>(null);
    const [valueProduto, setValueProduto] = useState<Produto | null>(null);

    // Busca clientes ao montar o componente
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const clientes = await listarCliente();
                setListaCliente(clientes);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        };

        fetchClientes();
    }, [listarCliente]);

    // Busca produtos ao montar o componente
    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const produtos = await listarProduto();
                setListaProduto(produtos);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProdutos();
    }, [listarProduto]);

    // Atualiza o SKU quando um produto é selecionado no dropdown
    useEffect(() => {
        if (valueProduto) {
            setSKU(valueProduto.sku); // Atualiza o campo de SKU com o SKU do produto selecionado
        }
    }, [valueProduto]);

    // Seleciona o produto automaticamente quando o SKU é digitado
    useEffect(() => {
        if (sku) {
            const produtoSelecionado = listaProduto.find((produto) => produto.sku === sku);
            if (produtoSelecionado && produtoSelecionado !== valueProduto) {
                setValueProduto(produtoSelecionado); // Atualiza o produto selecionado no dropdown
            }
        }
    }, [sku]); // Dependência: apenas sku

    const clienteProps = {
        options: listaCliente,
        getOptionLabel: (option: Cliente) => option.nome,
    };

    const produtoProps = {
        options: listaProduto,
        getOptionLabel: (option: Produto) => option.nome,
    };

    return (
        <Layout titulo='Vendas'>
            <div className='columns'>
                <div className="column is-full">
                    <Autocomplete
                        {...clienteProps}
                        id="auto-complete-cliente"
                        autoComplete
                        includeInputInList
                        value={valueCliente}
                        onChange={(event, newValue) => {
                            setValueCliente(newValue);
                            console.log(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Cliente" variant="standard" />
                        )}
                    />
                </div>
            </div>

            <div className='columns'>
                <div className="column is-one-quarter">
                    <Autocomplete
                        {...produtoProps}
                        id="auto-complete-produto"
                        autoComplete
                        includeInputInList
                        value={valueProduto}
                        onChange={(event, newValue) => {
                            setValueProduto(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Produto" variant="standard" />
                        )}
                    />
                </div>
                <div className="column is-one-quarter">
                    <TextField
                        id="sku-field"
                        label="SKU"
                        variant="standard"
                        value={sku}
                        onChange={(e) => setSKU(e.target.value)}
                        disabled={!!valueProduto} // Desabilita o campo se um produto estiver selecionado
                    />
                </div>
            </div>
        </Layout>
    );
};