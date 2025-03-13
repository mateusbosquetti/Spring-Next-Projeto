"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Autocomplete,
  TextField,
  Stack,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Layout } from "components";
import { useClientService } from "pasta/services";
import { useProdutoService } from "pasta/services";
import { Cliente } from "pasta/models/clientes";
import { Produto } from "pasta/models/produtos";
import { AxiosResponse } from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useSWR, { mutate } from "swr";
import { httpCliente } from "pasta/http";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const fetcher = (url: string) => httpCliente.get(url);

export const Vendas: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState<string | null>(null);

  const columns: GridColDef<Produto>[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "nome",
      headerName: "Nome",
      sortable: true,
      width: 200,
    },
    {
      field: "descricao",
      headerName: "Descrição",
      width: 300,
    },
    {
      field: "preco",
      headerName: "Preço",
      type: "number",
      sortable: true,
      align: "left",
      headerAlign: "left",
      width: 150,
    },
    {
      field: "sku",
      headerName: "SKU",
      sortable: false,
      width: 150,
    },
    {
      field: "dataCadastro",
      headerName: "Data Cadastrado",
      sortable: true,
      width: 150,
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 100,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableReorder: true,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              color="error"
              onClick={() => handleOpenModal(params.row.id || "")}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const handleOpenModal = (id: string) => {
    setProdutoToDelete(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProdutoToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (produtoToDelete) {
      try {
        await httpCliente.delete(`/api/produtos/${produtoToDelete}`);
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
      } finally {
        handleCloseModal();
      }
    }
  };

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
  const [listaProdutoPedido, setListaProdutoPedido] = useState<Produto[]>([]);
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
        <div className="column is-two-thirds">
          <div className="columns">
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

        <div className="column is-one-third has-text-right">
          <Button
            onClick={(e) => {
              
            }}
            variant="contained"
            color="primary"
          >
            ADICIONAR
          </Button>
        </div>
      </div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={listaProdutoPedido}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </Layout>
  );
};
