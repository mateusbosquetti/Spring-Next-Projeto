package io.github.mateusbosquetti.vendasapi.Service;

import io.github.mateusbosquetti.vendasapi.DTO.Request.ClienteRequestDTO;
import io.github.mateusbosquetti.vendasapi.DTO.Request.ClienteRequestDTO;
import io.github.mateusbosquetti.vendasapi.DTO.Response.ClienteResponseDTO;
import io.github.mateusbosquetti.vendasapi.Entity.Cliente;
import io.github.mateusbosquetti.vendasapi.Entity.Cliente;
import io.github.mateusbosquetti.vendasapi.Repository.ClienteRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class ClienteService {

    private ClienteRepository repository;

    public ClienteResponseDTO adicionarCliente(ClienteRequestDTO clienteRequestDTO) {
        return repository.save(clienteRequestDTO.toEntity()).toDto();
    }

    public void atualizarCliente(ClienteRequestDTO clienteRequestDTO, Integer id) {
        Cliente clienteAntigo = buscarClienteEntidadePeloId(id);
        Cliente clienteNovo = clienteRequestDTO.toEntity();
        clienteNovo.setId(id);
        clienteNovo.setDataCadastro(clienteAntigo.getDataCadastro());

        repository.save(clienteNovo);
    }

    public Page<ClienteResponseDTO> buscarClientes(Pageable pageable) {
        return repository.findAll(pageable).map(Cliente::toDto);
        //For each embutido
    }

    public ClienteResponseDTO buscarClientePeloId(Integer id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("Cliente não encontrado")).toDto();
    }

    public Cliente buscarClienteEntidadePeloId(Integer id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("Cliente não encontrado"));
    }

    public void excluirCliente(Integer id) {
        buscarClientePeloId(id);
        repository.deleteById(id);
    }

}
