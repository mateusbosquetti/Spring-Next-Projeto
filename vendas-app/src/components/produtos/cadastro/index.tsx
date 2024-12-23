"use client";

import { useState } from "react";
import { Layout, Input } from "components";
import { useProdutoService } from "pasta/services";
import { Produto } from "pasta/models/produtos";
import { error } from "console";

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [sku, setSku] = useState<string>('');
    const [preco, setPreco] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [id, setId] = useState<string | undefined>('');
    const [cadastro, setCadastro] = useState<string | undefined>('');

    const submit = () => {
        const produto: Produto = {
            id,
            sku,
            preco: parseFloat(preco),
            nome,
            descricao
        }

        if (id) {
            service.atualizar(produto)
                .then(data => console.log("Atualizado"))
                .catch(error => console.log(error))
        } else {
            service.salvar(produto)
                .then(data => {
                    setId(data.id)
                    setCadastro(data.dataCadastro)
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <Layout titulo="Produtos">

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
                    onChange={setPreco}
                    value={preco}
                    placeholder="Insira o Preço do Produto"
                    id="inputPreco" />

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