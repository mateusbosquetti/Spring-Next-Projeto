"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Autocomplete, TextField, Stack, Button } from "@mui/material";
import { Layout } from "components";
import { useClientService } from "pasta/services";
import { useProdutoService } from "pasta/services";
import { Cliente } from "pasta/models/clientes";
import { Produto } from "pasta/models/produtos";
import { AxiosResponse } from "axios";
import useSWR from "swr";
import { httpCliente } from "pasta/http";

const fetcher = (url: string) => httpCliente.get(url);

export const Vendas: React.FC = () => {
  // Produto
  const {
    data: produtoResult,
    error: produtoError,
    mutate: produtoMutate,
  } = useSWR<AxiosResponse<Produto[]>>("/api/produtos", fetcher);

  if (produtoError) {
    return <Layout titulo="Produtos">Erro ao carregar os produtos.</Layout>;
  }

  useEffect(() => {
    setListaProduto(produtoResult?.data.content || []);
  }, [produtoResult]);

  // Cliente
  const {
    data: clienteResult,
    error: clienteError,
    mutate: clienteMutate,
  } = useSWR<AxiosResponse<Cliente[]>>("/api/clientes", fetcher);

  if (clienteError) {
    return <Layout titulo="Clientes">Erro ao carregar os clientes.</Layout>;
  }

  useEffect(() => {
    setListaCliente(clienteResult?.data.content || []);
  }, [clienteResult]);

  const { listarCliente } = useClientService();
  const { listarProduto } = useProdutoService();
  const [listaCliente, setListaCliente] = useState<Cliente[]>([]);
  const [listaProduto, setListaProduto] = useState<Produto[]>([]);
  const [sku, setSKU] = useState<string>("");
  const [valueCliente, setValueCliente] = useState<Cliente | null>(null);
  const [valueProduto, setValueProduto] = useState<Produto | null>(null);

  const clienteProps = {
    options: listaCliente,
    getOptionLabel: (option: Cliente) => option.nome,
  };

  const produtoProps = {
    options: listaProduto,
    getOptionLabel: (option: Produto) => option.nome,
  };

  return (
    <Layout titulo="Vendas">
      <div className="columns">
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
      <div className="columns is-vcentered">
        {/* Coluna para o Autocomplete e TextField */}
        <div className="column is-two-thirds">
          <div className="columns">
            {/* Coluna do Autocomplete */}
            <div className="column is-half">
              <Autocomplete
                {...produtoProps}
                id="auto-complete-produto"
                autoComplete
                includeInputInList
                value={valueProduto}
                onChange={(event, newValue) => {
                  setValueProduto(newValue);
                  setSKU(newValue?.sku || "");
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Produto"
                    variant="standard"
                    fullWidth
                  />
                )}
              />
            </div>

            {/* Coluna do TextField (SKU) */}
            <div className="column is-half">
              <TextField
                id="sku-field"
                label="SKU"
                variant="standard"
                value={sku}
                disabled
                fullWidth
              />
            </div>
          </div>
        </div>

        {/* Coluna do Botão */}
        <div className="column is-one-third has-text-right">
          <Button variant="contained" color="primary">
            ADICIONAR
          </Button>
        </div>
      </div>
    </Layout>
  );
};
