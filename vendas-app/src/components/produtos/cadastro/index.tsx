"use client";

import { useState } from "react";
import { Layout } from "components";

export const CadastroProdutos: React.FC = () => {

    const [sku, setSku] = useState('');
    const [preco, setPreco] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const submit = () => {
        const produto = {
            sku,
            preco,
            nome,
            descricao
        }
        console.log(produto);
    }


    return (
        <Layout titulo="Produtos">

            <div className="columns">

                <div className="field is-half column">
                    <label className="label" htmlFor="inputSku">SKU: *</label>
                    <div className="control">
                        <input className="input" id="inputSku" value={sku} onChange={event => setSku(event.target.value)} placeholder="Insira o SKU do Produto"></input>
                    </div>
                </div>

                <div className="field is-half column">
                    <label className="label" htmlFor="inputPreco">Preço: *</label>
                    <div className="control">
                        <input className="input" id="inputPreco" value={preco} onChange={event => setPreco(event.target.value)} placeholder="Insira o Preço do Produto"></input>
                    </div>
                </div>

            </div>

            <div className="columns">

                <div className="field column is-full">
                    <label className="label" htmlFor="inputNome">Nome: *</label>
                    <div className="control">
                        <input className="input" id="inputNome" value={nome} onChange={event => setNome(event.target.value)} placeholder="Insira o Nome do Produto"></input>
                    </div>
                </div>
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