"use client";
import { useClientService } from "pasta/services";
import { useEffect, useState } from "react";
import { Alert } from "components/common/message";
import { useSearchParams } from "next/navigation";
import { Produto } from "pasta/models/produtos";
import { Cliente } from "pasta/models/clientes";
import * as yup from 'yup'
import { error } from "console";

const requiredMessage = "Campo Obrigatório";

const validationSchema = yup.object().shape({
    nome: yup.string().trim().required(requiredMessage),
    cpf: yup.string().trim().required(requiredMessage),
    dataNascimento: yup.string().trim().required(requiredMessage),
    endereco: yup.string().trim().required(requiredMessage),
    email: yup.string().trim().required(requiredMessage),
    telefone: yup.string().trim().required(requiredMessage)
}) 

interface FormErros {
    nome?: string;
    cpf?: string;
    dataNascimento?: string;
    endereco?: string;
    email?: string;
    telefone?: string;
}

export const CadastroClientes : React.FC = () => {
    
    const service = useClientService();
    const [nome, setNome] = useState<string | undefined>("");
    const [cpf, setCpf] = useState<string | undefined>("");
    const [dataNascimento, setDataNascimento] = useState<string | undefined>("");
    const [endereco, setEndereco] = useState<string | undefined>("");
    const [email, setEmail] = useState<string | undefined>("");
    const [telefone, setTelefone] = useState<string | undefined>("");
    const [cadastro, setCadastro] = useState<string | undefined>("");
    const [id, setId] = useState<string | undefined>("");
    const [messages, setMessages] = useState<Array<Alert>>([]);
    const [errors, setErrors] = useState<FormErros>({});

    const searchParams = useSearchParams();
    const idURL = searchParams.get("id");

    useEffect( () => {
        if(idURL) {
            service.carregarCliente(idURL)
            .then(data => {
                console.log(data)
                setId(data.id)
                setNome(data.nome)
                setCpf(data.cpf)
                setDataNascimento(data.dataNascimento)
                setEndereco(data.endereco)
                setEmail(data.email)
                setTelefone(data.telefone)
                setCadastro(data.dataCadastro)
            })
        }
    }, [idURL])

    const submit = () => {
        const cliente: Cliente = {
            id,
            nome,
            cpf,
            dataNascimento,
            endereco,
            email,
            telefone,
        }

        validationSchema.validate(cliente).then(data => {
            setErrors({})
            if (id) {
                service.atualizar(cliente)
                .then(data => setMessages([{
                    texto: "Cliente atualizado com sucesso", tipo: "success"
                }]))
                .catch(error => console.log(error))
            } else {
                service.salvar(cliente)
                .then(data => {
                    setId(data.id)
                    setCadastro(data.dataCadastro)
                    setMessages([{
                        texto: "Cliente adicionado com sucesso", tipo: "success"
                    }])
                })
                .catch(error => console.log(error))
            }
        }).catch(error => {
            const field = error.path;
            const message = error.message;

            setErrors({
                [field]: message
            })

        })
    }

    return (
        <div>
            
        </div>
    )
}