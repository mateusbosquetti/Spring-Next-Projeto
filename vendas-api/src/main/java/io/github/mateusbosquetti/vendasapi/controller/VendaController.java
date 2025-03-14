package io.github.mateusbosquetti.vendasapi.controller;

import io.github.mateusbosquetti.vendasapi.dto.request.VendaRequestDTO;
import io.github.mateusbosquetti.vendasapi.dto.response.VendaResponseDTO;
import io.github.mateusbosquetti.vendasapi.service.VendaService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendas")
@AllArgsConstructor
@CrossOrigin("*")
public class VendaController {

    private VendaService service;

    @PostMapping
    public ResponseEntity<VendaResponseDTO> postVenda(@RequestBody @Validated VendaRequestDTO venda) {
        return new ResponseEntity<>(service.adicionarVenda(venda), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putVenda(@RequestBody @Validated VendaRequestDTO venda, @PathVariable Integer id) {
        service.atualizarVenda(venda, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<VendaResponseDTO>> getVendas(Pageable pageable) {
        return new ResponseEntity<>(service.buscarVendas(pageable), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendaResponseDTO> getVendaById(@PathVariable Integer id) {
        return new ResponseEntity<>(service.buscarVendaPeloId(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVendaById(@PathVariable Integer id) {
        service.excluirVenda(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
