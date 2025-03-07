"use client";

import { Input } from "components/common";
import { Layout } from "components/layout";
import { useClientService } from "pasta/services";
import { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nome',
    headerName: 'Nome Completo',
    width: 150,
  },
  {
    field: 'cpf',
    headerName: 'CPF',
    width: 150,
  },
  {
    field: 'nascimento',
    headerName: 'Data Nascimento',
    type: 'number',
    sortable: false,
    width: 110,
  },
  {
    field: 'endereco',
    headerName: 'Endereço',
    description: 'Coluna para endereços',
    sortable: false,
    width: 160,
    //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'email',
    headerName: 'Email',
    sortable: false,
    width: 160,
  },
  {
    field: 'telefone',
    headerName: 'Telefone',
    width: 160,
  },
  {
    field: 'dataCadastro',
    headerName: 'Data Cadastrado',
    sortable: true,
    width: 160,
  },
];

const rows = [

  {
    id: 1,
    nascimento: "15/05/1995",
    cpf: "12345678901",
    nome: "João Silva",
    endereco: "Rua das Flores, 123",
    telefone: "47987654321",
    email: "joao.silva@example.com",
    dataCadastro: "10/04/2023"
  },
  {
    id: 2,
    nascimento: "22/11/1988",
    cpf: "98765432109",
    nome: "Maria Oliveira",
    endereco: "Avenida Brasil, 456",
    telefone: "47912345678",
    email: "maria.oliveira@example.com",
    dataCadastro: "05/03/2023"
  },
  {
    id: 3,
    nascimento: "30/07/1990",
    cpf: "45678912345",
    nome: "Carlos Souza",
    endereco: "Rua dos Pinheiros, 789",
    telefone: "47965432109",
    email: "carlos.souza@example.com",
    dataCadastro: "20/02/2023"
  },
  {
    id: 4,
    nascimento: "12/09/1985",
    cpf: "32165498701",
    nome: "Ana Costa",
    endereco: "Rua das Palmeiras, 321",
    telefone: "47932165498",
    email: "ana.costa@example.com",
    dataCadastro: "15/01/2023"
  },
  {
    id: 5,
    nascimento: "25/03/1992",
    cpf: "65498732109",
    nome: "Pedro Santos",
    endereco: "Avenida Paulista, 159",
    telefone: "47998732165",
    email: "pedro.santos@example.com",
    dataCadastro: "01/01/2023"
  },
  {
    id: 6,
    nascimento: "18/06/1993",
    cpf: "78912345601",
    nome: "Fernanda Lima",
    endereco: "Rua das Acácias, 456",
    telefone: "47955551234",
    email: "fernanda.lima@example.com",
    dataCadastro: "12/05/2023"
  },
  {
    id: 7,
    nascimento: "03/12/1987",
    cpf: "65432198709",
    nome: "Ricardo Almeida",
    endereco: "Avenida das Rosas, 789",
    telefone: "47944443210",
    email: "ricardo.almeida@example.com",
    dataCadastro: "25/04/2023"
  },
  {
    id: 8,
    nascimento: "29/08/1991",
    cpf: "32198765401",
    nome: "Juliana Martins",
    endereco: "Rua dos Lírios, 321",
    telefone: "47933332109",
    email: "juliana.martins@example.com",
    dataCadastro: "30/03/2023"
  },
  {
    id: 9,
    nascimento: "14/02/1984",
    cpf: "98712365409",
    nome: "Lucas Pereira",
    endereco: "Avenida das Margaridas, 654",
    telefone: "47922223456",
    email: "lucas.pereira@example.com",
    dataCadastro: "18/02/2023"
  },
  {
    id: 10,
    nascimento: "07/10/1996",
    cpf: "45612378901",
    nome: "Patrícia Rocha",
    endereco: "Rua das Orquídeas, 987",
    telefone: "47911114567",
    email: "patricia.rocha@example.com",
    dataCadastro: "05/01/2023"
  }

];

export const ListagemClientes: React.FC = () => {

  return (
    <Layout titulo="Clientes">
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
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
