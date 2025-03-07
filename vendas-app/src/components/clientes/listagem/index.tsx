"use client";

import { Input } from "components/common";
import { Layout } from "components/layout";
import { useClientService } from "pasta/services";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useSWR from "swr";
import { AxiosResponse } from "axios";
import { Cliente } from "pasta/models/clientes";
import { httpCliente } from "pasta/http";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation"; // Importar useRouter

const fetcher = (url: string) => httpCliente.get(url);

export const ListagemClientes: React.FC = () => {

  const columns: GridColDef<Cliente>[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'nome',
      headerName: 'Nome Completo',
      width: 200,
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      width: 150,
    },
    {
      field: 'nascimento',
      headerName: 'Data Nascimento',
      //type: 'number',
      sortable: false,
      width: 150,
    },

    {
      field: 'email',
      headerName: 'Email',
      sortable: false,
      width: 200,
    },
    {
      field: 'telefone',
      headerName: 'Telefone',
      width: 150,
    },
    {
      field: 'dataCadastro',
      headerName: 'Data Cadastrado',
      sortable: true,
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Ações',
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
              color="primary"
              onClick={() => handleEdit(params.row)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const router = useRouter();

  const { data: result, error, mutate } = useSWR<AxiosResponse<Cliente[]>>(
    "/api/clientes",
    fetcher
  );

  if (error) {
    return <Layout titulo="Produtos">Erro ao carregar os produtos.</Layout>;
  }

  const [lista, setLista] = useState<Cliente[]>([]);

  useEffect(() => {
    setLista(result?.data || []);
  }, [result]);

  const handleEdit = (cliente: Cliente) => {
    console.log("Editar cliente:", cliente);
    const url = `/cadastros/clientes?id=${cliente.id}`;
    router.push(url); // Redirecionar para a URL
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await httpCliente.delete(`/api/clientes/${id}`);
        // Atualiza a lista de clientes após a exclusão
        mutate();
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
      }
    }
  };

  return (
    <Layout titulo="Clientes">
      <Link href="/cadastros/clientes">
        <Button variant="contained" endIcon={<AddIcon />}>
          Adicionar
        </Button>
      </Link>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={lista.content}
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