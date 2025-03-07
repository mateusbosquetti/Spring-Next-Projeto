package io.github.mateusbosquetti.vendasapi.controller;

import io.github.mateusbosquetti.vendasapi.dto.request.ClienteRequestDTO;
import io.github.mateusbosquetti.vendasapi.dto.response.ClienteResponseDTO;
import io.github.mateusbosquetti.vendasapi.service.ClienteService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
@AllArgsConstructor
@CrossOrigin("*")
public class ClienteController {

    private ClienteService service;

    @PostMapping
    public ResponseEntity<ClienteResponseDTO> postCliente(@RequestBody @Validated ClienteRequestDTO cliente) {
        return new ResponseEntity<>(service.adicionarCliente(cliente), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putCliente(@RequestBody @Validated ClienteRequestDTO cliente, @PathVariable Integer id) {
        service.atualizarCliente(cliente, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<ClienteResponseDTO>> getClientes(Pageable pageable) {
        return new ResponseEntity<>(service.buscarClientes(pageable), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> getClienteById(@PathVariable Integer id) {
        return new ResponseEntity<>(service.buscarClientePeloId(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClienteById(@PathVariable Integer id) {
        service.excluirCliente(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
