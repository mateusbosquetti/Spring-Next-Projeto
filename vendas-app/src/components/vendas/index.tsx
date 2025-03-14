"use client";

import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
} from "@mui/material";
import { Layout } from "components";
import { useClientService } from "pasta/services";
import { useProdutoService } from "pasta/services";
import { Cliente } from "pasta/models/clientes";
import { Produto } from "pasta/models/produtos";
import { ProdutoVenda } from "pasta/models/produtos/ProdutoVenda";
import { AxiosResponse } from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import useSWR from "swr";
import { httpCliente } from "pasta/http";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DeleteModal } from "components/common";

const fetcher = (url: string) => httpCliente.get(url);

export const Vendas: React.FC = () => {
  const { listarCliente } = useClientService();
  const { listarProduto } = useProdutoService();
  const [listaCliente, setListaCliente] = useState<Cliente[]>([]);
  const [listaProduto, setListaProduto] = useState<Produto[]>([]);
  const [listaFormaPagamento, setListaFormaPagamento] = useState<string[]>([
    "Débito",
    "Crédito",
    "PIX",
    "Dinheiro",
    "Boleto",
  ]);
  const [listaProdutoPedido, setListaProdutoPedido] = useState<ProdutoVenda[]>(
    []
  );
  const [sku, setSKU] = useState<string>("");
  const [quantidade, setQuantidade] = useState<number>(1);
  const [valueCliente, setValueCliente] = useState<Cliente | null>(null);
  const [valueProduto, setValueProduto] = useState<Produto | null>(null);
  const [valueFormaPagamento, setValueFormaPagamento] = useState<string | null>(
    null
  ); // Corrigido para null
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState<string | null>(null);

  const columns: GridColDef<ProdutoVenda>[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "nome",
      headerName: "Nome",
      sortable: true,
      width: 200,
    },
    {
      field: "preco",
      headerName: "Preço Total",
      type: "number",
      sortable: true,
      align: "left",
      headerAlign: "left",
      width: 150,
    },
    {
      field: "quantidade",
      headerName: "Quantidade",
      headerAlign: "left",
      align: "left",
      type: "number",
      sortable: true,
      width: 150,
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 200,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      disableReorder: true,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              color="primary"
              onClick={() => handleAddQuantity(params.row.id || "")}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              color="warning"
              onClick={() => handleRemoveQuantity(params.row.id || "")}
            >
              <RemoveIcon />
            </IconButton>
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

  const handleAddQuantity = (id: string) => {
    const updatedList = listaProdutoPedido.map((produto) => {
      if (produto.id === id) {
        const novaQuantidade = produto.quantidade + 1;
        return {
          ...produto,
          quantidade: novaQuantidade,
          preco: produto.precoUnitario * novaQuantidade,
        };
      }
      return produto;
    });
    setListaProdutoPedido(updatedList);
  };

  const handleRemoveQuantity = (id: string) => {
    const updatedList = listaProdutoPedido.map((produto) => {
      if (produto.id === id && produto.quantidade > 1) {
        const novaQuantidade = produto.quantidade - 1;
        return {
          ...produto,
          quantidade: novaQuantidade,
          preco: produto.precoUnitario * novaQuantidade,
        };
      }
      return produto;
    });
    setListaProdutoPedido(updatedList);
  };

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
      const novaLista = listaProdutoPedido.filter(
        (produto) => produto.id !== produtoToDelete
      );

      setListaProdutoPedido(novaLista);

      handleCloseModal();
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

  const clienteProps = {
    options: listaCliente,
    getOptionLabel: (option: Cliente) => option.nome,
  };

  const produtoProps = {
    options: listaProduto,
    getOptionLabel: (option: Produto) => option.nome,
  };

  const formaPagamentoProps = {
    options: listaFormaPagamento,
    getOptionLabel: (option: string) => option,
  };

  const handleAdicionarProduto = () => {
    if (valueProduto) {
      const produtoJaAdicionado = listaProdutoPedido.some(
        (produto) => produto.id === valueProduto.id
      );

      if (!produtoJaAdicionado) {
        const produtoAdd: ProdutoVenda = {
          id: valueProduto.id,
          nome: valueProduto.nome,
          precoUnitario: valueProduto.preco,
          preco: valueProduto.preco * quantidade,
          quantidade: quantidade,
        };

        setListaProdutoPedido([...listaProdutoPedido, produtoAdd]);
      } else {
        const updatedList = listaProdutoPedido.map((produto) => {
          if (produto.id === valueProduto.id) {
            const novaQuantidade = produto.quantidade + 1;
            return {
              ...produto,
              quantidade: novaQuantidade,
              preco: produto.precoUnitario * novaQuantidade,
            };
          }
          return produto;
        });
        setListaProdutoPedido(updatedList);
        console.log("Produto já adicionado ao pedido.");
      }

      setValueProduto(null);
      setSKU("");
    }
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
            onClick={handleAdicionarProduto}
            variant="contained"
            className="mt-2"
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

      <div className="columns is-vcentered mt-2">
        <div className="column is-two-thirds">
          <div className="columns">
            <div className="column is-half">
              <Autocomplete
                {...formaPagamentoProps}
                id="auto-complete-forma-pagamento"
                autoComplete
                includeInputInList
                value={valueFormaPagamento || null} // Garante que o valor nunca seja undefined
                onChange={(event, newValue) => {
                  setValueFormaPagamento(newValue || null); // Define como null se newValue for undefined
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Forma de Pagamento"
                    variant="standard"
                  />
                )}
              />
            </div>

            <div className="column is-half">
              <FormControl variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">
                  Preço Final
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">R$</InputAdornment>
                  }
                  disabled
                />
              </FormControl>
            </div>
          </div>
        </div>

        <div className="column is-one-third has-text-right">
          <Button
            onClick={handleAdicionarProduto}
            variant="contained"
            className="mt-4"
            color="primary"
          >
            Salvar
          </Button>
        </div>
      </div>

      <DeleteModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        content="Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita."
      />
    </Layout>
  );
};
