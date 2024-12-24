import { on } from "events";
import { Produto } from "pasta/models/produtos"

interface TabelaProdutosProps {
    produtos: Array<Produto>;
    onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
    produtos,
    onDelete,
    onEdit

}) => {
    return (
        <table className="table is-striped is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>SKU</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    produtos.map(produto => <ProdutoRow
                        onDelete={onDelete}
                        onEdit={onEdit}
                        key={produto.id}
                        produto={produto}
                    />)
                }
            </tbody>
        </table>
    )
}

interface ProdutoRowProps {
    produto: Produto;
    onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({
    produto,
    onDelete,
    onEdit
}) => {
    return (
        <tr>
            <td>{produto.id}</td>
            <td>{produto.sku}</td>
            <td>{produto.nome}</td>
            <td>{produto.preco}</td>
            <td>
                <div className="field is-grouped">
                    <div className="control">
                        <button onClick={e => onEdit(produto)} className="button is-warning is-small is-rounded">Editar</button>
                    </div>
                    <div className="control">
                        <button onClick={e => onDelete(produto)} className="button is-danger is-small is-rounded">Deletar</button>
                    </div>
                </div>
            </td>
        </tr>
    )
}