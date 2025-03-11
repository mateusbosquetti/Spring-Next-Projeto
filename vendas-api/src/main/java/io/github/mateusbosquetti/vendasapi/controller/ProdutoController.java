package io.github.mateusbosquetti.vendasapi.controller;

import io.github.mateusbosquetti.vendasapi.dto.request.ProdutoRequestDTO;
import io.github.mateusbosquetti.vendasapi.dto.response.ProdutoResponseDTO;
import io.github.mateusbosquetti.vendasapi.service.ProdutoService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@AllArgsConstructor
@CrossOrigin("*")
public class ProdutoController {

    private ProdutoService service;

    @PostMapping
    public ResponseEntity<ProdutoResponseDTO> postProduto(@RequestBody @Validated ProdutoRequestDTO produto) {
        return new ResponseEntity<>(service.adicionarProduto(produto), HttpStatus.OK);
    }

    @PostMapping("/mock")
    public ResponseEntity<Void> mockProduto(@RequestBody List<ProdutoRequestDTO> produtoRequestDTOS) {
        service.mockarProduto(produtoRequestDTOS);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putProduto(@RequestBody @Validated ProdutoRequestDTO produto, @PathVariable Integer id) {
        service.atualizarProduto(produto, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<ProdutoResponseDTO>> getProdutos(Pageable pageable) {
        return new ResponseEntity<>(service.buscarProdutos(pageable), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> getProdutoById(@PathVariable Integer id) {
        return new ResponseEntity<>(service.buscarProdutoPeloId(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProdutoById(@PathVariable Integer id) {
        service.excluirProduto(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
