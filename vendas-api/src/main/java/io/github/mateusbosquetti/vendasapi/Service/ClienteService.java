package io.github.mateusbosquetti.vendasapi.Service;

import io.github.mateusbosquetti.vendasapi.DTO.Request.ClienteRequestDTO;
import io.github.mateusbosquetti.vendasapi.DTO.Request.ClienteRequestDTO;
import io.github.mateusbosquetti.vendasapi.DTO.Response.ClienteResponseDTO;
import io.github.mateusbosquetti.vendasapi.Entity.Cliente;
import io.github.mateusbosquetti.vendasapi.Entity.Cliente;
import io.github.mateusbosquetti.vendasapi.Repository.ClienteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class ClienteService {

    private ClienteRepository repository;

    public ClienteResponseDTO adicionarCliente(ClienteRequestDTO clienteRequestDTO) {
        return EntitytoDTO(repository.save(DTOtoEntity(clienteRequestDTO)));
    }

    public void atualizarCliente(ClienteRequestDTO clienteRequestDTO, Integer id) {
        Cliente clienteAntigo = repository.findById(id).orElseThrow(NoSuchElementException::new);
        Cliente clienteAtual = DTOtoEntity(clienteRequestDTO);
        clienteAtual.setId(id);
        clienteAtual.setDataCadastro(clienteAntigo.getDataCadastro());

        repository.save(clienteAtual);
    }

    public List<ClienteResponseDTO> buscarClientes() {
        return repository.findAll()
                .stream()
                .map(this::EntitytoDTO)
                .toList();
        //For each embutido
    }

    public ClienteResponseDTO buscarClientePeloId(Integer id) {
        return EntitytoDTO(repository.findById(id).orElseThrow(NoSuchElementException::new));
    }

    public void excluirCliente(Integer id) {
        buscarClientePeloId(id);
        repository.deleteById(id);
    }
    
    private Cliente DTOtoEntity (ClienteRequestDTO clienteRequestDTO) {
        Cliente cliente = new Cliente();
        cliente.setNome(clienteRequestDTO.getNome());
        cliente.setCpf(clienteRequestDTO.getCpf());
        cliente.setEmail(clienteRequestDTO.getEmail());
        cliente.setNascimento(clienteRequestDTO.getNascimento());
        cliente.setTelefone(clienteRequestDTO.getTelefone());
        cliente.setEndereco(clienteRequestDTO.getEndereco());
        return cliente;
    }
    
    public ClienteResponseDTO EntitytoDTO (Cliente cliente) {
        return new ClienteResponseDTO(
                cliente.getId(),
                cliente.getNascimento(),
                cliente.getCpf(),
                cliente.getNome(),
                cliente.getEndereco(), 
                cliente.getTelefone(),
                cliente.getEmail(),
                cliente.getDataCadastro());
    }

}
