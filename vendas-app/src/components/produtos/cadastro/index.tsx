"use client";

import { use, useState } from "react";
import { Layout, Input, Message } from "components";
import { useProdutoService } from "pasta/services";
import { Produto } from "pasta/models/produtos";
import { converterEmBigDecimal } from "pasta/util/money";
import { Alert } from "components/common/message";
import * as yup from 'yup'
import { error } from "console";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const requiredMessage = "Campo Obrigatório";

const validationSchema = yup.object().shape({
    sku: yup.string().trim().required(requiredMessage),
    nome: yup.string().trim().required(requiredMessage),
    descricao: yup.string().trim().required(requiredMessage),
    preco: yup.number().required(requiredMessage).moreThan(0, "Valor deve ser maior que 0,00 (Zero)")
})

interface FormErros {
    sku?: string;
    preco?: string;
    nome?: string;
    descricao?: string;
}

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [sku, setSku] = useState<string>('');
    const [preco, setPreco] = useState("");
    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [id, setId] = useState<string | undefined>('');
    const [cadastro, setCadastro] = useState<string | undefined>('');
    const [messages, setMessages] = useState<Array<Alert>>([]);
    const [errors, setErrors] = useState<FormErros>({});

    const searchParams = useSearchParams();
    const idURL = searchParams.get("id");

    useEffect( () => {
        if(idURL) {
            service.carregarProduto(idURL)
            .then(data => {
                console.log(data)
                setId(data.id)
                setSku(data.sku)
                setNome(data.nome)
                setDescricao(data.descricao)
                setCadastro(data.dataCadastro)
                setPreco(data.preco)
            })
        }

    }, [idURL])

    const handlePrecoChange = (valor: string) => {
        setPreco(valor);
    };

    const submit = () => {
        const produto: Produto = {
            id,
            sku,
            preco: converterEmBigDecimal(preco),
            nome,
            descricao
        }

        validationSchema.validate(produto).then(data => {
            setErrors({})
            if (id) {
                service.atualizar(produto)
                    .then(data => setMessages([{
                        texto: "Produto atualizado com sucesso", tipo: "success"
                    }]))
                    .catch(error => console.log(error))
            } else {
                service.salvar(produto)
                    .then(data => {
                        setId(data.id)
                        setCadastro(data.dataCadastro)
                        setMessages([{
                            texto: "Produto adicionado com sucesso", tipo: "success"
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
        <Layout titulo="Produtos" mensagens={messages}>
            {id &&
                <div className="columns">
                    <Input
                        label="Código:"
                        columnClasses="is-half"
                        value={id}
                        id="inputId"
                        disabled
                    />

                    <Input
                        label="Data Cadastro:"
                        columnClasses="is-half"
                        value={cadastro}
                        id="inputDataCadastro"
                        disabled
                    />
                </div>
            }

            <div className="columns">
                <Input
                    label="SKU: *"
                    columnClasses="is-half"
                    onChange={e => setSku(e.target.value)}
                    value={sku}
                    placeholder="Insira o SKU do Produto"
                    id="inputSku"
                    error={errors.sku}
                />

                <Input
                    label="Preço: *"
                    columnClasses="is-half"
                    onChange={e => setPreco(e.target.value)}
                    value={preco}
                    placeholder="Insira o Preço do Produto"
                    id="inputPreco"
                    currency
                    maxLength={16}
                    error={errors.preco}
                />


            </div>

            <div className="columns">

                <Input
                    label="Nome: *"
                    columnClasses="is-full"
                    onChange={e => setNome(e.target.value)}
                    value={nome}
                    placeholder="Insira o Nome do Produto"
                    id="inputNome"
                    error={errors.nome}
                />

            </div>
            <div className="columns">

                <div className="field column is-full">
                    <label className="label" htmlFor="inputDesc">Descricao: *</label>
                    <div className="control">
                        <textarea className="textarea" id="inputDesc" value={descricao} onChange={event => setDescricao(event.target.value)} placeholder="Insira a Descrição do Produto"></textarea>
                        {errors.descricao &&
                            <p className="help is-danger">{errors.descricao}</p>
                        }
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button onClick={submit} className="button is-link">{id ? "Atualizar" : "Salvar"}</button>
                </div>
                <div className="control">
                    <Link href="/consultas/produtos">
                        <button className="button is-link is-light">Voltar</button>
                    </Link>
                </div>
            </div>

        </Layout>
    )
}