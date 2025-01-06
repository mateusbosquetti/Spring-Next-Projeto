import { Cliente } from "pasta/models/clientes"
import { Formik, useFormik } from "formik"
import { Input } from "components/common"

interface ClienteFormProps {
    cliente: Cliente
    onSubmit: (cliente: Cliente) => void
}

export const ClienteForm: React.FC<ClienteFormProps> = ({
    cliente,
    onSubmit
}) => {

    const formScheme: Cliente = {
        cadastro: '',
        cpf: '',
        email: '',
        endereco: '',
        dataNascimento: '',
        id: '',
        nome: '',
        telefone: '',

    }

    const formik = useFormik<Cliente>({
        initialValues: { ...formScheme, ...cliente },
        onSubmit
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            {formik.values.id &&
                <div className="columns">
                    <Input
                        id="id"
                        name="id"
                        label="Código: "
                        autoComplete="off"
                        columnClasses="is-half"
                        disabled
                        value={formik.values.id} />

                    <Input
                        id="cadastro"
                        name="cadastro"
                        label="Data de Cadastro: "
                        autoComplete="off"
                        columnClasses="is-half"
                        disabled
                        value={formik.values.cadastro} />
                </div>
            }

            <div className="columns">
                <Input
                    id="nome"
                    name="nome"
                    label="Nome *"
                    autoComplete="off"
                    columnClasses="is-full"
                    onChange={formik.handleChange}
                    value={formik.values.nome} />
            </div>
            <div className="columns">
                <Input
                    id="cpf"
                    name="cpf"
                    label="CPF *"
                    autoComplete="off"
                    columnClasses="is-half"
                    onChange={formik.handleChange}
                    value={formik.values.cpf} />

                <Input
                    id="dataNascimento"
                    name="dataNascimento"
                    label="Nascimento *"
                    autoComplete="off"
                    columnClasses="is-half"
                    onChange={formik.handleChange}
                    value={formik.values.dataNascimento} />
            </div>
            <div className="columns">
                <Input
                    id="endereco"
                    name="endereco"
                    label="Endereco *"
                    autoComplete="off"
                    columnClasses="is-full"
                    onChange={formik.handleChange}
                    value={formik.values.endereco} />
            </div>
            <div className="columns">
                <Input
                    id="email"
                    name="email"
                    label="Email *"
                    autoComplete="off"
                    columnClasses="is-half"
                    onChange={formik.handleChange}
                    value={formik.values.email} />

                <Input
                    id="telefone"
                    name="telefone"
                    label="Telefone *"
                    autoComplete="off"
                    columnClasses="is-half"
                    onChange={formik.handleChange}
                    value={formik.values.telefone} />
            </div>
            <div className="field is-grouped">
                <div className="control is-link">
                    <button
                        type="submit" className="button is-link">{formik.values.id ? "Atualizar" : "Salvar"}
                    </button>
                    
                </div>
            </div>
        </form>
    )
}