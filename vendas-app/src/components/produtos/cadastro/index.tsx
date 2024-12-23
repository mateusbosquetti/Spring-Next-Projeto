"use client";

import { useState } from "react";
import { Layout, Input, Message } from "components";
import { useProdutoService } from "pasta/services";
import { Produto } from "pasta/models/produtos";
import { converterEmBigDecimal } from "pasta/util/money";
import { Alert } from "components/common/message";

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [sku, setSku] = useState<string>('');
    const [preco, setPreco] = useState("");
    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [id, setId] = useState<string | undefined>('');
    const [cadastro, setCadastro] = useState<string | undefined>('');
    const [ messages, setMessages ] = useState<Array<Alert>>([])

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
                    onChange={setSku}
                    value={sku}
                    placeholder="Insira o SKU do Produto"
                    id="inputSku" />

                <Input
                    label="Preço: *"
                    columnClasses="is-half"
                    onChange={handlePrecoChange}
                    value={preco}
                    placeholder="Insira o Preço do Produto"
                    id="inputPreco"
                    currency
                    maxLength={16}
                />


            </div>

            <div className="columns">

                <Input
                    label="Nome: *"
                    columnClasses="is-full"
                    onChange={setNome}
                    value={nome}
                    placeholder="Insira o Nome do Produto"
                    id="inputNome" />

            </div>
            <div className="columns">

                <div className="field column is-full">
                    <label className="label" htmlFor="inputDesc">Descricao: *</label>
                    <div className="control">
                        <textarea className="textarea" id="inputDesc" value={descricao} onChange={event => setDescricao(event.target.value)} placeholder="Insira a Descrição do Produto"></textarea>
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button onClick={submit} className="button is-link">{id ? "Atualizar" : "Salvar"}</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Voltar</button>
                </div>
            </div>

        </Layout>
    )
}