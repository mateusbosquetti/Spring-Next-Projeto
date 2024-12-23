"use client";

import { useState } from "react";
import { Layout, Input } from "components";
import { useProdutoService } from "pasta/services";
import { Produto } from "pasta/models/produtos";

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [sku, setSku] = useState<string>('');
    const [preco, setPreco] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');

    const submit = () => {
        const produto: Produto = {
            sku,
            preco: parseFloat(preco),
            nome,
            descricao
        }
        service.salvar(produto)
            .then(data => console.log(data))
    }


    return (
        <Layout titulo="Produtos">

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
                    <button onClick={submit} className="button is-link">Salvar</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Voltar</button>
                </div>
            </div>

        </Layout>
    )
}