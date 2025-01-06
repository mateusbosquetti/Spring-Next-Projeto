'use client'

import { Layout } from "components/layout"
import { ClienteForm } from "./form"
import { useState } from "react"
import { Cliente } from "pasta/models/clientes" 

export const CadastroCliente: React.FC = () => {
    
    const [cliente, setCliente] = useState<Cliente>({});

    const handleSubmit = (cliente: Cliente) => {
        console.log(cliente)
    }

    return (
        <div>
            <Layout titulo="Clientes">
                <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
            </Layout>
        </div>
    )
}