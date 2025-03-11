"use client"

import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Stack } from '@mui/material';
import { Layout } from 'components';
import { useClientService } from 'pasta/services';
import { Cliente } from 'pasta/models/clientes';

export const Vendas: React.FC = () => {
    const { listarCliente } = useClientService();
    const [lista, setLista] = useState<Cliente[]>([]);
    const [value, setValue] = useState<Cliente | null>(null);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const clientes = await listarCliente();
                setLista(clientes);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        };

        fetchClientes();
    }, [listarCliente]);

    const defaultProps = {
        options: lista,
        getOptionLabel: (option: Cliente) => option.nome,
    };

    return (
        <Layout titulo='Vendas'>
            <Stack spacing={1} sx={{ width: 300 }}>
                <Autocomplete
                    {...defaultProps}
                    id="auto-complete"
                    autoComplete
                    includeInputInList
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        console.log(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Cliente" variant="standard" />
                    )}
                />
            </Stack>
        </Layout>
    );
};