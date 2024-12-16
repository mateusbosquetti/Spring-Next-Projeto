import { Layout } from "components";

export const CadastroProdutos: React.FC = () => {
    return (
        <Layout titulo="Cadastro de Produtos">

            <div className="columns">

                <div className="field is-half column">
                    <label className="label" htmlFor="inputSku">SKU: *</label>
                    <div className="control">
                        <input className="input" id="inputSku" placeholder="Insira o SKU do Produto"></input>
                    </div>
                </div>

                <div className="field is-half column">
                    <label className="label" htmlFor="inputPreco">Preço: *</label>
                    <div className="control">
                        <input className="input" id="inputPreco" placeholder="Insira o Preço do Produto"></input>
                    </div>
                </div>

            </div>

            <div className="columns">

                <div className="field column is-full">
                    <label className="label" htmlFor="inputNome">Nome: *</label>
                    <div className="control">
                        <input className="input" id="inputNome" placeholder="Insira o Nome do Produto"></input>
                    </div>
                </div>
            </div>
            <div className="columns">

                <div className="field column is-full">
                    <label className="label" htmlFor="inputDesc">Descricao: *</label>
                    <div className="control">
                        <textarea className="textarea" id="inputDesc" placeholder="Insira a Descrição do Produto"></textarea>
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link">Salvar</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Voltar</button>
                </div>
            </div>

        </Layout>
    )
}