package io.github.mateusbosquetti.vendasapi.Controller;

import io.github.mateusbosquetti.vendasapi.DTO.Request.ClienteRequestDTO;
import io.github.mateusbosquetti.vendasapi.DTO.Response.ClienteResponseDTO;
import io.github.mateusbosquetti.vendasapi.Service.ClienteService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@AllArgsConstructor
@CrossOrigin("*")
public class ClienteController {

    private ClienteService service;

    @PostMapping
    public ResponseEntity<ClienteResponseDTO> postCliente(@RequestBody ClienteRequestDTO cliente) {
        try {
            return new ResponseEntity<>(service.adicionarCliente(cliente), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putCliente(@RequestBody ClienteRequestDTO cliente, @PathVariable Integer id) {
        try {
            service.atualizarCliente(cliente, id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<ClienteResponseDTO>> getClientes() {
        try {
            return new ResponseEntity<>(service.buscarClientes(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> getClienteById(@PathVariable Integer id) {
        try {
            return new ResponseEntity<>(service.buscarClientePeloId(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClienteById(@PathVariable Integer id) {
        try {
            service.excluirCliente(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
