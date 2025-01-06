import { Cliente } from "pasta/models/clientes" 
import { Formik, useFormik } from "formik"

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
         initialValues: {...cliente, ...formScheme},
         onSubmit
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <input value={formik.values.nome} 
            onChange={formik.handleChange} 
            id="nome"
            name="nome"
            />
            <button type="submit">Enviar</button>
        </form>
    )
}