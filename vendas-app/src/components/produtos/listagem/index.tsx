"use client";

import { Input } from "components/common";
import { Layout } from "components/layout";
import { useProdutoService } from "pasta/services";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useSWR from "swr";
import { AxiosResponse } from "axios";
import { httpCliente } from "pasta/http";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation"; // Importar useRouter
import { Produto } from "pasta/models/produtos";

const fetcher = (url: string) => httpCliente.get(url);

export const ListagemProdutos: React.FC = () => {

    const columns: GridColDef<Produto>[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
            field: 'nome',
            headerName: 'Nome',
            sortable: true,
            width: 200,
        },
        {
            field: 'descricao',
            headerName: 'Descrição',
            width: 300,
        },
        {
            field: 'preco',
            headerName: 'Preço',
            type: 'number',
            sortable: true,
            align: "left",
            headerAlign: "left",
            width: 150,
        },

        {
            field: 'sku',
            headerName: 'SKU',
            sortable: false,
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

    const { data: result, error, mutate } = useSWR<AxiosResponse<Produto[]>>(
        "/api/produtos",
        fetcher
    );

    if (error) {
        return <Layout titulo="Produtos">Erro ao carregar os produtos.</Layout>;
    }

    const [lista, setLista] = useState<Produto[]>([]);

    useEffect(() => {
        setLista(result?.data.content || []);
    }, [result]);

    const handleEdit = (produto: Produto) => {
        console.log("Editar produto:", produto);
        const url = `/cadastros/produtos?id=${produto.id}`;
        router.push(url);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Tem certeza que deseja excluir este produto? " + id)) {
            try {
                await httpCliente.delete(`/api/produtos/${id}`);

                mutate();
            } catch (error) {
                console.error("Erro ao excluir produto:", error);
            }
        }
    };

    return (
        <Layout titulo="Produtos">
            <div className="mb-4">
                <Link href="/cadastros/produtos">
                    <Button variant="contained" endIcon={<AddIcon />}>
                        Adicionar
                    </Button>
                </Link>
            </div>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={lista}
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