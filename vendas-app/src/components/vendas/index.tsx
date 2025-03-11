"use client"

import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { Stack } from '@mui/material';
import { Layout } from 'components';
import { useClientService } from 'pasta/services';
import useSWR from "swr";
import { AxiosResponse } from 'axios';
import { Cliente } from 'pasta/models/clientes';
import { httpCliente } from 'pasta/http';

const fetcher = (url: string) => httpCliente.get(url);

export const Vendas: React.FC = () => {


    const { data: result, error, mutate } = useSWR<AxiosResponse<Cliente[]>>(
        "/api/clientes",
        fetcher
    );

    const [lista, setLista] = useState<Cliente[]>([]);

    useEffect(() => {
        setLista(result?.data || []);
    }, [result]);

    const defaultProps = {
        options: lista,
        getOptionLabel: (option: any) => option.nome,
    };
    const flatProps = {
        options: lista.map((option) => option.nome),
    };
    const [value, setValue] = React.useState(null);

    return (
        <Layout titulo='Vendas'>
            <Stack spacing={1} sx={{ width: 300 }}>
                <Autocomplete
                    {...defaultProps}
                    id="auto-complete"
                    autoComplete
                    includeInputInList
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
}